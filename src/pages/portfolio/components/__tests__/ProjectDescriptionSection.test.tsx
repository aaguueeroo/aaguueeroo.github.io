import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectDescriptionSection from "../ProjectDescriptionSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectDescriptionSectionContent } from "../../projects/projectContentTypes";

const description: ProjectDescriptionSectionContent = {
  title: "Project Overview",
  paragraphs: [
    "The project solves a recurring challenge for teams.",
    "It delivers measurable impact through automation.",
  ],
  bulletPoints: ["Supports multiple roles", "Delivers analytics dashboard"],
};

describe("ProjectDescriptionSection", () => {
  it("renders paragraphs and bullet points without a heading", () => {
    renderWithProviders(
      <ProjectDescriptionSection description={description} />,
    );

    description.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    description.bulletPoints?.forEach((bulletPoint) => {
      expect(screen.getByText(bulletPoint)).toBeInTheDocument();
    });
  });
});

