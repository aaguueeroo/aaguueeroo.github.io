export interface ProjectFeature {
  title: string;
  description: string;
  image: string;
  details: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  slug: string;
  features: ProjectFeature[];
  longDescription: string;
  challenges: string[];
  solutions: string[];
}

export const urbanRunnersProject: ProjectDetail = {
  id: "urban-runners",
  title: "Urban Runners",
  description: "A comprehensive mobile application for running clubs that enables users to discover, join, and create running events. The app features user authorization, race management, admin approval workflows, and personalized user profiles with customizable settings.",
  shortDescription: "Mobile app for running clubs with event management and user profiles",
  image: "/src/assets/images/portfolio/urban-runners-1.png",
  technologies: ["Flutter", "Dart", "Firebase", "Provider", "Google Maps API", "Push Notifications"],
  category: "Mobile Development",
  featured: true,
  githubUrl: "https://github.com/aaguueeroo/urban-runners",
  slug: "urban-runners",
  longDescription: "Urban Runners is a Flutter-based mobile application designed to connect running enthusiasts and facilitate community-driven running events. The app serves as a comprehensive platform where users can discover upcoming races, create their own running events, and manage their running journey through personalized profiles and settings.",
  challenges: [
    "Implementing secure user authentication with multiple login methods",
    "Creating an intuitive race discovery and creation interface",
    "Building an admin approval system for user-generated content",
    "Managing real-time notifications and event updates",
    "Ensuring smooth offline functionality for race data"
  ],
  solutions: [
    "Integrated Firebase Authentication with support for email, Google, and social logins",
    "Designed a clean, Material Design-based UI with intuitive navigation patterns",
    "Implemented role-based access control with admin approval workflows",
    "Utilized Firebase Cloud Messaging for push notifications and real-time updates",
    "Implemented local data caching with SQLite for offline race browsing"
  ],
  features: [
    {
      title: "User Authorization",
      description: "Multiple authentication methods for secure user access",
      image: "/src/assets/images/portfolio/urban-runners-1.png",
      details: [
        "Email and password authentication",
        "Google Sign-In integration",
        "Social media login options",
        "Secure session management",
        "Password reset functionality"
      ]
    },
    {
      title: "Race Management",
      description: "Discover and create running events with comprehensive details",
      image: "/src/assets/images/portfolio/urban-runners-2.png",
      details: [
        "Browse upcoming running events",
        "Create custom running events",
        "Event details with location and timing",
        "Join events with one-tap registration",
        "Event history and participation tracking"
      ]
    },
    {
      title: "Admin Approval System",
      description: "Administrative controls for content moderation and event approval",
      image: "/src/assets/images/portfolio/urban-runners-3.png",
      details: [
        "Admin dashboard for event management",
        "Approve or reject user-created events",
        "Moderate event content and details",
        "Bulk approval operations",
        "Admin notification system"
      ]
    },
    {
      title: "User Profiles & Settings",
      description: "Personalized user experience with customizable preferences",
      image: "/src/assets/images/portfolio/urban-runners-4.png",
      details: [
        "Personal profile management",
        "Running statistics and achievements",
        "Notification preferences",
        "Privacy and security settings",
        "Account customization options"
      ]
    }
  ]
};
