import { ProjectPageContent } from "./projectContent.types";
import { flattoProjectContent } from "./content/flattoProjectContent";
import { urbanRunnersProjectContent } from "./content/urbanRunnersProjectContent";

const projectRegistry: Record<string, ProjectPageContent> = {
  [flattoProjectContent.slug]: flattoProjectContent,
  [urbanRunnersProjectContent.slug]: urbanRunnersProjectContent,
};

export const getProjectContentBySlug = (slug: string): ProjectPageContent | undefined =>
  projectRegistry[slug];

export const listProjectContents = (): ProjectPageContent[] => Object.values(projectRegistry);

