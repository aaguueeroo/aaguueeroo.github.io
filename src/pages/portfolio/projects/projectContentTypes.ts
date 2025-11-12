import { ReactNode } from "react";

export type ProjectHeroAction = {
  label: string;
  url: string;
};

export type ProjectHeroContent = {
  coverImage: string;
  coverImageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  primaryAction?: ProjectHeroAction;
};

export type ProjectDescriptionSectionContent = {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
};

export type ProjectFeatureContent = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon?: string;
};

export type ProjectFeaturesSectionContent = {
  title: string;
  features: ProjectFeatureContent[];
};

export type ProjectFeaturesSectionRendererArgs = {
  onOpenImageModal: (imageSrc: string, imageAlt: string) => void;
};

export type ProjectFeaturesSectionRenderer = (
  args: ProjectFeaturesSectionRendererArgs,
) => ReactNode;

export type ProjectTechnologyDetail = {
  name: string;
  category: string;
  description: string;
  logo?: string;
  chips?: string[];
  color?: string;
};

export type ProjectTechnologiesSectionContent = {
  title: string;
  technologies: ProjectTechnologyDetail[];
};

export type ProjectExtraSectionRenderer = () => ReactNode;

export type ProjectExtraSectionContent = {
  title: string;
  paragraphs: string[];
};

export type ProjectCallToActionContent = {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
};

export type ProjectPageContent = {
  slug: string;
  seo: {
    title: string;
    description: string;
    image?: string;
  };
  hero: ProjectHeroContent;
  description: ProjectDescriptionSectionContent;
  renderFeaturesSection: ProjectFeaturesSectionRenderer;
  technologies: ProjectTechnologiesSectionContent;
  renderExtraSection?: ProjectExtraSectionRenderer;
  cta: ProjectCallToActionContent;
};

