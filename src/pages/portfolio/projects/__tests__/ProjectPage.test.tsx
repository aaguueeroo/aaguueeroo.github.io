import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectPage from "../ProjectPage";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { ProjectPageContent } from "../projectContent.types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const projectContent: ProjectPageContent = {
  slug: "sample-project",
  seo: {
    title: "Sample Project",
    description: "Sample project description",
    image: "/cover.png",
  },
  hero: {
    coverImage: "/cover.png",
    coverImageAlt: "Sample cover image",
    title: "Sample Project",
    subtitle: "Improving workflows for teams.",
    description: "The project unifies operations into a single collaborative hub.",
    technologies: ["React", "TypeScript"],
    primaryAction: {
      label: "View Live",
      url: "https://example.com",
    },
  },
  description: {
    title: "About the Project",
    paragraphs: [
      "First paragraph describing the project.",
      "Second paragraph with more detail.",
    ],
    bulletPoints: ["Supports integrations", "Provides analytics"],
  },
  features: {
    title: "Core Features",
    features: [
      {
        id: "feature-1",
        title: "Composable Workflows",
        description: "Build workflows visually to match your processes.",
        image: "/feature-1.png",
        imageAlt: "Composable workflows example",
      },
    ],
  },
  technologies: {
    title: "Technologies",
    technologies: [
      {
        name: "React",
        category: "Frontend",
        description: "Component based UI library.",
        color: "#61dafb",
      },
    ],
  },
  extra: {
    title: "What is Next",
    paragraphs: ["We are preparing an automation SDK.", "Launching beta soon."],
  },
  cta: {
    title: "Interested in building something similar?",
    description: "Let's create your product together.",
    buttonText: "Let's talk",
    buttonHref: "/quote",
  },
};

describe("ProjectPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders sections and handles interactions", async () => {
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    renderWithProviders(<ProjectPage content={projectContent} />);

    expect(
      screen.getByRole("heading", { name: projectContent.hero.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: projectContent.description.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: projectContent.features.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: projectContent.extra.title }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: projectContent.hero.primaryAction?.label ?? "",
      }),
    );
    expect(windowOpenSpy).toHaveBeenCalledWith(
      projectContent.hero.primaryAction?.url,
      "_blank",
    );

    fireEvent.click(
      screen.getByRole("img", {
        name: projectContent.features.features[0].imageAlt,
      }),
    );
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("img", {
        name: projectContent.features.features[0].imageAlt,
      }),
    ).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button"));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    fireEvent.click(
      screen.getByRole("button", { name: /let's talk/i }),
    );
    expect(mockNavigate).toHaveBeenCalledWith(projectContent.cta.buttonHref);

    windowOpenSpy.mockRestore();
  });
});

