import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InfoIcon from "@mui/icons-material/Info";
import {
  MaxWidths,
  Typography as TypographyConstants,
} from "../../theme/constants";
import PrimaryButton from "../../components/PrimaryButton";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useTheme } from "@mui/material/styles";
import { SEO } from "../../components/SEO";

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

  const textFieldStyles = {
    "& .MuiInputLabel-root": {
      ...TypographyConstants.bodySmall,
    },
    "& .MuiInputBase-input": {
      ...TypographyConstants.bodySmall,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      transform: "translate(40px, -9px) scale(0.75)",
    },
  };

  const selectStyles = {
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
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    <>
      <SEO
        title="Get a Free Quote - Julia Agüero Mobile App Development"
        description="Get a personalized quote for your mobile app project. Share your requirements and I'll provide you with a detailed estimate and project plan. Free consultation, no obligations."
        url="/quote"
      />
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
            <Box mb={24} mt={12}>
              <Typography
                sx={{
                  ...TypographyConstants.h2,
                  color: "primary",
                  marginBottom: 6,
                  textAlign: "left",
                }}
              >
                Explore your best option, commitment-free.
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
                the quote will be. This is completely free and doesn't bind us
                in any way - it's just to help you find the best services for your
                needs.
              </Typography>
            </Box>

            {/* Form Container */}
            <Box
              sx={{
                backgroundColor: { xs: "transparent", sm: "#fff" },
                borderRadius: { xs: 0, sm: "32px" },
                boxShadow: { xs: "none", sm: "18px 23px 71.5px rgba(0, 0, 0, 0.1)" },
                py: { xs: 0, sm: 8, md: 10, lg: 15 },
                px: { xs: 0, sm: 8, md: 10, lg: 20 },
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
                        onChange={handleInputChange}
                        fullWidth
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        sx={textFieldStyles}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Company (Optional)"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        fullWidth
                        sx={textFieldStyles}
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
                        <InputLabel sx={{ 
                          ...TypographyConstants.bodySmall,
                          "&.Mui-focused": {
                            transform: "translate(40px, -9px) scale(0.75)",
                          },
                        }}>
                          Project Type *
                        </InputLabel>
                        <Select
                          required
                          name="projectType"
                          value={formData.projectType}
                          label="Project Type *"
                          onChange={handleSelectChange}
                          sx={selectStyles}
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
                        <InputLabel sx={{ 
                          ...TypographyConstants.bodySmall,
                          "&.Mui-focused": {
                            transform: "translate(40px, -9px) scale(0.75)",
                          },
                        }}>
                          Budget Range
                        </InputLabel>
                        <Select
                          name="budget"
                          value={formData.budget}
                          label="Budget Range"
                          onChange={handleSelectChange}
                          sx={selectStyles}
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
                        <InputLabel sx={{ 
                          ...TypographyConstants.bodySmall,
                          "&.Mui-focused": {
                            transform: "translate(40px, -9px) scale(0.75)",
                          },
                        }}>
                          Timeline
                        </InputLabel>
                        <Select
                          name="timeline"
                          value={formData.timeline}
                          label="Timeline"
                          onChange={handleSelectChange}
                          sx={selectStyles}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography
                      sx={{
                        ...TypographyConstants.h4,
                        color: "primary",
                      }}
                    >
                      Platforms & Screens
                    </Typography>
                    <Tooltip 
                      title="Number of Screens refers to the number of different screens or activities in your app (e.g., login screen, home screen, profile screen, etc.)"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            borderRadius: '8px',
                            fontSize: '14px',
                            maxWidth: '300px',
                          }
                        }
                      }}
                    >
                      <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
                        <InfoIcon sx={{ fontSize: '18px', color: 'text.secondary' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
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
                              "&:hover": {
                                backgroundColor: formData.platforms.includes(platform) 
                                  ? "primary.main" 
                                  : "transparent",
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
                        <InputLabel sx={{ 
                          ...TypographyConstants.bodySmall,
                          "&.Mui-focused": {
                            transform: "translate(40px, -9px) scale(0.75)",
                          },
                        }}>
                          Number of Screens *
                        </InputLabel>
                        <Select
                          required
                          name="screenCount"
                          value={formData.screenCount}
                          label="Number of Screens *"
                          onChange={handleSelectChange}
                          sx={selectStyles}
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
                          "&:hover": {
                            backgroundColor: formData.features.includes(feature) 
                              ? "primary.main" 
                              : "transparent",
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
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Add any other features not listed above..."
                    sx={{
                      ...textFieldStyles,
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
                    onChange={handleInputChange}
                    fullWidth
                    placeholder="Describe your project goals, target audience, key features, and any specific requirements or preferences you have..."
                    sx={{
                      ...textFieldStyles,
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
    </>
  );
};

export default QuotePage;
