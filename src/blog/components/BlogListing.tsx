import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Collapse,
  Drawer,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowUpIcon from '@mui/icons-material/ArrowUpward';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import { BlogPostSummary } from '../types';
import { MaxWidths, Typography as TypographyConstants } from '../../theme/constants';

interface BlogListingProps {
  posts: BlogPostSummary[];
  loading?: boolean;
  error?: string;
}

const BlogListing: React.FC<BlogListingProps> = ({ posts, loading, error }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedSeries, setSelectedSeries] = useState<string>('All');
  const [openCategories, setOpenCategories] = useState<boolean>(true);
  const [openTime, setOpenTime] = useState<boolean>(true);
  const [openLanguage, setOpenLanguage] = useState<boolean>(true);
  const [openSeries, setOpenSeries] = useState<boolean>(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  // Mobile drawer handlers
  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  // Helper functions for time filtering
  const isWithinTimeRange = (dateString: string, timeRange: string): boolean => {
    const postDate = new Date(dateString);
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return postDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return postDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        return postDate >= yearAgo;
      default:
        return true;
    }
  };

  const getTimeFilterLabel = (filter: string): string => {
    switch (filter) {
      case 'week': return 'This week';
      case 'month': return 'This month';
      case 'year': return 'This year';
      default: return 'All time';
    }
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by categories (multi-select, OR logic)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => {
        const cats = post.postCategories || [];
        return cats.some(c => selectedCategories.includes(c));
      });
    }
    
    // Filter by time range
    if (timeFilter !== 'all') {
      filtered = filtered.filter(post => 
        isWithinTimeRange(post.publishedDate, timeFilter)
      );
    }
    
    // Filter by language
    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(post => 
        post.language === selectedLanguage
      );
    }
    
    // Filter by series
    if (selectedSeries !== 'All') {
      filtered = filtered.filter(post => post.series === selectedSeries);
    }
    
    // Sort chronologically
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedDate).getTime();
      const dateB = new Date(b.publishedDate).getTime();
      
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, selectedCategories, timeFilter, selectedLanguage, selectedSeries, sortOrder]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  const handleTimeFilter = (filter: string) => {
    setTimeFilter(filter);
  };

  const handleLanguageFilter = (language: string) => {
    setSelectedLanguage(language);
  };
  
  const handleSeriesFilter = (series: string) => {
    setSelectedSeries(series);
  };

  // Get unique categories from posts
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach(post => {
      if (post.postCategories) {
        post.postCategories.forEach(category => categories.add(category));
      }
    });
    return Array.from(categories).sort();
  }, [posts]);

  // Get unique languages from posts
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    posts.forEach(post => {
      if (post.language) {
        languages.add(post.language);
      }
    });
    return ['All', ...Array.from(languages).sort()];
  }, [posts]);
  
  // Get unique series from posts
  const availableSeries = useMemo(() => {
    const series = new Set<string>();
    posts.forEach(post => {
      if (post.series) {
        series.add(post.series);
      }
    });
    return ['All', ...Array.from(series).sort()];
  }, [posts]);

  // Determine if filters are useful (more than one unique value available)
  const showCategoryFilter = useMemo(() => availableCategories.length > 1, [availableCategories]);
  const showLanguageFilter = useMemo(() => availableLanguages.filter(l => l !== 'All').length > 1, [availableLanguages]);
  const showSeriesFilter = useMemo(() => availableSeries.filter(s => s !== 'All').length > 0, [availableSeries]);

  // Time filter usefulness: show only if posts span more than one disjoint time bucket
  const showTimeFilter = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

    let inWeek = false;
    let inMonth = false;
    let inYear = false;

    posts.forEach(p => {
      const d = new Date(p.publishedDate);
      if (isNaN(d.getTime())) return;
      if (d >= weekAgo) inWeek = true;
      else if (d >= monthAgo) inMonth = true;
      else if (d >= yearAgo) inYear = true;
    });

    const bucketCount = [inWeek, inMonth, inYear].filter(Boolean).length;
    return bucketCount > 1;
  }, [posts]);

  // Reusable Filters Section Component
  const FiltersSection = () => (
    <Box sx={{ px: 4, pb: 4 }}>
      {/* Categories Filter */}
      {showCategoryFilter && (
        <Box sx={{ mb: 4, }}>
          <Box
            onClick={() => setOpenCategories(!openCategories)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <Typography
              variant="h4"
              sx={{
                ...TypographyConstants.h4,
                mb: 0,
              }}
            >
              Categories
            </Typography>
            <ExpandMoreIcon sx={{ transform: openCategories ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </Box>
          <Collapse in={openCategories}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {availableCategories.map((category) => {
                const selected = selectedCategories.includes(category);
                return (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => toggleCategory(category)}
                    clickable
                    color={selected ? 'primary' : 'default'}
                    variant={selected ? 'filled' : 'outlined'}
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                    }}
                  />
                );
              })}
              {selectedCategories.length > 0 && (
                <Chip
                  label="Clear"
                  onClick={() => setSelectedCategories([])}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>
          </Collapse>
        </Box>
      )}

      {/* Time Filter */}
      {showTimeFilter && (
        <Box sx={{ mb: 4 }}>
          <Box
            onClick={() => setOpenTime(!openTime)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <Typography
              variant="h4"
              sx={{
                ...TypographyConstants.h4,
                mb: 0,
              }}
            >
              Time Period
            </Typography>
            <ExpandMoreIcon sx={{ transform: openTime ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </Box>
          <Collapse in={openTime}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {[
                { value: 'all', label: 'All time' },
                { value: 'week', label: 'This week' },
                { value: 'month', label: 'This month' },
                { value: 'year', label: 'This year' },
              ].map((option) => (
                <Typography
                  key={option.value}
                  variant="body2"
                  onClick={() => handleTimeFilter(option.value)}
                  sx={{
                    ...TypographyConstants.bodySmall,
                    color: timeFilter === option.value ? 'primary.main' : 'text.secondary',
                    backgroundColor: timeFilter === option.value ? 'primary.50' : 'transparent',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.50',
                      color: 'primary.main',
                    },
                  }}
                >
                  {option.label}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      )}

      {/* Language Filter */}
      {showLanguageFilter && (
        <Box sx={{ mb: 4 }}>
          <Box
            onClick={() => setOpenLanguage(!openLanguage)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <Typography
              variant="h4"
              sx={{
                ...TypographyConstants.h4,
                mb: 0,
              }}
            >
              Language
            </Typography>
            <ExpandMoreIcon sx={{ transform: openLanguage ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </Box>
          <Collapse in={openLanguage}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {availableLanguages.map((language) => (
                <Typography
                  key={language}
                  variant="body2"
                  onClick={() => handleLanguageFilter(language)}
                  sx={{
                    ...TypographyConstants.bodySmall,
                    color: selectedLanguage === language ? 'primary.main' : 'text.secondary',
                    backgroundColor: selectedLanguage === language ? 'primary.50' : 'transparent',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.50',
                      color: 'primary.main',
                    },
                  }}
                >
                  {language}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      )}

      {/* Series Filter */}
      {showSeriesFilter && (
        <Box sx={{ mb: 4 }}>
          <Box
            onClick={() => setOpenSeries(!openSeries)}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <Typography
              variant="h4"
              sx={{
                ...TypographyConstants.h4,
                mb: 0,
              }}
            >
              Series
            </Typography>
            <ExpandMoreIcon sx={{ transform: openSeries ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </Box>
          <Collapse in={openSeries}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              {availableSeries.map((series) => (
                <Typography
                  key={series}
                  variant="body2"
                  onClick={() => handleSeriesFilter(series)}
                  sx={{
                    ...TypographyConstants.bodySmall,
                    color: selectedSeries === series ? 'primary.main' : 'text.secondary',
                    backgroundColor: selectedSeries === series ? 'primary.50' : 'transparent',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'primary.50',
                      color: 'primary.main',
                    },
                  }}
                >
                  {series}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );

  // Author Info Section Component
  const AuthorSection = () => (
    <Box>
      <Typography
        variant="h4"
        sx={{
          ...TypographyConstants.h4,
          mb: 3,
        }}
      >
        About the Author
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'left',
        textAlign: 'left',
        p: 3,
        borderRadius: 2,
      }}>
        {/* Author Image */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            mb: 2,
            overflow: 'hidden',
          }}
        >
          <img
            src="/src/assets/images/about-the-author.jpg"
            alt="Julia Agüero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Author Name */}
        <Typography
          variant="h4"
          component="a"
          href="/about"
          sx={{
            ...TypographyConstants.h4,
            color: 'primary.main',
            mb: 1,
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.dark',
            },
          }}
        >
          Julia Agüero
        </Typography>

        {/* Author Title */}
        <Typography
          variant="body2"
          sx={{
            ...TypographyConstants.bodyExtraSmall,
            color: 'text.secondary',
            mb: 2,
            fontWeight: 600,
          }}
        >
          Mobile App Developer & UX Designer
        </Typography>

        {/* Author Description */}
        <Typography
          variant="body2"
          sx={{
            ...TypographyConstants.bodyExtraSmall,
            color: 'text.secondary',
            lineHeight: 1.6,
            maxWidth: { xs: '100%', md: '200px' },
            mb: 2,
          }}
        >
          Passionate about creating beautiful, functional mobile applications. 
          I share insights about Flutter, React Native, and mobile UX design.
        </Typography>

        {/* Social Media Links - Hidden on mobile */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-start' }}>
            <IconButton
              href="https://github.com/aaguueeroo"
              target="_blank"
              sx={{
                color: 'secondary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://x.com/aaguueeroo"
              target="_blank"
              sx={{
                color: 'secondary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label="X"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/julia-aguero-fraguas/"
              target="_blank"
              sx={{
                color: 'secondary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              ...TypographyConstants.h2,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            No blog posts yet
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ...TypographyConstants.body,
              color: 'text.secondary',
            }}
          >
            Check back soon for new content!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: MaxWidths.content,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 8, sm: 10, md: 12 }, // Extra bottom padding to prevent footer overlap
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            ...TypographyConstants.h1,
            textAlign: 'center',
            mb: 4,
          }}
        >
          Dimorpho's News
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...TypographyConstants.body,
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: '800px',
            mx: 'auto',
            mb: 10
          }}
        >
          Bite‑sized takes on technology and science with a strong focus on Flutter and Mobile Development. Occasionally I’ll dive into the craft of freelancing, the balance of work and study, and reflections on industry news. Expect a mix of opinions, recommendations, tips, and practical lessons from the field—always concise, useful, and grounded in real projects.
        </Typography>
      </Box>


      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: '400px' },
            maxWidth: '400px',
          },
        }}
      >
        <Box sx={{ mb: 3, px: 4, pt: 4 }}>
          <Typography
            variant="h3"
            sx={{
              ...TypographyConstants.h3,
              mb: 2,
            }}
          >
            Filters
          </Typography>
          <Divider />
        </Box>
        <FiltersSection />
      </Drawer>

      {/* Two Column Layout */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Left Column - Filters & Author Info (Desktop Only) */}
        {!isMobile && (
          <Grid item xs={12} md={3}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <FiltersSection />
              <AuthorSection />
            </Box>
          </Grid>
        )}

        {/* Right Column - Blog Posts */}
        <Grid item xs={12} md={isMobile ? 12 : 9}>
                {/* Post Count and Controls */}
                <Box sx={{ 
                  mb: 3, 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  <Typography
                    variant="body2"
                    sx={{
                      ...TypographyConstants.bodySmall,
                      color: 'text.secondary',
                    }}
                  >
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} 
                    {selectedCategories.length > 0 && ` in ${selectedCategories.join(', ')}`}
                    {timeFilter !== 'all' && ` from ${getTimeFilterLabel(timeFilter).toLowerCase()}`}
                    {selectedLanguage !== 'All' && ` in ${selectedLanguage}`}
                  </Typography>
                  
                  {/* Mobile Icon Controls */}
                  {isMobile ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {/* Filter Icon Button */}
                      <IconButton
                        onClick={handleMobileDrawerToggle}
                        sx={{
                          color: 'text.secondary',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'primary.50',
                          },
                        }}
                        aria-label="Open filters"
                      >
                        <FilterAltIcon />
                      </IconButton>
                      
                      {/* Sort Icon Button */}
                      <IconButton
                        onClick={handleSortToggle}
                        sx={{
                          color: 'text.secondary',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor: 'primary.50',
                          },
                        }}
                        aria-label={`Sort ${sortOrder === 'newest' ? 'oldest first' : 'newest first'}`}
                      >
                        {sortOrder === 'newest' ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowUpIcon />
                        )}
                      </IconButton>
                    </Box>
                  ) : (
                    /* Desktop Sort Toggle Button */
                    <Box
                      onClick={handleSortToggle}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                        p: 0.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          '& .sort-text': {
                            color: 'primary.main',
                          },
                          '& .sort-arrow': {
                            color: 'primary.main',
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="sort-text"
                        sx={{
                          ...TypographyConstants.bodySmall,
                          color: 'text.secondary',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
                      </Typography>
                      <Box
                        className="sort-arrow"
                        sx={{
                          transform: sortOrder === 'newest' ? 'rotate(0deg)' : 'rotate(180deg)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          ▲
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>

          {filteredPosts.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  ...TypographyConstants.h2,
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                No posts found
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  ...TypographyConstants.body,
                  color: 'text.secondary',
                }}
              >
                No posts found for selected filters.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredPosts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
                    borderRadius: 0.2,
                    mb: { xs: 2, md: 3 },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      zIndex: 2,
                    },
                  }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {/* Image Section */}
                  {post.coverImage ? (
                    <Box
                      sx={{
                        width: { xs: '100%', md: '300px' },
                        height: { xs: '200px', md: '200px' },
                        flexShrink: 0,
                        p: 0,
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="100%"
                        image={post.coverImage}
                        alt={post.title}
                        sx={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                          borderRadius: 0.15, // Added border radius for better visual
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', post.coverImage);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: { xs: '100%', md: '300px' },
                        height: { xs: '200px', md: '200px' },
                        flexShrink: 0,
                        backgroundColor: 'grey.100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: { xs: 1, md: 2 },
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          textAlign: 'center',
                        }}
                      >
                        No Image
                      </Typography>
                    </Box>
                  )}
                  
                  {/* Content Section */}
                  <CardContent sx={{ 
                    flex: 1, 
                    px: { xs: 0, md: 3 }, 
                    py: 0, 
                    display: 'flex', 
                    flexDirection: 'column' 
                  }}>
                    {/* Title */}
                    <Typography
                      variant="h4"
                      sx={{
                        ...TypographyConstants.body,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontWeight: 700,
                        color: 'text.primary',
                      }}
                    >
                      {post.title}
                    </Typography>

                    {/* Subtitle */}
                    {post.subtitle && (
                      <Typography
                        variant="body2"
                        sx={{
                          ...TypographyConstants.body,
                          color: 'text.secondary',
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.subtitle}
                      </Typography>
                    )}

                    {/* Content Preview */}
                    <Typography
                      variant="body1"
                      sx={{
                        ...TypographyConstants.bodySmall,
                        color: 'text.secondary',
                        mb: 4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1,
                      }}
                    >
                      {post.contentPreview}
                    </Typography>

                    {/* Categories - Moved to bottom */}
                    <Box sx={{ mb: { xs: 0, md: 2 } }}>
                      {(post.postCategories || []).map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: 'primary.100',
                            color: 'primary.main',
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                      {(post.tags || []).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            mr: 1,
                            mb: 1,
                            backgroundColor: 'secondary.100',
                            color: 'secondary.main',
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Box>

                    {/* Footer with Date, Read Time, and Comments */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 'auto',
                        pt: { xs: 1.5, md: 2 },
                        borderTop: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          ...TypographyConstants.bodySmall,
                          color: 'text.secondary',
                        }}
                      >
                        {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }) : 'No date'}
                      </Typography>
                      
                      {post.readTime && (
                        <Typography
                          variant="body2"
                          sx={{
                            ...TypographyConstants.bodySmall,
                            color: 'text.secondary',
                          }}
                        >
                          {post.readTime} min read
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Mobile Author Section - Show at end of posts on mobile */}
      {isMobile && (
        <Box sx={{ mt: 6 }}>
          <AuthorSection />
        </Box>
      )}
    </Container>
  );
};

export default BlogListing;
