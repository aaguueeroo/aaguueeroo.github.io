import { ProjectPageContent } from "../projectContent.types";

export const urbanRunnersProjectContent: ProjectPageContent = {
  slug: "urban-runners",
  seo: {
    title: "Urban Runners - Julia's Portfolio",
    description:
      "Mobile app for running clubs that handles event discovery, race creation, and role-based moderation.",
    image: "/src/assets/images/portfolio/urban-runners-1.png",
  },
  hero: {
    coverImage: "/src/assets/images/portfolio/urban-runners-1.png",
    coverImageAlt: "Urban Runners application preview",
    title: "Urban Runners – Community Driven Racing",
    subtitle:
      "A Flutter mobile application for running clubs to discover, create, and manage community races.",
    description:
      "Urban Runners unifies runners, organisers, and administrators with role-based flows that support secure sign-in, curated race discovery, and actionable dashboards.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
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
      "Secure multi-provider authentication handled with Firebase Auth",
      "Event discovery with geolocation and calendar-friendly filtering",
      "Administrative approval flow that keeps user generated events high quality",
    ],
  },
  features: {
    title: "Key Features",
    features: [
      {
        id: "authorization",
        title: "Multi-provider Authorization",
        description:
          "Supports email/password alongside Google and social logins with secure session handling and password recovery.",
        image: "/src/assets/images/portfolio/urban-runners-1.png",
        imageAlt: "Urban Runners authorization screens",
      },
      {
        id: "race-management",
        title: "Race Management",
        description:
          "Tools for browsing nearby events, creating races with detailed logistics, and tracking participation history.",
        image: "/src/assets/images/portfolio/urban-runners-2.png",
        imageAlt: "Urban Runners race management screens",
      },
      {
        id: "admin-approval",
        title: "Admin Approval System",
        description:
          "Role-based dashboard where administrators moderate new races, handle bulk approvals, and maintain event quality.",
        image: "/src/assets/images/portfolio/urban-runners-3.png",
        imageAlt: "Urban Runners admin approval screens",
      },
      {
        id: "profiles",
        title: "User Profiles & Settings",
        description:
          "Personalized experience with running stats, notification controls, and privacy preferences per runner.",
        image: "/src/assets/images/portfolio/urban-runners-4.png",
        imageAlt: "Urban Runners profile screens",
      },
    ],
  },
  technologies: {
    title: "Technology Highlights",
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
        name: "Firebase",
        category: "Backend",
        description:
          "Authentication, Firestore database, and Cloud Functions coordinate secure data flows and validations.",
        chips: ["Firestore", "Cloud Functions"],
        color: "#FFCA28",
      },
      {
        name: "Firebase Cloud Messaging",
        category: "Messaging",
        description:
          "Push notifications keep users updated about new races, approvals, and participation reminders.",
        chips: ["Push Notifications"],
        color: "#F57C00",
      },
      {
        name: "Google Maps API",
        category: "Mapping",
        description:
          "Interactive maps power event discovery and route previews with precise geolocation data.",
        chips: ["Geocoding"],
        color: "#4285F4",
      },
      {
        name: "SQLite",
        category: "Persistence",
        description:
          "Local caching maintains a smooth experience even when runners browse races offline.",
        chips: ["Offline-first"],
        color: "#4CAF50",
      },
    ],
  },
  extra: {
    title: "Building The Experience",
    paragraphs: [
      "Authentication: implemented with Firebase Auth to cover email/password and Google Sign-In, enforcing secure password resets and session management.",
      "Race Discovery: designed a browse and filter flow that uses location, date, and difficulty to surface relevant events quickly.",
      "Moderation: administrators receive pending events in a dedicated view with the ability to approve, reject, or request changes while notifying creators.",
      "Notifications: Firebase Cloud Messaging keeps runners informed about approvals, registrations, and last-minute race updates.",
      "Offline Support: event data is cached locally to keep browsing fast and reduce friction before race day.",
    ],
  },
  cta: {
    title: "Interested in building something similar?",
    description: "",
    buttonText: "Let's talk",
    buttonHref: "/quote",
  },
};

