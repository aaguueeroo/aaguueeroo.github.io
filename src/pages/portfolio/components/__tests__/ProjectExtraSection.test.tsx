import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectExtraSection from "../ProjectExtraSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectExtraSectionContent } from "../../projects/projectContent.types";

const extraContent: ProjectExtraSectionContent = {
  title: "Additional Insights",
  paragraphs: [
    "We evolved the MVP using user feedback.",
    "Upcoming updates include reporting dashboards.",
  ],
};

describe("ProjectExtraSection", () => {
  it("renders the extra section content", () => {
    renderWithProviders(<ProjectExtraSection extra={extraContent} />);

    expect(
      screen.getByRole("heading", { name: extraContent.title }),
    ).toBeInTheDocument();

    extraContent.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });
});

