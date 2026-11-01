import { Screen } from "../content/types";

export const SCREEN_WIDTH = 760;
export const SCREEN_HEIGHT = 1651;

export const screenSources = (name: Screen["name"]): string =>
  `/flatto/images/${name}-420.avif 420w, /flatto/images/${name}-${SCREEN_WIDTH}.avif ${SCREEN_WIDTH}w`;
