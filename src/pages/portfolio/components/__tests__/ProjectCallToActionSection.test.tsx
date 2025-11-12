import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectCallToActionSection from "../ProjectCallToActionSection";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectCallToActionContent } from "../../projects/projectContentTypes";

const ctaContent: ProjectCallToActionContent = {
  title: "Interested in building something similar?",
  description: "Let's connect and explore how we can collaborate.",
  buttonText: "Let's talk",
  buttonHref: "/quote",
};

describe("ProjectCallToActionSection", () => {
  it("renders the CTA content", () => {
    renderWithProviders(
      <ProjectCallToActionSection cta={ctaContent} onAction={() => {}} />,
    );

    expect(
      screen.getByRole("heading", { name: ctaContent.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(ctaContent.description ?? "")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: ctaContent.buttonText }),
    ).toBeInTheDocument();
  });

  it("calls onAction when the button is pressed", () => {
    const onAction = vi.fn();

    renderWithProviders(
      <ProjectCallToActionSection cta={ctaContent} onAction={onAction} />,
    );

    screen.getByRole("button", { name: ctaContent.buttonText }).click();

    expect(onAction).toHaveBeenCalledWith(ctaContent.buttonHref);
  });
});

