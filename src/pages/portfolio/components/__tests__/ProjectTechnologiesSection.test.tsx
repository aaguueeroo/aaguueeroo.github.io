import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectTechnologiesSection from "../ProjectTechnologiesSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectTechnologiesSectionContent } from "../../projects/projectContentTypes";

const technologies: ProjectTechnologiesSectionContent = {
  technologies: [
    {
      name: "React",
      category: "Frontend",
      description: "UI library",
      chips: ["Hooks"],
      color: "#61dafb",
    },
  ],
};

describe("ProjectTechnologiesSection", () => {
  it("renders the technology cards", () => {
    renderWithProviders(
      <ProjectTechnologiesSection technologies={technologies} />,
    );

    expect(
      screen.getByRole("heading", { name: "Tech Stack" }),
    ).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Hooks")).toBeInTheDocument();
  });
});

