import { Box, Typography, Link } from "@mui/material";
import { TestimonialsSectionProps } from "../types/testimonials";

const TestimonialsSection = ({
  testimonials,
  title = "Testimonials",
}: TestimonialsSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 16 }}>
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 0.5,
              backgroundColor: "background.paper",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid",
              borderColor: "divider",
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
              "{testimonial.content}"
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
                {testimonial.author}
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
              {testimonial.company.toLowerCase() === "exxcellent solutions" ? (
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
                  {testimonial.company}
                </Link>
              ) : testimonial.company.toLowerCase() === "hymate" ? (
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
                  {testimonial.company}
                </Link>
              ) : testimonial.company.toLowerCase() === "app4it" ? (
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
                  {testimonial.company}
                </Link>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "text.secondary",
                  }}
                >
                  {testimonial.company}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;

