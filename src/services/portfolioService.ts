import { Project } from "../types/portfolio";

export const portfolioProjects: Project[] = [
  {
    id: "urban-runners",
    title: "Urban Runners",
    description: "A comprehensive mobile application for running clubs that enables users to discover, join, and create running events. The app features user authorization, race management, admin approval workflows, and personalized user profiles with customizable settings.",
    shortDescription: "Mobile app for running clubs with event management and user profiles",
    image: "/src/assets/images/portfolio/urban-runners-1.png",
    technologies: ["Flutter", "Supabase", "Push Notifications", "OneSignal", "Provider", "auto_route", ],
    category: "Mobile Development",
    featured: true,
    githubUrl: "https://github.com/aaguueeroo/urban-runners",
    slug: "urban-runners"
  },
  {
    id: "flatto",
    title: "Flatto",
    description: "A mobile app that helps flatmates organize their household life, reduce friction, and keep everyone on the same page. Features include shared shopping lists, cleaning schedules, real-time feed, and apartment management.",
    shortDescription: "Mobile app for shared living - shopping, cleaning, and communication",
    image: "/src/assets/images/portfolio/flatto-hero.png",
    technologies: ["Flutter", "Supabase", "PostgreSQL", "Cursor AI"],
    category: "Mobile Development",
    featured: true,
    slug: "flatto"
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return portfolioProjects.find(project => project.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return portfolioProjects.filter(project => project.featured);
};

export const getAllProjects = (): Project[] => {
  return portfolioProjects;
};
