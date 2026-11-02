import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PortfolioCard from "../PortfolioCard";
import { renderWithProviders } from "../../../../tests/renderWithProviders";
import { getAllProjects } from "../../../../services/portfolioService";

describe("PortfolioCard", () => {
  it("opens the Flatto landing page as a URL, because it has no React route", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    const flatto = getAllProjects().find((project) => project.id === "flatto");

    renderWithProviders(<PortfolioCard project={flatto!} />);
    fireEvent.click(screen.getByRole("heading", { name: "Flatto" }));

    expect(open).toHaveBeenCalledWith("/flatto/", "_blank");
    open.mockRestore();
  });
});
