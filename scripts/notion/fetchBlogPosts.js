import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;
const NOTION_CATEGORIES_DATABASE_ID = process.env.NOTION_CATEGORIES_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_BLOG_DATABASE_ID || !NOTION_CATEGORIES_DATABASE_ID) {
  console.error('❌ Missing required environment variables:');
  console.error('   NOTION_API_KEY, NOTION_BLOG_DATABASE_ID, and NOTION_CATEGORIES_DATABASE_ID must be set');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Fetch all blocks for a parent, recursively including children
 */
async function fetchBlocksRecursive(blockId) {
  const all = [];
  let cursor = undefined;
  do {
    const resp = await notion.blocks.children.list({ block_id: blockId, start_cursor: cursor });
    for (const block of resp.results) {
      let enriched = block;
      if (block.has_children) {
        try {
          const children = await fetchBlocksRecursive(block.id);
          enriched = { ...block, children };
        } catch (e) {
          enriched = { ...block, children: [] };
        }
      }
      all.push(enriched);
    }
    cursor = resp.has_more ? resp.next_cursor : undefined;
  } while (cursor);
  return all;
}

/**
 * Fetch all published blog posts from Notion
 */
async function fetchAllPosts() {
  try {
    console.log('📡 Fetching blog posts from Notion...');
    
    const response = await notion.databases.query({
      database_id: NOTION_BLOG_DATABASE_ID,
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

    console.log(`✅ Found ${response.results.length} published posts`);

    const posts = await Promise.all(
      response.results.map(async (page) => {
        const post = await fetchPostContent(page);
        return post;
      })
    );

    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    throw error;
  }
}

/**
 * Fetch full content for a specific post
 */
async function fetchPostContent(page) {
  try {
    // Fetch the page content (recursive)
    const blocks = await fetchBlocksRecursive(page.id);

    // Prepare title and slug early
    const title = getPropertyValue(page.properties.Title, 'title') || 'Untitled';
    const slug = getPropertyValue(page.properties.Slug, 'rich_text') || generateSlug(title);

    // Get categories for this post
    const categories = await getPostCategories(page.id);

    // Get page cover image with sensible fallbacks
    let coverImage = getDefaultCoverImage(categories, slug);
    try {
      const pageDetails = await notion.pages.retrieve({ page_id: page.id });
      if (pageDetails.cover) {
        let notionCoverUrl = null;
        if (pageDetails.cover.type === 'external') {
          notionCoverUrl = pageDetails.cover.external.url;
        } else if (pageDetails.cover.type === 'file') {
          notionCoverUrl = pageDetails.cover.file.url;
        }
        
        // Only use the Notion cover if it's publicly accessible
        if (notionCoverUrl && isPubliclyAccessible(notionCoverUrl)) {
          coverImage = notionCoverUrl;
          console.log(`📸 Using Notion cover for ${page.properties.Title.title[0]?.plain_text}: ${coverImage}`);
        } else {
          console.log(`📸 Notion cover not publicly accessible for ${page.properties.Title.title[0]?.plain_text}, using default`);
        }
      } else {
        console.log(`📸 No cover image for ${page.properties.Title.title[0]?.plain_text}, using default`);
      }
    } catch (error) {
      console.log(`⚠️  Could not fetch cover image for ${page.properties.Title.title[0]?.plain_text}:`, error.message);
    }

    // If still default, try first image block from content
    if (blocks && Array.isArray(blocks)) {
      const imageBlock = blocks.find((b) => b.type === 'image' && b.image);
      if (imageBlock) {
        let imageUrl = null;
        if (imageBlock.image.type === 'external') {
          imageUrl = imageBlock.image.external.url;
        } else if (imageBlock.image.type === 'file') {
          imageUrl = imageBlock.image.file.url;
        }
        if (imageUrl && isPubliclyAccessible(imageUrl)) {
          coverImage = imageUrl;
          console.log(`🖼️ Using first content image for ${title}: ${coverImage}`);
        }
      }
    }

    const post = {
      id: page.id,
      title: title,
      slug: slug,
      subtitle: getPropertyValue(page.properties.Subtitle, 'rich_text') || undefined,
      metaTitle: getPropertyValue(page.properties['Meta Title'], 'rich_text') || getPropertyValue(page.properties.Title, 'title'),
      metaDescription: getPropertyValue(page.properties['Meta Description'], 'rich_text') || getPropertyValue(page.properties.Title, 'title'),
      publishedDate: getPropertyValue(page.properties['Published Date'], 'date') || new Date().toISOString().split('T')[0],
      status: getPropertyValue(page.properties.Status, 'status') || 'Published',
      language: getPropertyValue(page.properties.Language, 'select') || 'English',
      series: getPropertyValue(page.properties.Series, 'select') || undefined,
      tags: getPropertyValue(page.properties.Tags, 'multi_select') || [],
      postCategories: categories || [],
      readTime: calculateReadTime(blocks) || 5,
      content: blocks || [],
      createdTime: getPropertyValue(page.properties['Created time'], 'created_time') || new Date().toISOString(),
      lastEditedTime: getPropertyValue(page.properties['Last edited time'], 'last_edited_time') || new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      coverImage: coverImage,
      author: 'Julia Agüero',
    };

    return post;
  } catch (error) {
    console.error(`❌ Error fetching content for post ${page.id}:`, error);
    throw error;
  }
}

/**
 * Get categories for a specific post
 */
async function getPostCategories(postId) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_CATEGORIES_DATABASE_ID,
      filter: {
        property: 'Posts',
        relation: {
          contains: postId,
        },
      },
    });

    return response.results.map((category) => 
      getPropertyValue(category.properties.Nombre, 'title')
    );
  } catch (error) {
    console.error('Error fetching post categories:', error);
    return [];
  }
}

