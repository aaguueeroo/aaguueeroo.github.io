export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  /** Which part of the image stays in view when a card crops it (CSS object-position). Default: center. */
  imagePosition?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  slug?: string;
}

export interface PortfolioData {
  projects: Project[];
}
