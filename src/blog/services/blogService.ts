import { BlogPost, BlogPostSummary } from '../types';
import NotionServiceSimple from './notionServiceSimple';

// Import JSON files - these will be generated at build time
import postsIndex from '../content/index.json';

class BlogService {
  private posts: BlogPostSummary[] = [];
  private postsCache: Map<string, BlogPost> = new Map();

  constructor() {
    this.posts = postsIndex as BlogPostSummary[];
  }

  /**
   * Get all blog posts
   */
  getAllPosts(): BlogPostSummary[] {
    return this.posts;
  }

  /**
   * Get a specific blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    // Check cache first
    if (this.postsCache.has(slug)) {
      return this.postsCache.get(slug)!;
    }

    try {
      // Try to load from cached files first
      console.log(`Loading post: ${slug}`);
      const postModule = await import(`../content/${slug}.json`);
      const post = postModule.default as BlogPost;
      
      console.log(`Successfully loaded post:`, post.title);
      
      // Cache the post
      this.postsCache.set(slug, post);
      
      return post;
    } catch (error) {
      console.error(`Error loading post ${slug}:`, error);
      
      // If no cached file, try Notion service (when available)
      console.log(`No cached file for ${slug}, trying Notion service...`);
      
      // For now, use the simple service
      const notionService = new NotionServiceSimple({
        blogDatabaseId: '27cc1b93-843e-8052-88e9-ce0be76f0f82',
        categoriesDatabaseId: '27cc1b93-843e-8093-9a03-c484ab4f3b88',
        apiKey: 'not-set-up-yet'
      });
      
      const post = await notionService.getPostBySlug(slug);
      if (post) {
        this.postsCache.set(slug, post);
      }
      
      return post;
    }
  }

  /**
   * Get posts by tag
   */
  getPostsByTag(tag: string): BlogPostSummary[] {
    return this.posts.filter(post => 
      post.tags.some(postTag => 
        postTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  /**
   * Get recent posts (excluding current post)
   */
  getRecentPosts(excludeSlug?: string, limit: number = 3): BlogPostSummary[] {
    return this.posts
      .filter(post => post.slug !== excludeSlug)
      .slice(0, limit);
  }

  /**
   * Search posts by title or description
   */
  searchPosts(query: string): BlogPostSummary[] {
    const lowercaseQuery = query.toLowerCase();
    
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.metaDescription?.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get all unique tags
   */
  getAllTags(): string[] {
    const allTags = this.posts.flatMap(post => post.tags);
    return Array.from(new Set(allTags)).sort();
  }

  /**
   * Get posts count
   */
  getPostsCount(): number {
    return this.posts.length;
  }
}

// Export singleton instance
export default new BlogService();
