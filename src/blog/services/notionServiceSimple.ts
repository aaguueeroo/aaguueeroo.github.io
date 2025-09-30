// Simplified Notion service that works without external packages
// This will be replaced once you install @notionhq/client

import { BlogPost, BlogPostSummary, PostCategory, NotionConfig } from '../types';

class NotionServiceSimple {
  private blogDatabaseId: string;
  private categoriesDatabaseId: string;

  constructor(config: NotionConfig) {
    this.blogDatabaseId = config.blogDatabaseId;
    this.categoriesDatabaseId = config.categoriesDatabaseId;
  }

  /**
   * Fetch all published blog posts from Notion
   * This is a placeholder - you'll need to install @notionhq/client first
   */
  async getAllPosts(): Promise<BlogPostSummary[]> {
    console.log('⚠️  Notion integration not set up yet. Please follow the setup instructions.');
    console.log('📝 Blog Database ID:', this.blogDatabaseId);
    console.log('📝 Categories Database ID:', this.categoriesDatabaseId);
    
    // Return sample data for now
    return [
      {
        id: 'sample-1',
        title: 'Welcome to My Blog',
        slug: 'welcome-to-my-blog',
        metaTitle: 'Welcome to My Blog - Julia Agüero',
        metaDescription: 'This is a sample blog post. Set up Notion integration to see real content.',
        publishedDate: '2024-09-28',
        language: 'English',
        tags: ['Welcome', 'Getting Started'],
        postCategories: ['General'],
        readTime: 3,
        createdTime: '2024-09-28T10:00:00.000Z',
        lastEditedTime: '2024-09-28T10:00:00.000Z'
      }
    ];
  }

  /**
   * Fetch a specific blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    console.log('⚠️  Notion integration not set up yet. Please follow the setup instructions.');
    
    if (slug === 'welcome-to-my-blog') {
      return {
        id: 'sample-1',
        title: 'Welcome to My Blog',
        slug: 'welcome-to-my-blog',
        metaTitle: 'Welcome to My Blog - Julia Agüero',
        metaDescription: 'This is a sample blog post. Set up Notion integration to see real content.',
        publishedDate: '2024-09-28',
        status: 'Published',
        language: 'English',
        tags: ['Welcome', 'Getting Started'],
        postCategories: ['General'],
        readTime: 3,
        content: [
          {
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Welcome to my blog! This is a sample post. To see real content from Notion, please follow the setup instructions to install the required packages and configure your Notion integration.'
                  }
                }
              ]
            }
          }
        ],
        createdTime: '2024-09-28T10:00:00.000Z',
        lastEditedTime: '2024-09-28T10:00:00.000Z'
      };
    }
    
    return null;
  }

  /**
   * Get categories for a specific post
   */
  async getPostCategories(_postId: string): Promise<string[]> {
    console.log('⚠️  Notion integration not set up yet.');
    return ['General'];
  }

  /**
   * Get all categories
   */
  async getAllCategories(): Promise<PostCategory[]> {
    console.log('⚠️  Notion integration not set up yet.');
    return [
      {
        id: 'general',
        nombre: 'General',
        posts: ['sample-1'],
        totalPosts: 1
      }
    ];
  }
}

export default NotionServiceSimple;
