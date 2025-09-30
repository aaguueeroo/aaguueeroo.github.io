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

  return (
    <>
      <SEO
        title={getPageTitle()}
        description={getPageDescription()}
        url={getPageUrl()}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ flex: 1, pt: 4, pb: 24 }}>
          {slug ? (
            <BlogPostComponent
              post={currentPost}
              loading={loading}
              error={error}
            />
          ) : (
            <BlogListing
              posts={posts}
              loading={loading}
              error={error}
            />
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default BlogPage;