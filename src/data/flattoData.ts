export interface FlattoFeature {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface FlattoTechnology {
  name: string;
  category: string;
  description: string;
  logo?: string;
}

export interface FlattoProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FlattoProjectDetail {
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
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  overview: {
    problem: string;
    targetAudience: string[];
  };
  features: FlattoFeature[];
  techDetails: FlattoTechnology[];
  developmentProcess: FlattoProcessStep[];
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const flattoProject: FlattoProjectDetail = {
  id: "flatto",
  title: "Flatto",
  description: "A mobile app that helps flatmates organize their household life, reduce friction, and keep everyone on the same page.",
  shortDescription: "Mobile app for shared living - shopping, cleaning, and communication",
  image: "/src/assets/images/portfolio/flatto-feed.png",
  technologies: ["Cursor", "Flutter", "Supabase"],
  category: "Mobile Development",
  featured: true,
  slug: "flatto",
  hero: {
    title: "Flatto – Making Shared Living Effortless",
    subtitle: "A mobile app that helps flatmates organize their household life, reduce friction, and keep everyone on the same page.",
    description: "Flatto is a mobile app designed for people living in shared flats. Its goal is to simplify the daily challenges of cohabitation—shopping, cleaning, and communication—by putting everything into one place.",
    image: "/src/assets/images/portfolio/flatto-feed.png"
  },
  overview: {
    problem: "Flatto is a mobile app designed for people living in shared flats. Its goal is to simplify the daily challenges of cohabitation—shopping, cleaning, and communication—by putting everything into one place.",
    targetAudience: [
      "Students living in shared apartments",
      "Young professionals balancing busy schedules", 
      "Any group of tenants who want a fair, transparent way to manage household tasks"
    ]
  },
  features: [
    {
      id: "feed",
      title: "Feed",
      description: "A centralized activity feed where tenants see updates in real time: who bought groceries, who completed a cleaning task, or new messages posted by flatmates. Keeps everyone aligned without the need for endless chats.",
      image: "/src/assets/images/portfolio/flatto-feed.png",
      icon: "📰"
    },
    {
      id: "shopping",
      title: "Shared Shopping List",
      description: "One collective shopping list for the flat. Tenants can add, edit, or remove items, and mark them as bought. Every change is instantly synced across all devices and reflected in the feed.",
      image: "/src/assets/images/portfolio/flatto-shopping.png",
      icon: "🛒"
    },
    {
      id: "cleaning",
      title: "Cleaning Schedule",
      description: "A weekly task planner that ensures fairness in shared chores. Tasks rotate automatically between flatmates, reducing misunderstandings and forgotten responsibilities.",
      image: "/src/assets/images/portfolio/flatto-cleaning.png",
      icon: "🧹"
    },
    {
      id: "apartment",
      title: "Apartment & Room View",
      description: "Each user joins their apartment with a secure invite link or code. Inside the apartment view, flatmates see apartment details (address, rent, expenses) and individual room info (price, size, notes, pictures).",
      image: "/src/assets/images/portfolio/flatto-apartment.png",
      icon: "🏠"
    },
    {
      id: "profile",
      title: "Profile",
      description: "A personal profile for each tenant, allowing flatmates to identify one another and manage their roles (e.g., owner, member). Profiles are connected directly to Supabase authentication.",
      image: "/src/assets/images/portfolio/flatto-profile.png",
      icon: "👤"
    }
  ],
  techDetails: [
    {
      name: "Cursor AI",
      category: "Development Tools",
      description: "AI-assisted coding for faster development",
      logo: "/src/assets/images/tech/cursor-logo.png",
      chips: ["AI Agent"],
      color: "#424242" // Grey
    },
    {
      name: "Flutter",
      category: "Frontend",
      description: "Cross-platform mobile development with Material Design",
      logo: "/src/assets/images/tech/flutter-logo.png",
      chips: ["auto_route", "provider"],
      color: "#1976D2" // Blue
    },
    {
      name: "Supabase",
      category: "Backend",
      description: "Authentication, PostgreSQL database, storage, and real-time subscriptions",
      logo: "/src/assets/images/tech/supabase-logo.png",
      chips: ["PostgreSQL"],
      color: "#2D5016" // Dark green
    }
  ],
  developmentProcess: [
    {
      step: 1,
      title: "Problem Definition",
      description: "Defined the core problem: shared flats struggle with communication, chores, and forgotten shopping."
    },
    {
      step: 2,
      title: "MVP Development",
      description: "Built the MVP: implemented the cleaning schedule and shared shopping list."
    },
    {
      step: 3,
      title: "Feed Automation",
      description: "Added feed automation: used Supabase triggers to log important actions automatically."
    },
    {
      step: 4,
      title: "Real-time Updates",
      description: "Improved the shopping list: added real-time updates and integration with the feed."
    },
    {
      step: 5,
      title: "UI Refinement",
      description: "Refined the cleaning schedule: polished the rotation system and UI for fairness and usability."
    }
  ],
  callToAction: {
    title: "Interested in building something similar?",
    description: "",
    buttonText: "Let's talk"
  }
};
