import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Chip,
  Container,
  Divider,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import postsIndex from '../content/index.json';
import { BlogPost } from '../types';
import { Typography as TypographyConstants } from '../../theme/constants';
import authorImage from '../../assets/images/about-the-author.jpg';

interface BlogPostProps {
  post: BlogPost | null;
  loading?: boolean;
  error?: string;
}

// Twitter Embed Component
const TwitterEmbed: React.FC<{ tweetId: string }> = ({ tweetId }) => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.twttr && tweetRef.current) {
          window.twttr.widgets.load(tweetRef.current);
        }
      };
    } else {
      // Script already loaded, just render the widget
      if (tweetRef.current) {
        window.twttr.widgets.load(tweetRef.current);
      }
    }
  }, [tweetId]);

  return (
    <div ref={tweetRef}>
      <blockquote className="twitter-tweet" data-theme="light" data-align="center">
        <a href={`https://twitter.com/x/status/${tweetId}`}>Loading tweet...</a>
      </blockquote>
    </div>
  );
};

// Extend window type for Twitter widgets
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

const BlogPostComponent: React.FC<BlogPostProps> = ({ post, loading, error }) => {
  const navigate = useNavigate();
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

  if (!post) {
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
            Post not found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              ...TypographyConstants.body,
              color: 'text.secondary',
            }}
          >
            The blog post you're looking for doesn't exist.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 6, md: 8 },
        overflow: 'visible', // Allow shadows to extend beyond container
      }}
    >
      {/* Back to blog - Sticky */}
      <Box 
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'background.paper',
          py: 2,
          mb: 4,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          onClick={() => navigate('/blog')}
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: 'none', color: 'text.secondary', '&:hover': { color: 'primary.main', backgroundColor: 'transparent' }, px: 0 }}
        >
          Back to Blog
        </Button>
      </Box>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ mb: 3 }}>
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

        <Typography
          variant="h2"
          sx={{
            ...TypographyConstants.h2,
            mb: 2,
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </Typography>

        {post.subtitle && (
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              mb: 2,
              fontWeight: 500,
            }}
          >
            {post.subtitle}
          </Typography>
        )}


        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            mb: 4,
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
            <>
              <Typography
                variant="body2"
                sx={{
                  ...TypographyConstants.bodySmall,
                  color: 'text.secondary',
                }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...TypographyConstants.bodySmall,
                  color: 'text.secondary',
                }}
              >
                {post.readTime} min read
              </Typography>
            </>
          )}

          {post.author && (
            <>
              <Typography
                variant="body2"
                sx={{
                  ...TypographyConstants.bodySmall,
                  color: 'text.secondary',
                }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...TypographyConstants.bodySmall,
                  color: 'text.secondary',
                }}
              >
                By{' '}
                <Button
                  variant="text"
                  onClick={() => navigate('/about')}
                  sx={{
                    ...TypographyConstants.bodySmall,
                    color: 'text.secondary',
                    px: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {post.author}
                </Button>
              </Typography>
            </>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />
      </Box>

      {/* Cover Image */}
      {post.coverImage && (
        <Box
          sx={{
            mb: 6,
            borderRadius: 0.2,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          '& .notion-page': {
            padding: 0,
          },
          '& .notion-h1, & .notion-h2, & .notion-h3': {
            fontFamily: 'Golos Text, sans-serif',
            fontWeight: 700,
            color: 'text.primary',
          },
          '& .notion-h1': {
            fontSize: '2.5rem',
            lineHeight: 1.2,
            mb: 3,
          },
          '& .notion-h2': {
            fontSize: '2rem',
            lineHeight: 1.3,
            mb: 2,
            mt: 4,
          },
          '& .notion-h3': {
            fontSize: '1.5rem',
            lineHeight: 1.4,
            mb: 2,
            mt: 3,
          },
          '& .notion-text': {
            fontFamily: 'Golos Text, sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'text.primary',
            mb: 2,
          },
          '& .notion-list': {
            fontFamily: 'Golos Text, sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: 'text.primary',
          },
          '& .notion-code': {
            backgroundColor: '#f5f5f5',
            padding: '0.5rem',
            borderRadius: '4px',
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: '0.875rem',
          },
          '& .notion-quote': {
            borderLeft: '4px solid',
            borderLeftColor: 'primary.main',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            color: 'text.secondary',
          },
        }}
      >
        {post.content && post.content.length > 0 ? (
          <Box>
            {(() => {
              const renderRT = (rt: any[]) =>
                rt?.map((t: any, i: number) => {
                  const a = t.annotations || {};
                  const style: React.CSSProperties = {
                    fontWeight: a.bold ? 700 as any : undefined,
                    fontStyle: a.italic ? 'italic' : undefined,
                    textDecoration: [a.underline ? 'underline' : '', a.strikethrough ? 'line-through' : '']
                      .filter(Boolean)
                      .join(' '),
                  };
                  const href = t.href || t.text?.link?.url;
                  const content = a.code ? (
                    <code
                      style={{
                        fontFamily: 'Monaco, Consolas, monospace',
                        backgroundColor: '#f5f5f5',
                        padding: '0 3px',
                        borderRadius: 3,
                        fontSize: '0.9em',
                      }}
                    >
                      {t.plain_text}
                    </code>
                  ) : (
                    <span style={style}>{t.plain_text}</span>
                  );
                  return href ? (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      {content}
                    </a>
                  ) : (
                    <React.Fragment key={i}>{content}</React.Fragment>
                  );
                });
              const getPlainText = (rt: any[]) => (rt || []).map((t: any) => t.plain_text).join(' ');
              const slugify = (text: string) =>
                text
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();

              const collectHeadings = (blocks: any[], acc: { level: number; text: string; id: string }[] = []) => {
                blocks.forEach((b) => {
                  if (b.type === 'heading_1' || b.type === 'heading_2' || b.type === 'heading_3') {
                    const rt = b[b.type]?.rich_text || [];
                    const text = getPlainText(rt);
                    const id = slugify(text);
                    const level = b.type === 'heading_1' ? 1 : b.type === 'heading_2' ? 2 : 3;
                    if (text) acc.push({ level, text, id });
                  }
                  if (b.children && Array.isArray(b.children)) collectHeadings(b.children, acc);
                });
                return acc;
              };

              const renderBlock = (block: any, key: React.Key): React.ReactNode => {
                switch (block.type) {
                case 'paragraph':
                  if (block.paragraph?.rich_text?.length) {
                    return (
                      <Typography
                        key={key}
                        variant="body1"
                        sx={{
                          ...TypographyConstants.body,
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {renderRT(block.paragraph.rich_text)}
                      </Typography>
                    );
                  }
                  return null;
                case 'heading_1':
                    {
                      const text = getPlainText(block.heading_1?.rich_text || []);
                      const id = slugify(text);
                  return (
                    <Typography
                      key={key}
                      variant="h1"
                      id={id}
                      sx={{
                        ...TypographyConstants.h1,
                        mt: 6,
                        mb: 2,
                      }}
                    >
                      {text}
                    </Typography>
                  );
                    }
                case 'heading_2':
                    {
                      const text = getPlainText(block.heading_2?.rich_text || []);
                      const id = slugify(text);
                  return (
                    <Typography
                      key={key}
                      variant="h2"
                      id={id}
                      sx={{
                        ...TypographyConstants.h2,
                        mt: 4,
                        mb: 2,
                      }}
                    >
                      {text}
                    </Typography>
                  );
                    }
                case 'heading_3':
                    {
                      const text = getPlainText(block.heading_3?.rich_text || []);
                      const id = slugify(text);
                  return (
                    <Typography
                      key={key}
                      variant="h3"
                      id={id}
                      sx={{
                        ...TypographyConstants.h3,
                        mt: 3,
                        mb: 1.5,
                      }}
                    >
                      {text}
                    </Typography>
                  );
                    }
                case 'bulleted_list_item':
                  return (
                    <Box key={key} sx={{ ml: 2, mb: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          ...TypographyConstants.body,
                          lineHeight: 1.6,
                        }}
                      >
                        • {renderRT(block.bulleted_list_item?.rich_text || [])}
                      </Typography>
                    </Box>
                  );
                case 'numbered_list_item':
                  return (
                    <Box 
                      key={key} 
                      component="li"
                      sx={{ 
                        ml: 4, 
                        mb: 1,
                        display: 'list-item',
                        listStyleType: 'decimal',
                        listStylePosition: 'outside',
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          ...TypographyConstants.body,
                          lineHeight: 1.6,
                        }}
                      >
                        {renderRT(block.numbered_list_item?.rich_text || [])}
                      </Typography>
                    </Box>
                  );
                  case 'quote': {
                    return (
                      <Box key={key} sx={{ borderLeft: '4px solid', borderLeftColor: 'primary.main', pl: 2, my: 2 }}>
                        <Typography variant="body1" sx={{ ...TypographyConstants.body, fontStyle: 'italic', color: 'text.secondary' }}>
                          {renderRT(block.quote?.rich_text || [])}
                        </Typography>
                      </Box>
                    );
                  }
                  case 'image': {
                    const src = block.image?.type === 'external' ? block.image.external?.url : block.image?.file?.url;
                    const caption = getPlainText(block.image?.caption || []);
                    if (!src) return null;
                    return (
                      <Box key={key} sx={{ my: 3 }}>
                        <img src={src} alt={caption || 'Image'} style={{ width: '100%', height: 'auto', borderRadius: 4 }} />
                        {caption && (
                          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'text.secondary', mt: 1 }}>
                            {caption}
                          </Typography>
                        )}
                      </Box>
                    );
                  }
                  case 'code': {
                    const codeText = (block.code?.rich_text || []).map((t: any) => t.plain_text).join('');
                    const language = block.code?.language || '';
                    return (
                      <Box key={key} sx={{ my: 2 }}>
                        {language && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {language}
                          </Typography>
                        )}
                        <Box
                          component="pre"
                          sx={{
                            backgroundColor: '#f5f5f5',
                            p: 2,
                            borderRadius: 1,
                            overflowX: 'auto',
                            fontFamily: 'Monaco, Consolas, monospace',
                            fontSize: '0.875rem',
                          }}
                        >
                          <code>{codeText}</code>
                        </Box>
                      </Box>
                    );
                  }
                  case 'toggle': {
                    const title = renderRT(block.toggle?.rich_text || []);
                    const children = block.children || [];
                    return (
                      <Box key={key} sx={{ my: 2 }}>
                        <Box
                          component="details"
                          sx={{
                            '&[open] summary .toggleIcon': { transform: 'rotate(180deg)' },
                          }}
                        >
                          <Box
                            component="summary"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              cursor: 'pointer',
                              listStyle: 'none',
                              '&::-webkit-details-marker': { display: 'none' },
                            }}
                          >
                            <ExpandMoreIcon className="toggleIcon" sx={{ transition: 'transform 0.2s ease' }} />
                            <Typography component="span" variant="body1" sx={{ ...TypographyConstants.body }}>
                              {title}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1, ml: 4 }}>
                            {children.map((child: any, idx: number) => renderBlock(child, `${key}-${idx}`))}
                          </Box>
                        </Box>
                      </Box>
                    );
                  }
                case 'table': {
                  const rows = block.children || [];
                  const hasHeader = !!block.table?.has_row_header;
                  const headerRow = hasHeader ? rows[0] : null;
                  const dataRows = hasHeader ? rows.slice(1) : rows;
                  return (
                    <Box key={key} sx={{ my: 3 }}>
                      <Table size="small">
                        {headerRow && (
                          <TableHead>
                            <TableRow>
                              {(headerRow.table_row?.cells || []).map((cell: any[], ci: number) => (
                                <TableCell key={ci} sx={{ fontWeight: 600 }}>
                                  {renderRT(cell)}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                        )}
                        <TableBody>
                          {dataRows.map((row: any, ri: number) => (
                            <TableRow key={ri}>
                              {(row.table_row?.cells || []).map((cell: any[], ci: number) => (
                                <TableCell key={ci}>{renderRT(cell)}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  );
                }
                  case 'table_of_contents': {
                    const headings = collectHeadings(post.content);
                    if (!headings.length) return null;
                    return (
                      <Box key={key} sx={{ my: 3, p: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>On this page</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {headings.map((h, i) => (
                            <a key={i} href={`#${h.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  ...TypographyConstants.bodySmall,
                                  pl: (h.level - 1) * 2,
                                  color: 'text.secondary',
                                  '&:hover': { color: 'primary.main' },
                                }}
                              >
                                {h.text}
                              </Typography>
                            </a>
                          ))}
                        </Box>
                      </Box>
                    );
                  }
                  case 'embed': {
                    const url = block.embed?.url;
                    if (!url) return null;
                    
                    // Check if it's a Twitter/X embed
                    const isTwitter = url.includes('twitter.com') || url.includes('x.com');
                    
                    if (isTwitter) {
                      // Extract tweet ID from URL
                      const tweetIdMatch = url.match(/status\/(\d+)/);
                      const tweetId = tweetIdMatch ? tweetIdMatch[1] : null;
                      
                      if (tweetId) {
                        return (
                          <Box key={key} sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ width: '100%', maxWidth: '650px' }}>
                              <TwitterEmbed tweetId={tweetId} />
                            </Box>
                          </Box>
                        );
                      }
                    }
                    
                    // Generic embed fallback
                    return (
                      <Box key={key} sx={{ my: 3 }}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '400px',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <iframe
                            src={url}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title="Embedded content"
                          />
                        </Box>
                      </Box>
                    );
                  }
                  case 'bookmark': {
                    const bookmarkUrl = block.bookmark?.url;
                    const caption = getPlainText(block.bookmark?.caption || []);
                    if (!bookmarkUrl) return null;
                    
                    return (
                      <Box key={key} sx={{ my: 3 }}>
                        <Card
                          component="a"
                          href={bookmarkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 500,
                                mb: caption ? 1 : 0,
                              }}
                            >
                              🔗 {bookmarkUrl}
                            </Typography>
                            {caption && (
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {caption}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Box>
                    );
                  }
                default:
                  return null;
                }
              };

              return post.content.map((block: any, index: number) => renderBlock(block, index));
            })()}
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{
              ...TypographyConstants.body,
              lineHeight: 1.6,
            }}
          >
            Content is being loaded...
          </Typography>
        )}
      </Box>

      {/* Author Info */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h2" sx={{ mb: 3, ...TypographyConstants.h2 }}>About the author</Typography>
        <Card sx={{ borderRadius: 0.2 }}>
          <CardContent sx={{ p: 2 }}>
            {/* Top Row: Image (left) and Name/Position (right) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              {/* Left Column: Author Image */}
              <Box sx={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={authorImage}
                  alt="Julia Agüero"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              
              {/* Right Column: Name and Position */}
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  component="a"
                  href="/about"
                  sx={{ 
                    fontWeight: 700, 
                    mb: 0.5,
                    color: 'text.primary',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main',
                    },
                  }}
                >
                  Julia Agüero
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600}}  >
                  Freelance Developer
                </Typography>
              </Box>
            </Box>

            {/* Bottom Row: Description */}
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Passionate about creating beautiful, functional mobile applications. I share insights about Tech, Flutter, design, and more.
            </Typography>
            
            {/* Social Media Links */}
            <Box sx={{ display: 'flex' }}>
              <IconButton href="https://github.com/aaguueeroo" target="_blank" sx={{ color: 'secondary.main', '&:hover': { color: 'primary.main' } }}>
                <GitHubIcon />
              </IconButton>
              <IconButton href="https://x.com/aaguueeroo" target="_blank" sx={{ color: 'secondary.main', '&:hover': { color: 'primary.main' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com/in/julia-aguero-fraguas/" target="_blank" sx={{ color: 'secondary.main', '&:hover': { color: 'primary.main' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Related Posts Carousel */}
      {(() => {
        const summaries = (postsIndex as any[]);
        const currentId = post.id;
        const currentCats = new Set(post.postCategories || []);
        const currentTags = new Set(post.tags || []);
        const related = summaries
          .filter((p) => p.id !== currentId)
          .map((p) => {
            const score = ((p.postCategories || []).some((c: string) => currentCats.has(c)) ? 2 : 0) + ((p.tags || []).some((t: string) => currentTags.has(t)) ? 1 : 0);
            return { p, score };
          })
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5) // Show more posts in carousel
          .map(({ p }) => p);

        if (!related.length) return null;

        return (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h2" sx={{ mb: 3, ...TypographyConstants.h2 }}>Related posts</Typography>
            
            {/* Carousel Container */}
            <Box sx={{ position: 'relative', overflow: 'visible' }}>
              {/* Navigation Buttons */}
              <IconButton
                onClick={() => {
                  const container = document.getElementById('related-posts-carousel');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                sx={{
                  position: 'absolute',
                  left: { xs: 2, md: -20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              
              <IconButton
                onClick={() => {
                  const container = document.getElementById('related-posts-carousel');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                sx={{
                  position: 'absolute',
                  right: { xs: 2, md: -20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  backgroundColor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>

              {/* Scrollable Container */}
              <Box
                id="related-posts-carousel"
                sx={{
                  display: 'flex',
                  gap: 3,
                  overflowX: 'auto',
                  overflowY: 'visible', // Allow shadows to extend vertically
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
                  pb: 1,
                  py: 15, // Add vertical padding for shadows
                  px: 10, // Add horizontal padding for shadows
                  mx: -2, // Negative margin to maintain full width
                  my: -2, // Negative margin to maintain full height
                }}
              >
                {related.map((rp: any) => (
                  <Card
                    key={rp.id}
                    sx={{
                      mx: 4,
                      minWidth: 300,
                      maxWidth: 400,
                      flex: '0 0 auto',
                      cursor: 'pointer',
                      borderRadius: 0.2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                    onClick={() => navigate(`/blog/${rp.slug}`)}
                  >
                    {rp.coverImage && (
                      <CardMedia
                        component="img"
                        image={rp.coverImage}
                        alt={rp.title}
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ p: 2 }}>
                      {/* Categories / Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                        {(rp.postCategories || []).slice(0, 2).map((c: string) => (
                          <Chip key={c} label={c} size="small" sx={{ fontSize: '0.7rem' }} />
                        ))}
                        {(rp.tags || []).slice(0, 2).map((t: string) => (
                          <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        ))}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {rp.title}
                      </Typography>

                      {/* Subtitle / Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {rp.subtitle || rp.metaDescription}
                      </Typography>

                      {/* Footer */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {rp.publishedDate ? new Date(rp.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                        </Typography>
                        {rp.readTime && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{rp.readTime} min</Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        );
      })()}
    </Container>
  );
};

export default BlogPostComponent;
