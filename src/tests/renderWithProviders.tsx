import { ReactElement } from "react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { render } from "@testing-library/react";

type RenderWithProvidersOptions = {
  routerProps?: MemoryRouterProps;
};

export const renderWithProviders = (
  ui: ReactElement,
  { routerProps }: RenderWithProvidersOptions = {},
) => {
  return render(
    <HelmetProvider>
      <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
};

export type RenderWithProvidersResult = ReturnType<typeof renderWithProviders>;

