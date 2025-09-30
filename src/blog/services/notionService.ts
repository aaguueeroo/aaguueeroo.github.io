import { Client } from '@notionhq/client';
import { BlogPost, BlogPostSummary, PostCategory, NotionConfig } from '../types';

class NotionService {
  private client: Client;
  private blogDatabaseId: string;
  private categoriesDatabaseId: string;

  constructor(config: NotionConfig) {
    this.client = new Client({ auth: config.apiKey });
    this.blogDatabaseId = config.blogDatabaseId;
    this.categoriesDatabaseId = config.categoriesDatabaseId;
  }

  /**
   * Fetch all published blog posts from Notion
   */
  async getAllPosts(): Promise<BlogPostSummary[]> {
    try {
      const response = await this.client.databases.query({
        database_id: this.blogDatabaseId,
        filter: {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending',
          },
        ],
      });

      // Get categories for each post
      const postsWithCategories = await Promise.all(
        response.results.map(async (page: any) => {
          const post = this.transformPageToSummary(page);
          const categories = await this.getPostCategories(page.id);
          return { ...post, postCategories: categories };
        })
      );

      return postsWithCategories;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw new Error('Failed to fetch blog posts from Notion');
    }
  }

  /**
   * Fetch a specific blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // First, find the page by slug
      const response = await this.client.databases.query({
        database_id: this.blogDatabaseId,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
      });

      if (response.results.length === 0) {
        return null;
      }

      const page = response.results[0] as any;
      
      // Fetch the full page content
      const pageContent = await this.client.blocks.children.list({
        block_id: page.id,
      });

      // Get categories for this post
      const categories = await this.getPostCategories(page.id);

      return this.transformPageToFullPost(page, pageContent, categories);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post from Notion');
    }
  }

  /**
   * Get categories for a specific post
   */
  async getPostCategories(postId: string): Promise<string[]> {
    try {
      const response = await this.client.databases.query({
        database_id: this.categoriesDatabaseId,
        filter: {
          property: 'Posts',
          relation: {
            contains: postId,
          },
        },
      });

      return response.results.map((category: any) => 
        this.getPropertyValue(category.properties.Nombre, 'title')
      );
    } catch (error) {
      console.error('Error fetching post categories:', error);
      return [];
    }
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<PostCategory[]> {
    try {
      const response = await this.client.databases.query({
        database_id: this.categoriesDatabaseId,
      });

      return response.results.map((category: any) => ({
        id: category.id,
        nombre: this.getPropertyValue(category.properties.Nombre, 'title'),
        posts: this.getPropertyValue(category.properties.Posts, 'relation') || [],
        totalPosts: this.getPropertyValue(category.properties['Total posts'], 'number') || 0,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Transform Notion page to blog post summary
   */
  private transformPageToSummary(page: any): BlogPostSummary {
    const properties = page.properties;
    
    return {
      id: page.id,
      title: this.getPropertyValue(properties.Title, 'title'),
      slug: this.getPropertyValue(properties.Slug, 'rich_text'),
      metaTitle: this.getPropertyValue(properties['Meta Title'], 'rich_text'),
      metaDescription: this.getPropertyValue(properties['Meta Description'], 'rich_text'),
      publishedDate: this.getPropertyValue(properties['Published Date'], 'date'),
      language: this.getPropertyValue(properties.Language, 'select') as 'English' | 'Spanish',
      tags: this.getPropertyValue(properties.Tags, 'multi_select') || [],
      postCategories: [], // Will be filled by the calling method
      readTime: this.calculateReadTime(properties.Content),
      createdTime: this.getPropertyValue(properties['Created time'], 'created_time'),
      lastEditedTime: this.getPropertyValue(properties['Last edited time'], 'last_edited_time'),
    };
  }

  /**
   * Transform Notion page to full blog post
   */
  private transformPageToFullPost(page: any, content: any, categories: string[] = []): BlogPost {
    const properties = page.properties;
    
    return {
      id: page.id,
      title: this.getPropertyValue(properties.Title, 'title'),
      slug: this.getPropertyValue(properties.Slug, 'rich_text'),
      metaTitle: this.getPropertyValue(properties['Meta Title'], 'rich_text'),
      metaDescription: this.getPropertyValue(properties['Meta Description'], 'rich_text'),
      publishedDate: this.getPropertyValue(properties['Published Date'], 'date'),
      status: this.getPropertyValue(properties.Status, 'status') as 'Published' | 'Draft' | 'Archived',
      language: this.getPropertyValue(properties.Language, 'select') as 'English' | 'Spanish',
      tags: this.getPropertyValue(properties.Tags, 'multi_select') || [],
      postCategories: categories,
      readTime: this.calculateReadTime(properties.Content),
      content: content.results,
      createdTime: this.getPropertyValue(properties['Created time'], 'created_time'),
      lastEditedTime: this.getPropertyValue(properties['Last edited time'], 'last_edited_time'),
    };
  }

  /**
   * Extract property value from Notion page properties
   */
  private getPropertyValue(property: any, type: string): any {
    if (!property || !property[type]) return null;
    
    switch (type) {
      case 'title':
        return property.title[0]?.plain_text || '';
      case 'rich_text':
        return property.rich_text[0]?.plain_text || '';
      case 'date':
        return property.date?.start || '';
      case 'select':
        return property.select?.name || '';
      case 'status':
        return property.status?.name || '';
      case 'multi_select':
        return property.multi_select?.map((item: any) => item.name) || [];
      case 'url':
        return property.url || '';
      case 'relation':
        return property.relation?.map((item: any) => item.id) || [];
      case 'number':
        return property.number || 0;
      case 'created_time':
        return property.created_time || '';
      case 'last_edited_time':
        return property.last_edited_time || '';
      default:
        return null;
    }
  }

  /**
   * Calculate estimated reading time
   */
  private calculateReadTime(content: any): number {
    if (!content || !content.rich_text) return 5; // Default 5 minutes
    
    const text = content.rich_text.map((item: any) => item.plain_text).join(' ');
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

export default NotionService;
