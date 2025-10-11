# Notion Blog Fetch Script

This script fetches blog posts from Notion and downloads all images locally to ensure they work on your static website.

## Why Download Images?

Notion image URLs are temporary and include expiring AWS S3 tokens. When these URLs expire, images will break on your static website. This script:

1. **Downloads cover images** from Notion and saves them locally
2. **Downloads content images** from blog posts and updates their references
3. **Converts Notion URLs to local asset paths** that work on your static site
4. **Handles non-Notion URLs** by keeping them as-is (e.g., external image hosts)

## How It Works

### Cover Images
- Checks if the post has a cover image in Notion
- Downloads it to `/src/assets/images/blog/`
- Names it: `{slug}-cover.{extension}`
- Updates JSON with path: `/src/assets/images/blog/{slug}-cover.jpg`

### Content Images
- Recursively scans all blocks in the post
- Downloads any images found
- Names them: `{slug}-image-{number}.{extension}`
- Updates block references with local paths

### Smart Caching
- Checks if image already exists before downloading
- Skips re-downloading if file is present
- Useful for incremental updates

## Usage

### Prerequisites

Make sure you have the following environment variables set in your `.env` file:

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_BLOG_DATABASE_ID=your_database_id
NOTION_CATEGORIES_DATABASE_ID=your_categories_database_id
```

### Running the Script

```bash
# From the project root
npm run fetch-blog

# Or directly with node
node scripts/notion/fetchBlogPosts.js
```

### What Gets Created

After running the script, you'll have:

```
src/
  assets/
    images/
      blog/
        a-new-orbit-flutter-tech-and-beyond-cover.jpg
        a-new-orbit-flutter-tech-and-beyond-image-1.png
        flatto-learning-in-public-1-cover.png
        ...
  blog/
    content/
      index.json
      a-new-orbit-flutter-tech-and-beyond.json
      flatto-learning-in-public-1.json
      ...
```

## Output Examples

### Console Output

```
🚀 Starting Notion blog posts fetch...
📡 Fetching blog posts from Notion...
✅ Found 2 published posts
📸 Found Notion cover for A New Orbit: Flutter, Tech, and Beyond
📥 Downloading image from: https://prod-files-secure.s3.us-west-2.amazonaws.com/...
💾 Saved image: a-new-orbit-flutter-tech-and-beyond-cover.jpg
✅ Cover image saved: /src/assets/images/blog/a-new-orbit-flutter-tech-and-beyond-cover.jpg
🖼️  Processing content images for a-new-orbit-flutter-tech-and-beyond...
💾 Saved: a-new-orbit-flutter-tech-and-beyond.json
💾 Saved: index.json
✅ Blog posts fetch completed successfully!
📊 Total posts: 2
```

### JSON Structure

**index.json** (blog listing):
```json
[
  {
    "id": "...",
    "title": "A New Orbit: Flutter, Tech, and Beyond",
    "slug": "a-new-orbit-flutter-tech-and-beyond",
    "coverImage": "/src/assets/images/blog/a-new-orbit-flutter-tech-and-beyond-cover.jpg",
    ...
  }
]
```

**Individual post file**:
```json
{
  "id": "...",
  "title": "A New Orbit: Flutter, Tech, and Beyond",
  "slug": "a-new-orbit-flutter-tech-and-beyond",
  "coverImage": "/src/assets/images/blog/a-new-orbit-flutter-tech-and-beyond-cover.jpg",
  "content": [
    {
      "type": "image",
      "image": {
        "type": "file",
        "file": {
          "url": "/src/assets/images/blog/a-new-orbit-flutter-tech-and-beyond-image-1.png"
        }
      }
    }
  ],
  ...
}
```

## Troubleshooting

### Images Not Downloading

1. Check your Notion API permissions
2. Ensure the images directory is writable
3. Check console output for specific error messages

### Network Errors

If downloads fail:
- The script will fallback to the original Notion URL
- You can run the script again to retry failed downloads
- Check your internet connection

### Already Existing Images

- The script skips downloading if the file already exists
- Delete images from `/src/assets/images/blog/` if you want to re-download them
- Useful for updating images that have changed in Notion

## Best Practices

1. **Run after Notion updates**: Always run this script after making changes in Notion
2. **Commit images**: Include downloaded images in your git repository
3. **Build process**: Consider adding this to your build pipeline
4. **Image optimization**: Optionally compress images after downloading for better performance

## Next Steps

After running the fetch script:

1. Review the downloaded images in `/src/assets/images/blog/`
2. Test your blog locally to ensure images display correctly
3. Commit both JSON files and images to git
4. Deploy your site

The images will now load reliably from your static assets instead of expiring Notion URLs!

