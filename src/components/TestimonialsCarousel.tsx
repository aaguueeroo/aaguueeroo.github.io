import { Box, Typography, Link, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useEffect, useRef } from "react";
import { Testimonial } from "../types/testimonials";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  autoRotateInterval?: number;
}

const TestimonialsCarousel = ({
  testimonials,
  title = "Testimonials",
  autoRotateInterval = 5000,
}: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef<boolean>(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (testimonials.length > 1 && !isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          goToNext();
        }
      }, autoRotateInterval);
    } else {
      stopAutoRotate();
    }
    return () => {
      stopAutoRotate();
    };
  }, [isPaused, testimonials.length, autoRotateInterval]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopAutoRotate();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleNavigationClick = (direction: "prev" | "next") => {
    if (direction === "prev") {
      goToPrevious();
    } else {
      goToNext();
    }
    setIsPaused(true);
    stopAutoRotate();
    setTimeout(() => {
      setIsPaused(false);
    }, autoRotateInterval * 2);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box
      component="section"
      sx={{ mb: 16 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 8,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            minHeight: { xs: "200px", md: "250px" },
          }}
        >
          <Box
            key={currentTestimonial.id}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 0.45,
              backgroundColor: "background.paper",
              boxShadow: "0 8px 24px rgba(15, 45, 82, 0.06)",
              animation: "fadeIn 0.5s ease-in-out",
              "@keyframes fadeIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(10px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "text.primary",
                fontStyle: "italic",
              }}
            >
              "{currentTestimonial.content}"
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "text.primary",
                }}
              >
                {currentTestimonial.author}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "text.secondary",
                }}
              >
                -
              </Typography>
              {currentTestimonial.company.toLowerCase() ===
              "exxcellent solutions" ? (
                <Link
                  href="https://www.exxcellent.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {currentTestimonial.company}
                </Link>
              ) : currentTestimonial.company.toLowerCase() === "hymate" ? (
                <Link
                  href="https://www.hymate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {currentTestimonial.company}
                </Link>
              ) : currentTestimonial.company.toLowerCase() === "app4it" ? (
                <Link
                  href="https://app4it.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {currentTestimonial.company}
                </Link>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "text.secondary",
                  }}
                >
                  {currentTestimonial.company}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {testimonials.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    goToIndex(index);
                    setIsPaused(true);
                    stopAutoRotate();
                    setTimeout(() => {
                      setIsPaused(false);
                    }, autoRotateInterval * 2);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      goToIndex(index);
                      setIsPaused(true);
                      stopAutoRotate();
                      setTimeout(() => {
                        setIsPaused(false);
                      }, autoRotateInterval * 2);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to testimonial ${index + 1}`}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentIndex
                        ? "primary.main"
                        : "action.disabled",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "primary.main",
                    },
                    "&:focus-visible": {
                      outline: "2px solid currentColor",
                      outlineOffset: "2px",
                    },
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => handleNavigationClick("prev")}
                aria-label="Previous testimonial"
                sx={{
                  backgroundColor: "background.paper",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={() => handleNavigationClick("next")}
                aria-label="Next testimonial"
                sx={{
                  backgroundColor: "background.paper",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TestimonialsCarousel;

