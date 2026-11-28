import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { MaxWidths } from "../../../theme/constants";

type HomeSectionProps = {
  children: ReactNode;
  /** Styles of the full-width band: the section's own vertical padding and background. */
  sx?: SxProps<Theme>;
  /** Extra styles of the centered column, such as a flex layout. */
  contentSx?: SxProps<Theme>;
};

/** Turns an `sx` prop into a list that can be appended to the base styles. */
const toSxList = (sx: SxProps<Theme> | undefined) =>
  Array.isArray(sx) ? sx : [sx];

/**
 * One section of the home page: a full-width band around a centered column at most
 * `MaxWidths.content` wide. Every section gets the same side gutters from here, so their
 * contents line up with each other.
 *
 * Both boxes are border-box: with the default content-box, `width: 100%` plus side padding
 * makes the band wider than the screen, and the page's `overflow: hidden` then hides the
 * overflow on the right, which pushes the content off-center.
 */
export function HomeSection({ children, sx, contentSx }: HomeSectionProps) {
  return (
    <Box
      sx={[
        { width: "100%", boxSizing: "border-box", px: { xs: 2, md: 4 } },
        ...toSxList(sx),
      ]}
    >
      <Box
        sx={[
          {
            maxWidth: MaxWidths.content,
            mx: "auto",
            boxSizing: "border-box",
            px: { xs: "16px", sm: "32px", md: "96px" },
          },
          ...toSxList(contentSx),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
}
