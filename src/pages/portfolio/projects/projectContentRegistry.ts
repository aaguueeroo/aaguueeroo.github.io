import { ProjectPageContent } from "./projectContentTypes";
import { flattoProjectContent } from "./content/flattoProjectContent.tsx";
import { urbanRunnersProjectContent } from "./content/urbanRunnersProjectContent.tsx";
import { exxcellentProjectContent } from "./content/exxcellentProjectContent.tsx";

const projectRegistry: Record<string, ProjectPageContent> = {
  [flattoProjectContent.slug]: flattoProjectContent,
  [urbanRunnersProjectContent.slug]: urbanRunnersProjectContent,
  [exxcellentProjectContent.slug]: exxcellentProjectContent,
};

export const getProjectContentBySlug = (slug: string): ProjectPageContent | undefined =>
  projectRegistry[slug];

export const listProjectContents = (): ProjectPageContent[] => Object.values(projectRegistry);

