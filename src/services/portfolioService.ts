import { Project } from "../types/portfolio";
import urbanRunnersImage from "../assets/images/portfolio/urban-runners-1.png";
import app4itImage from "../assets/images/portfolio/app4it-thumbnail.png";
import flattoImage from "../assets/images/portfolio/flatto-hero.png";

const showUrbanRunners = import.meta.env.VITE_SHOW_URBAN_RUNNERS === "true";

const rawProjects: Project[] = [
  {
    id: "urban-runners",
    title: "Urban Runners",
    description:
      "A comprehensive mobile application for running clubs that enables users to discover, join, and create running events. The app features user authorization, race management, admin approval workflows, and personalized user profiles with customizable settings.",
    shortDescription:
      "Mobile app for running clubs with event management and user profiles",
    image: urbanRunnersImage,
    technologies: [
      "Flutter",
      "Supabase",
      "Figma",
      "Jira",
      "Push Notifications",
      "OneSignal",
    ],
    category: "Mobile Development",
    featured: true,
    githubUrl: "https://github.com/aaguueeroo/urban-runners",
    slug: "urban-runners",
  },
  {
    id: "app4it",
    title: "App4it",
    description:
      "App4it is a social platform that helps young adults discover local events, share memories, and build real-world connections.",
    shortDescription:
      "Social app for finding local events, sharing memories, and growing real-world connections.",
    image: app4itImage,
    technologies: ["Flutter", "Supabase", "Figma", "Jira"],
    category: "Mobile Development",
    featured: false,
    liveUrl: "https://app4it.de/",
  },
  {
    id: "flatto",
    title: "Flatto",
    description:
      "A mobile app that helps flatmates organize their household life, reduce friction, and keep everyone on the same page. Features include shared shopping lists, cleaning schedules, real-time feed, and apartment management.",
    shortDescription:
      "Mobile app for shared living - shopping, cleaning, and communication",
    image: flattoImage,
    technologies: ["Flutter", "Supabase", "SQL", "Cursor AI"],
    category: "Mobile Development",
    featured: true,
    slug: "flatto",
  },
  {
    id: "hymate",
    title: "Hymate",
    description:
      "Hymate is a software platform that simplifies planning and managing complex industrial energy systems—enabling companies to optimize production, reduce costs, and drive sustainability through data-driven decision-making.",
    shortDescription:
      "Software platform for planning and managing complex industrial energy systems.",
    image:
      "https://cdn.prod.website-files.com/63f502e761dc1d6feff40718/67308af53fd2ebb2fcee82ec_appMbl.png",
    technologies: ["Flutter"],
    category: "Web Development",
    featured: false,
    liveUrl: "https://www.hymate.com",
  },
];

export const portfolioProjects: Project[] = rawProjects.filter(
  (project) => project.id !== "urban-runners" || showUrbanRunners
);

export const getProjectBySlug = (slug: string): Project | undefined => {
  return portfolioProjects.find((project) => project.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return portfolioProjects.filter((project) => project.featured);
};

export const getAllProjects = (): Project[] => {
  return portfolioProjects;
};
