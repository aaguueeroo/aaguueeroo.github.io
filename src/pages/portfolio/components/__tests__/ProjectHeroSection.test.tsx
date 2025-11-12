import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectHeroSection from "../ProjectHeroSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectHeroContent } from "../../projects/projectContentTypes";

const heroContent: ProjectHeroContent = {
  coverImage: "/image.png",
  coverImageAlt: "Project cover",
  title: "Project Title",
  subtitle: "Project Subtitle",
  description: "A story about the project goals and challenges.",
  technologies: ["React", "TypeScript"],
  primaryAction: {
    label: "View Live",
    url: "https://example.com",
  },
};

describe("ProjectHeroSection", () => {
  it("renders the hero content", () => {
    renderWithProviders(
      <ProjectHeroSection
        hero={heroContent}
        onNavigateBack={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: heroContent.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroContent.subtitle),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroContent.description),
    ).toBeInTheDocument();
    expect(screen.getByText("Scroll to explore")).toBeInTheDocument();
  });

  it("renders technology chips", () => {
    renderWithProviders(
      <ProjectHeroSection
        hero={heroContent}
        onNavigateBack={() => {}}
      />,
    );

    heroContent.technologies.forEach((technology) => {
      expect(screen.getByText(technology)).toBeInTheDocument();
    });
  });

  it("invokes onPrimaryActionClick when the primary action is pressed", () => {
    const onPrimaryActionClick = vi.fn();

    renderWithProviders(
      <ProjectHeroSection
        hero={heroContent}
        onNavigateBack={() => {}}
        onPrimaryActionClick={onPrimaryActionClick}
      />,
    );

    screen.getByRole("button", { name: heroContent.primaryAction?.label }).click();

    expect(onPrimaryActionClick).toHaveBeenCalledWith(heroContent.primaryAction);
  });
});

