import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  MaxWidths,
  Typography as TypographyConstants,
} from "../../theme/constants";
import PrimaryButton from "../../components/PrimaryButton";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useTheme } from "@mui/material/styles";

const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    platforms: [] as string[],
    screenCount: "",
    features: [] as string[],
    otherFeatures: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "E-commerce Site",
    "Portfolio Website",
    "Business Website",
    "Custom Software",
    "UI/UX Design",
    "Other",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
    "Not sure yet",
  ];

  const timelineOptions = [
    "1-3 months",
    "3-6 months",
    "6-12 months",
    "12+ months",
    "Flexible",
  ];

  const platformOptions = [
    "Web",
    "iOS",
    "Android",
    "Windows",
    "macOS",
    "Linux",
  ];

  const screenCountOptions = [
    "1-5 screens",
    "6-10 screens",
    "11-20 screens",
    "21-50 screens",
    "50+ screens",
    "Not sure yet",
  ];

  const featureOptions = [
    "User Authentication",
    "Payment Integration",
    "Database Design",
    "UI Animations",
    "API Development",
    "Responsive Design",
    "Analytics Integration",
    "Real-time Features",
    "Third-party Integrations",
    "Push Notifications",
    "Location Services",
    "Sensors Integration",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.projectType ||
      !formData.screenCount ||
      formData.platforms.length === 0
    ) {
      setError("Please fill in all required fields (marked with *).");
      return;
    }

    // Formspree will handle the submission automatically
    // The form will submit to Formspree and redirect back
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          maxWidth: MaxWidths.component,
          mx: "auto",
          py: 8,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            borderRadius: "24px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          <Typography
            sx={{
              ...TypographyConstants.h2,
              color: "primary",
              marginBottom: 3,
            }}
          >
            Thank You! 🎉
          </Typography>
          <Typography
            sx={{
              ...TypographyConstants.body,
              color: "text.secondary",
              marginBottom: 2,
            }}
          >
            Your quote request has been submitted successfully.
          </Typography>
          <Typography
            sx={{
              ...TypographyConstants.bodySmall,
              color: "text.secondary",
              marginBottom: 4,
            }}
          >
            I'll review your project details and get back to you within 24 hours
            with a personalized quote and next steps.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "",
                budget: "",
                timeline: "",
                description: "",
                platforms: [],
                screenCount: "",
                features: [],
                otherFeatures: "",
              });
            }}
            sx={{ mt: 2 }}
          >
            Submit Another Request
          </Button>
        </Box>
      </Box>
    );
  }

  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ flex: 1, pt: "70px" }}>
        <Box
          sx={{
            maxWidth: MaxWidths.component,
            mx: "auto",
            py: { xs: 8, sm: 12, md: 16, lg: 20 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Header Section */}
          <Box mb={12}>
            <Typography
              sx={{
                ...TypographyConstants.h2,
                color: "primary",
                marginBottom: 6,
                textAlign: "left",
              }}
            >
              Find the best solution for free
            </Typography>
            <Typography
              sx={{
                ...TypographyConstants.body,
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              I'll provide you with an approximate estimate based on your
              project details. The more information you share, the more accurate
              my estimate will be. This is completely free and doesn't bind us
              in any way - it's just to help you find the best services for your
              needs.
            </Typography>
          </Box>

          {/* Form Container */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "32px",
              boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
              py: { xs: 6, sm: 8, md: 10, lg: 30 },
              px: { xs: 6, sm: 8, md: 10, lg: 45 },
              mb: 12,
            }}
          >
            <form action="https://formspree.io/f/mnnvgjbw" method="POST">
              {/* 
                Formspree endpoint - this is safe to be public
                Submissions will be sent to your email with spam protection
              */}

              {/* Contact Information */}
              <Box mb={6}>
                <Typography
                  sx={{
                    ...TypographyConstants.h4,
                    color: "primary",
                    marginBottom: 3,
                  }}
                >
                  Contact Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-root": {
                          ...TypographyConstants.bodySmall,
                        },
                        "& .MuiInputBase-input": {
                          ...TypographyConstants.bodySmall,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-root": {
                          ...TypographyConstants.bodySmall,
                        },
                        "& .MuiInputBase-input": {
                          ...TypographyConstants.bodySmall,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Company (Optional)"
                      name="company"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-root": {
                          ...TypographyConstants.bodySmall,
                        },
                        "& .MuiInputBase-input": {
                          ...TypographyConstants.bodySmall,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 6, opacity: 0.3 }} />

              {/* Project Details */}
              <Box mb={6}>
                <Typography
                  sx={{
                    ...TypographyConstants.h4,
                    color: "primary",
                    marginBottom: 3,
                  }}
                >
                  Project Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ ...TypographyConstants.bodySmall }}>
                        Project Type *
                      </InputLabel>
                      <Select
                        required
                        name="projectType"
                        value={formData.projectType}
                        label="Project Type *"
                        onChange={(e) =>
                          handleInputChange("projectType", e.target.value)
                        }
                        sx={{
                          "& .MuiSelect-select": {
                            ...TypographyConstants.bodySmall,
                          },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenu-paper": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenuItem-root": {
                            ...TypographyConstants.bodySmall,
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              borderRadius: "35px",
                              "& .MuiMenuItem-root": {
                                ...TypographyConstants.bodySmall,
                              },
                            },
                          },
                        }}
                      >
                        {projectTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ ...TypographyConstants.bodySmall }}>
                        Budget Range
                      </InputLabel>
                      <Select
                        name="budget"
                        value={formData.budget}
                        label="Budget Range"
                        onChange={(e) =>
                          handleInputChange("budget", e.target.value)
                        }
                        sx={{
                          "& .MuiSelect-select": {
                            ...TypographyConstants.bodySmall,
                          },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenu-paper": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenuItem-root": {
                            ...TypographyConstants.bodySmall,
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              borderRadius: "35px",
                              "& .MuiMenuItem-root": {
                                ...TypographyConstants.bodySmall,
                              },
                            },
                          },
                        }}
                      >
                        {budgetRanges.map((range) => (
                          <MenuItem key={range} value={range}>
                            {range}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ ...TypographyConstants.bodySmall }}>
                        Timeline
                      </InputLabel>
                      <Select
                        name="timeline"
                        value={formData.timeline}
                        label="Timeline"
                        onChange={(e) =>
                          handleInputChange("timeline", e.target.value)
                        }
                        sx={{
                          "& .MuiSelect-select": {
                            ...TypographyConstants.bodySmall,
                          },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenu-paper": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenuItem-root": {
                            ...TypographyConstants.bodySmall,
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              borderRadius: "35px",
                              "& .MuiMenuItem-root": {
                                ...TypographyConstants.bodySmall,
                              },
                            },
                          },
                        }}
                      >
                        {timelineOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 6, opacity: 0.3 }} />

              {/* Platforms & Screens */}
              <Box mb={6}>
                <Typography
                  sx={{
                    ...TypographyConstants.h4,
                    color: "primary",
                    marginBottom: 3,
                  }}
                >
                  Platforms & Screens
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography
                      sx={{
                        ...TypographyConstants.bodySmall,
                        color: "text.secondary",
                        marginBottom: 2,
                      }}
                    >
                      Select the platforms your app will run on: *
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {platformOptions.map((platform) => (
                        <Chip
                          key={platform}
                          label={platform}
                          onClick={() => handlePlatformToggle(platform)}
                          color={
                            formData.platforms.includes(platform)
                              ? "primary"
                              : "default"
                          }
                          variant={
                            formData.platforms.includes(platform)
                              ? "filled"
                              : "outlined"
                          }
                          sx={{
                            cursor: "pointer",
                            "& .MuiChip-label": {
                              ...TypographyConstants.bodySmall,
                            },
                          }}
                        />
                      ))}
                    </Box>
                    <input
                      type="hidden"
                      name="platforms"
                      value={formData.platforms.join(", ")}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ ...TypographyConstants.bodySmall }}>
                        Number of Screens *
                      </InputLabel>
                      <Select
                        required
                        name="screenCount"
                        value={formData.screenCount}
                        label="Number of Screens *"
                        onChange={(e) =>
                          handleInputChange("screenCount", e.target.value)
                        }
                        sx={{
                          "& .MuiSelect-select": {
                            ...TypographyConstants.bodySmall,
                          },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenu-paper": {
                            borderRadius: "35px",
                          },
                          "& .MuiMenuItem-root": {
                            ...TypographyConstants.bodySmall,
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              borderRadius: "35px",
                              "& .MuiMenuItem-root": {
                                ...TypographyConstants.bodySmall,
                              },
                            },
                          },
                        }}
                      >
                        {screenCountOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 6, opacity: 0.3 }} />

              {/* Features */}
              <Box mb={6}>
                <Typography
                  sx={{
                    ...TypographyConstants.h4,
                    color: "primary",
                    marginBottom: 3,
                  }}
                >
                  Key Features Needed
                </Typography>
                <Typography
                  sx={{
                    ...TypographyConstants.bodySmall,
                    color: "text.secondary",
                    marginBottom: 3,
                  }}
                >
                  Select the features your project will need (optional):
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                  {featureOptions.map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      color={
                        formData.features.includes(feature)
                          ? "primary"
                          : "default"
                      }
                      variant={
                        formData.features.includes(feature)
                          ? "filled"
                          : "outlined"
                      }
                      sx={{
                        cursor: "pointer",
                        "& .MuiChip-label": {
                          ...TypographyConstants.bodySmall,
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Other Features Text Field */}
                <TextField
                  label="Other features (optional)"
                  name="otherFeatures"
                  value={formData.otherFeatures}
                  onChange={(e) =>
                    handleInputChange("otherFeatures", e.target.value)
                  }
                  fullWidth
                  placeholder="Add any other features not listed above..."
                  sx={{
                    "& .MuiInputLabel-root": {
                      ...TypographyConstants.bodySmall,
                    },
                    "& .MuiInputBase-input": {
                      ...TypographyConstants.bodySmall,
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "35px",
                    },
                  }}
                />

                <input
                  type="hidden"
                  name="features"
                  value={formData.features.join(", ")}
                />
                <input
                  type="hidden"
                  name="otherFeatures"
                  value={formData.otherFeatures}
                />
              </Box>

              <Divider sx={{ my: 6, opacity: 0.3 }} />

              {/* Project Description */}
              <Box mb={6}>
                <Typography
                  sx={{
                    ...TypographyConstants.h4,
                    color: "primary",
                    marginBottom: 3,
                  }}
                >
                  Project Description
                </Typography>
                <TextField
                  label="Tell me about your project (optional)"
                  name="description"
                  multiline
                  rows={6}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  fullWidth
                  placeholder="Describe your project goals, target audience, key features, and any specific requirements or preferences you have..."
                  sx={{
                    "& .MuiInputLabel-root": {
                      ...TypographyConstants.bodySmall,
                    },
                    "& .MuiInputBase-input": {
                      ...TypographyConstants.bodySmall,
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "35px",
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Box
                textAlign="center"
                sx={{ display: "flex", justifyContent: "center", mt: 12 }}
              >
                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 3, maxWidth: "600px", mx: "auto" }}
                  >
                    {error}
                  </Alert>
                )}
                <PrimaryButton
                  type="submit"
                  showArrow={false}
                  endIcon={<SendIcon />}
                  sx={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: theme.spacing(2, 12),
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(1),
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                    "&:hover": {
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.05)",
                      bgcolor: theme.palette.primary.main,
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#CF8B7F",
                      transition: "color 0.3s ease",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      color: "#212529",
                    },
                  }}
                >
                  Get my quote
                </PrimaryButton>
              </Box>
            </form>
          </Box>

          {/* Budget Note */}
          <Box mt={6} mb={8}>
            <Typography
              sx={{
                ...TypographyConstants.bodySmall,
                color: "text.secondary",
                fontStyle: "italic",
                textAlign: "left",
              }}
            >
              *The quote is approximate and not a binding contract. The more
              details that you input -a detailed description, the number of
              screens, platforms and features, etc.- the more accurate that the
              quote will be.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default QuotePage;
