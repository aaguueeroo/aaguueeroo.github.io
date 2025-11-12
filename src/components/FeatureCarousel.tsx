import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

interface FeatureCarouselProps {
  features: Feature[];
  onImageClick: (imageSrc: string, imageAlt: string) => void;
}

const FeatureCarousel = ({ features, onImageClick }: FeatureCarouselProps) => {
  const [visibleFeatures, setVisibleFeatures] = useState<Set<number>>(new Set());
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getObjectPosition = (featureTitle: string): string => {
    const title = featureTitle.toLowerCase();
    
    if (title.includes('shopping')) return "center 30%";
    if (title.includes('cleaning')) return "center 50%";
    if (title.includes('profile')) return "center 80%";
    if (title.includes('apartment')) return "center 30%";
    if (title.includes('feed')) return "center bottom";
    
    // Default to bottom for any other features
    return "center bottom";
  };

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => new Set([...prev, index]));
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [features]);

  return (
    <Box>
      {features.map((feature, index) => {
        const isImageLeft = index % 2 === 1; // Alternate: odd indices have image on left

        return (
          <Box 
            key={feature.id}
            ref={(el: HTMLDivElement | null) => { featureRefs.current[index] = el; }}
            sx={{ 
              mb: 8,
              opacity: { xs: 1, md: visibleFeatures.has(index) ? 1 : 0 },
              transform: { xs: "translateY(0)", md: visibleFeatures.has(index) ? "translateY(0)" : "translateY(40px)" },
              transition: { xs: "none", md: "opacity 1.2s ease-out, transform 1.2s ease-out" }
            }}
          >
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 4, md: 6 }
            }}>
              {/* Content Section */}
              <Box sx={{ 
                flex: 1,
                order: { xs: 2, md: isImageLeft ? 2 : 1 }
              }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 3, 
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    fontWeight: 600,
                    color: "text.primary"
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.7, 
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "text.secondary"
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>

              {/* Image Section */}
              <Box sx={{ 
                flex: 1,
                order: { xs: 1, md: isImageLeft ? 1 : 2 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Box sx={{ 
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: "250px", md: "320px" },
                  height: { xs: "280px", md: "350px" },
                  borderRadius: 0.2,
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)"
                  }
                }}>
                  <Box
                    component="img"
                    src={feature.image}
                    alt={feature.imageAlt ?? feature.title}
                    onClick={() =>
                      onImageClick(feature.image, feature.imageAlt ?? feature.title)
                    }
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: getObjectPosition(feature.title),
                      display: "block"
                    }}
                  />
                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: feature.title.toLowerCase().includes('feed') ? "0" : "0",
                      left: 0,
                      right: 0,
                      height: "25%",
                      background: feature.title.toLowerCase().includes('feed') 
                                 ? "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)"
                                 : "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
                      pointerEvents: "none"
                    }}
                  />
                  {/* Bottom Gradient Overlay for non-feed features */}
                  {!feature.title.toLowerCase().includes('feed') && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "25%",
                        background: "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
                        pointerEvents: "none"
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default FeatureCarousel;
