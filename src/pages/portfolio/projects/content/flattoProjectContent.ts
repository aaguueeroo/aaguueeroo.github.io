import { ProjectPageContent } from "../projectContent.types";

export const flattoProjectContent: ProjectPageContent = {
  slug: "flatto",
  seo: {
    title: "Flatto - Julia's Portfolio",
    description:
      "Mobile app for shared living with shopping lists, cleaning schedules, and a shared feed.",
    image: "/src/assets/images/portfolio/flatto-feed.png",
  },
  hero: {
    coverImage: "/src/assets/images/portfolio/flatto-hero.png",
    coverImageAlt: "Flatto application hero background",
    title: "Flatto – Making Shared Living Effortless",
    subtitle:
      "A mobile app that helps flatmates organize their household life, reduce friction, and keep everyone on the same page.",
    description:
      "Flatto centralizes shopping lists, cleaning routines, and household communication so that everyone stays aligned without endless chats.",
    technologies: ["Cursor", "Flutter", "Supabase"],
  },
  description: {
    title: "Project Overview",
    paragraphs: [
      "Flatto was designed for people sharing a flat who need one place to organize their day-to-day responsibilities. It simplifies the recurring problems of cohabitation by grouping shopping, cleaning, and coordination into a single experience.",
    ],
    bulletPoints: [
      "Students balancing life in shared apartments",
      "Young professionals with little time for logistics",
      "Flatmates who need transparent and fair task management",
    ],
  },
  features: {
    title: "Key Features",
    features: [
      {
        id: "feed",
        title: "Activity Feed",
        description:
          "Captures the latest cleaning and shopping activity so that every flatmate knows what happened without chasing updates.",
        image: "/src/assets/images/portfolio/flatto-feed.png",
        imageAlt: "Flatto activity feed screen",
      },
      {
        id: "shopping",
        title: "Shared Shopping List",
        description:
          "A synced grocery list that records who added each item, purchase history, and buyer tracking for complete transparency.",
        image: "/src/assets/images/portfolio/flatto-shopping.png",
        imageAlt: "Flatto shared shopping list screen",
      },
      {
        id: "cleaning",
        title: "Cleaning Scheduler",
        description:
          "Weighted rotations balance chores fairly and keep everyone accountable with reminders and feed updates.",
        image: "/src/assets/images/portfolio/flatto-cleaning.png",
        imageAlt: "Flatto cleaning scheduler screen",
      },
      {
        id: "apartment",
        title: "Apartment & Room Management",
        description:
          "Apartment details, expenses, and room information live side-by-side so newcomers understand costs and context instantly.",
        image: "/src/assets/images/portfolio/flatto-apartment.png",
        imageAlt: "Flatto apartment management screen",
      },
      {
        id: "profile",
        title: "Supabase-backed Profiles",
        description:
          "Authenticated user profiles let flatmates recognise each other, manage roles, and keep their details up to date.",
        image: "/src/assets/images/portfolio/flatto-profile.png",
        imageAlt: "Flatto profile screen",
      },
    ],
  },
  technologies: {
    title: "Technology Highlights",
    technologies: [
      {
        name: "Cursor AI",
        category: "Development Tools",
        description: "AI-assisted coding accelerated prototyping and refactoring.",
        logo: "/src/assets/images/tech/cursor-logo.png",
        chips: ["AI Agent"],
        color: "#424242",
      },
      {
        name: "Flutter",
        category: "Frontend",
        description: "Cross-platform UI with auto_route navigation and provider for state.",
        logo: "/src/assets/images/tech/flutter-logo.png",
        chips: ["auto_route", "provider"],
        color: "#1976D2",
      },
      {
        name: "Supabase",
        category: "Backend",
        description:
          "Authentication, Postgres database, storage, and real-time subscriptions to keep flatmates in sync.",
        logo: "/src/assets/images/tech/supabase-logo.png",
        chips: ["PostgreSQL"],
        color: "#2D5016",
      },
    ],
  },
  extra: {
    title: "Development Process",
    paragraphs: [
      "Problem Definition: tenants in shared flats regularly lose track of cleaning responsibilities and grocery needs, creating friction. The solution needed to keep everyone aligned without extra effort.",
      "MVP: the first release focused on the shared shopping list and cleaning scheduler to solve the highest-friction problems immediately.",
      "Feed Automation: database triggers log every relevant action, creating a living history of the flat's activity without manual updates.",
      "Real-time Enhancements: cleaned-up shopping list experience with author tracking and live updates tied back to the feed.",
      "Iteration: the cleaning schedule evolved with weighted rotations and flexible chore modes to stay fair as needs change.",
    ],
  },
  cta: {
    title: "Interested in building something similar?",
    description: "",
    buttonText: "Let's talk",
    buttonHref: "/quote",
  },
};

