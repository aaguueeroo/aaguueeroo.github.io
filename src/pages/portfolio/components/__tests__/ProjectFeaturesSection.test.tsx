import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectFeaturesSection from "../ProjectFeaturesSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectFeaturesSectionContent } from "../../projects/projectContentTypes";

const featuresSection: ProjectFeaturesSectionContent = {
  title: "Key Features",
  features: [
    {
      id: "feature-1",
      title: "Feature One",
      description: "First feature description",
      image: "/feature-1.png",
      imageAlt: "Feature One image",
    },
    {
      id: "feature-2",
      title: "Feature Two",
      description: "Second feature description",
      image: "/feature-2.png",
      imageAlt: "Feature Two image",
    },
  ],
};

describe("ProjectFeaturesSection", () => {
  it("renders section title and feature content", () => {
    renderWithProviders(
      <ProjectFeaturesSection
        features={featuresSection}
        onFeatureImageClick={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: featuresSection.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: featuresSection.features[0].title }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(featuresSection.features[0].description),
    ).toBeInTheDocument();
  });

  it("notifies when a feature image is clicked", () => {
    const onFeatureImageClick = vi.fn();

    renderWithProviders(
      <ProjectFeaturesSection
        features={featuresSection}
        onFeatureImageClick={onFeatureImageClick}
      />,
    );

    fireEvent.click(
      screen.getByRole("img", { name: featuresSection.features[0].imageAlt }),
    );

    expect(onFeatureImageClick).toHaveBeenCalledWith(
      featuresSection.features[0].image,
      featuresSection.features[0].imageAlt,
    );
  });
});