/**
 * Extract property value from Notion page properties
 */
function getPropertyValue(property, type) {
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
      return property.multi_select?.map(item => item.name) || [];
    case 'url':
      return property.url || '';
    case 'relation':
      return property.relation?.map(item => item.id) || [];
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
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title) {
  if (!title) return 'untitled';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

/**
 * Get default cover image based on category
 */
function getDefaultCoverImage(categories, slug = '') {
  const categoryImages = {
    'Flutter': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
    'React Native': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    'UX Design': 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop',
    'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e6e9c?w=400&h=200&fit=crop',
    'Tutorials': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
  };
  
  const firstCategory = categories && categories[0];
  if (firstCategory && categoryImages[firstCategory]) return categoryImages[firstCategory];
  // Seeded placeholder by slug to avoid duplicates across posts
  const seed = encodeURIComponent(slug || Math.random().toString(36).slice(2));
  return `https://picsum.photos/seed/${seed}/800/400`;
}

/**
 * Check if a URL is publicly accessible (not a Notion internal URL)
 */
function isPubliclyAccessible(url) {
  if (!url) return false;
  // Notion internal URLs are not publicly accessible
  if (url.includes('notion.so/images/page-cover/')) return false;
  if (url.includes('notion.so/images/')) return false;
  return true;
}

/**
 * Calculate estimated reading time
 */
function calculateReadTime(blocks) {
  if (!blocks || !Array.isArray(blocks)) return 5;
  
  let wordCount = 0;
  
  const extractTextFromBlock = (block) => {
    if (!block) return '';
    
    // Handle different block types that contain text
    const textBlocks = [
      'paragraph', 'heading_1', 'heading_2', 'heading_3', 
      'bulleted_list_item', 'numbered_list_item', 'quote', 'toggle'
    ];
    
    if (textBlocks.includes(block.type)) {
      const richText = block[block.type]?.rich_text;
      if (richText && Array.isArray(richText)) {
        return richText.map(t => t.plain_text || '').join('');
      }
    }
    
    return '';
  };
  
  const processBlocks = (blocksArray) => {
    blocksArray.forEach(block => {
      const text = extractTextFromBlock(block);
      if (text.trim()) {
        wordCount += text.split(/\s+/).filter(word => word.length > 0).length;
      }
      
      // Recursively process children blocks
      if (block.children && Array.isArray(block.children)) {
        processBlocks(block.children);
      }
    });
  };
  
  processBlocks(blocks);
  
  // Average reading speed: 200 words per minute
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  console.log(`📖 Calculated read time: ${wordCount} words = ${minutes} minutes`);
  return minutes;
}

/**
 * Extract content preview from blocks
 */
function extractContentPreview(blocks, maxLength = 150) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  let preview = '';
  
  for (const block of blocks) {
    if (block.type === 'paragraph' && block.paragraph?.rich_text) {
      const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
      if (text.trim()) {
        preview += text + ' ';
        if (preview.length > maxLength) {
          break;
        }
      }
    }
  }
  
  // Clean up and truncate
  preview = preview.trim();
  if (preview.length > maxLength) {
    preview = preview.substring(0, maxLength).trim();
    // Find the last complete word
    const lastSpace = preview.lastIndexOf(' ');
    if (lastSpace > maxLength * 0.8) {
      preview = preview.substring(0, lastSpace);
    }
    preview += '...';
  }
  
  return preview;
}

/**
 * Save posts to JSON files
 */
async function savePostsToFiles(posts) {
  const contentDir = path.join(__dirname, '../../src/blog/content');
  
  // Ensure content directory exists
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Save individual post files
  for (const post of posts) {
    const postFile = path.join(contentDir, `${post.slug}.json`);
    fs.writeFileSync(postFile, JSON.stringify(post, null, 2));
    console.log(`💾 Saved: ${post.slug}.json`);
  }

  // Save posts index
  const indexFile = path.join(contentDir, 'index.json');
  const postsIndex = posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    publishedDate: post.publishedDate,
    language: post.language,
    series: post.series,
    tags: post.tags,
    postCategories: post.postCategories,
    readTime: post.readTime,
    createdTime: post.createdTime,
    lastEditedTime: post.lastEditedTime,
      coverImage: post.coverImage,
      author: post.author,
      contentPreview: extractContentPreview(post.content),
  }));
  
  fs.writeFileSync(indexFile, JSON.stringify(postsIndex, null, 2));
  console.log('💾 Saved: index.json');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🚀 Starting Notion blog posts fetch...');
    
    const posts = await fetchAllPosts();
    await savePostsToFiles(posts);
    
    console.log('✅ Blog posts fetch completed successfully!');
    console.log(`📊 Total posts: ${posts.length}`);
  } catch (error) {
    console.error('❌ Failed to fetch blog posts:', error);
    process.exit(1);
  }
}

// Run the script
main();
