import { Box, Typography } from "@mui/material";
import ProjectFeaturesSection from "../../components/ProjectFeaturesSection";
import {
  ProjectFeaturesSectionContent,
  ProjectPageContent,
} from "../projectContentTypes";
import urbanRunnersImage1 from "../../../../assets/images/portfolio/urban-runners-1.png";
import urbanRunnersImage2 from "../../../../assets/images/portfolio/urban-runners-2.png";
import urbanRunnersImage3 from "../../../../assets/images/portfolio/urban-runners-3.png";
import urbanRunnersImage4 from "../../../../assets/images/portfolio/urban-runners-4.png";

export const urbanRunnersProjectContent: ProjectPageContent = {
  slug: "urban-runners",
  seo: {
    title: "Urban Runners - Julia's Portfolio",
    description:
      "Mobile app for running clubs that handles event discovery, race creation, and role-based moderation.",
    image: urbanRunnersImage1,
  },
  hero: {
    coverImage: urbanRunnersImage1,
    coverImageAlt: "Urban Runners application preview",
    title: "Urban Runners – Community Driven Racing",
    subtitle:
      "A Flutter mobile application for running clubs to discover, create, and manage community races.",
    description:
      "Urban Runners unifies runners, organisers, and administrators with role-based flows that support secure sign-in, curated race discovery, and actionable dashboards.",
    technologies: [
      "Flutter",
      "Dart",
      "Supabase",
      "Google Maps API",
      "Provider",
      "Push Notifications",
    ],
    primaryAction: {
      label: "View Repository",
      url: "https://github.com/aaguueeroo/urban-runners",
    },
  },
  description: {
    title: "Project Overview",
    paragraphs: [
      "Urban Runners is a Flutter-based mobile experience that turns ad-hoc running clubs into structured communities. The application helps members discover nearby races, register instantly, and track their participation history while organisers design events with rich detail.",
      "The product integrates authentication, data management, and moderation so that user-generated events remain trustworthy and relevant for the community.",
    ],
    bulletPoints: [
      "Secure multi-provider authentication handled with Supabase Auth",
      "Event discovery with geolocation and calendar-friendly filtering",
      "Administrative approval flow that keeps user generated events high quality",
    ],
  },
  renderFeaturesSection: ({ onOpenImageModal }) => (
    <ProjectFeaturesSection
      features={urbanRunnersFeaturesSection}
      onFeatureImageClick={onOpenImageModal}
    />
  ),
  technologies: {
    technologies: [
      {
        name: "Flutter",
        category: "Frontend",
        description:
          "Material Design UI with custom animations, supporting both runners and administrators in a single codebase.",
        chips: ["auto_route", "Provider"],
        color: "#1976D2",
      },
      {
        name: "Supabase",
        category: "Backend",
        description:
          "Authentication, Postgres database, and edge functions coordinate secure data flows and validations.",
        chips: ["Postgres", "Edge Functions"],
        color: "#FFCA28",
      },
    ],
  },
  renderExtraSection: ({ onOpenImageModal }) => (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
        }}
      >
        Building The Experience
      </Typography>
      <Box
        component="ul"
        sx={{ pl: 3, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {urbanRunnersExperienceSteps.map((step) => (
          <Typography
            key={step.label}
            component="li"
            variant="body1"
            sx={{ lineHeight: 1.7, fontSize: "1rem" }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {step.label}
            </Box>
            {`: ${step.description}`}
          </Typography>
        ))}
      </Box>
    </Box>
  ),
  cta: {
    title: "Interested in building something similar?",
    description: "",
    buttonText: "Let's talk",
    buttonHref: "/quote",
  },
};

const urbanRunnersFeaturesSection: ProjectFeaturesSectionContent = {
  title: "Key Features",
  features: [
    {
      id: "authorization",
      title: "Multi-provider Authorization",
      description:
        "Supports email/password alongside Google and social logins with secure session handling and password recovery.",
      image: urbanRunnersImage1,
      imageAlt: "Urban Runners authorization screens",
    },
    {
      id: "race-management",
      title: "Race Management",
      description:
        "Tools for browsing nearby events, creating races with detailed logistics, and tracking participation history.",
      image: urbanRunnersImage2,
      imageAlt: "Urban Runners race management screens",
    },
    {
      id: "admin-approval",
      title: "Admin Approval System",
      description:
        "Role-based dashboard where administrators moderate new races, handle bulk approvals, and maintain event quality.",
      image: urbanRunnersImage3,
      imageAlt: "Urban Runners admin approval screens",
    },
    {
      id: "profiles",
      title: "User Profiles & Settings",
      description:
        "Personalized experience with running stats, notification controls, and privacy preferences per runner.",
      image: urbanRunnersImage4,
      imageAlt: "Urban Runners profile screens",
    },
  ],
};

const urbanRunnersExperienceSteps = [
  {
    label: "Authentication",
    description:
      "implemented with Supabase Auth to cover email/password and social sign-in, enforcing secure password resets and session management.",
  },
  {
    label: "Race Discovery",
    description:
      "designed a browse and filter flow that uses location, date, and difficulty to surface relevant events quickly.",
  },
  {
    label: "Moderation",
    description:
      "administrators receive pending events in a dedicated view with the ability to approve, reject, or request changes while notifying creators.",
  },
  {
    label: "Notifications",
    description:
      "Supabase Edge Functions trigger push notifications that keep runners informed about approvals, registrations, and last-minute race updates.",
  },
  {
    label: "Offline Support",
    description:
      "event data is cached locally to keep browsing fast and reduce friction before race day.",
  },
];
