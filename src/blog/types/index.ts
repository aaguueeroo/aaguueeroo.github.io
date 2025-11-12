export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedDate: string;
  status: 'Published' | 'Draft' | 'Archived';
  language: 'English' | 'Spanish';
  series?: string;
  tags: string[];
  postCategories: string[]; // Array of category names
  content: any; // Notion block content
  recordMap?: any; // For react-notion-x rendering
  readTime?: number;
  createdTime?: string;
  lastEditedTime?: string;
  coverImage?: string;
  author?: string;
  pointTo?: string[]; // Array of post IDs this post points to
  pointedBy?: string[]; // Array of post IDs that point to this post
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedDate: string;
  language: 'English' | 'Spanish';
  series?: string;
  tags: string[];
  postCategories: string[];
  readTime?: number;
  createdTime?: string;
  lastEditedTime?: string;
  coverImage?: string;
  author?: string;
  description?: string;
  contentPreview?: string;
  pointTo?: string[]; // Array of post IDs this post points to
  pointedBy?: string[]; // Array of post IDs that point to this post
}

export interface PostCategory {
  id: string;
  nombre: string; // Spanish for "Name"
  posts: string[]; // Array of post IDs
  totalPosts: number;
}

export interface NotionConfig {
  blogDatabaseId: string;
  categoriesDatabaseId: string;
  apiKey: string;
  baseUrl?: string;
}
