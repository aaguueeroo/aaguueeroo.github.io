import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Footer } from '../../components/Footer';
import { SEO } from '../../components/SEO';
import BlogListing from '../../blog/components/BlogListing';
import BlogPostComponent from '../../blog/components/BlogPost';
import blogService from '../../blog/services/blogService';
import { BlogPost, BlogPostSummary } from '../../blog/types';

const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(undefined);

        if (slug) {
          // Loading individual post
          console.log('Loading individual post with slug:', slug);
          const post = await blogService.getPostBySlug(slug);
          console.log('Post loaded:', post);
          if (post) {
            setCurrentPost(post);
            // Also load recent posts for sidebar
            const recentPosts = blogService.getRecentPosts(slug, 3);
            setPosts(recentPosts);
          } else {
            setError('Post not found');
          }
        } else {
          // Loading all posts
          console.log('Loading all posts');
          const allPosts = blogService.getAllPosts();
          console.log('All posts loaded:', allPosts);
          setPosts(allPosts);
          setCurrentPost(null);
        }
      } catch (err) {
        console.error('Error loading blog content:', err);
        setError('Failed to load blog content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  const getPageTitle = (): string => {
    if (slug && currentPost) {
      return currentPost.metaTitle || `${currentPost.title} - Julia Agüero Blog`;
    }
    return 'Blog - Julia Agüero Mobile App Development Insights';
  };

  const getPageDescription = (): string => {
    if (slug && currentPost) {
      return currentPost.metaDescription || currentPost.title;
    }
    return 'Read insights about mobile app development, UX design, and the latest trends in the industry. Tips, tutorials, and thoughts from a mobile app developer.';
  };

  const getPageUrl = () => {
    if (slug) {
      return `/blog/${slug}`;
    }
    return '/blog';
  };

  const getPageImage = (): string | undefined => {
    if (slug && currentPost && currentPost.coverImage) {
      // If it's a local path, convert it to full URL
      if (currentPost.coverImage.startsWith('/')) {
        return `https://juliaaguero.com${currentPost.coverImage}`;
      }
      return currentPost.coverImage;
    }
    return undefined;
  };

  const getPageType = (): string => {
    if (slug && currentPost) {
      return 'article';
    }
    return 'website';
  };

  return (
    <>
      <SEO
        title={getPageTitle()}
        description={getPageDescription()}
        url={getPageUrl()}
        image={getPageImage()}
        type={getPageType()}
        author={currentPost?.author}
        publishedDate={currentPost?.publishedDate}
        modifiedDate={currentPost?.lastEditedTime}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {slug ? (
          <Box sx={{ flex: 1, pt: 4, pb: 24 }}>
            <BlogPostComponent
              post={currentPost}
              loading={loading}
              error={error}
            />
          </Box>
        ) : (
          <Box sx={{ flex: 1 }}>
            <BlogListing
              posts={posts}
              loading={loading}
              error={error}
            />
          </Box>
        )}
        <Footer hideSocialMedia={true} />
      </Box>
    </>
  );
};

export default BlogPage;