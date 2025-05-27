import { Card, CardProps } from "@mui/material";
import { ReactNode } from "react";
import { Spacings, Radiuses } from "../theme/constants";

interface MyCardProps extends CardProps {
  children: ReactNode;
  padding?: number;
  gap?: number;
  flex?: string;
  flexDirection?: "row" | "column";
  size?: "large" | "medium" | "small";
}

const MyCard = ({
  children,
  padding,
  gap,
  flex,
  flexDirection,
  size,
  ...props
}: MyCardProps) => {
  const sizeStyles: Record<
    "large" | "medium" | "small",
    { padding: number; gap: number }
  > = {
    large: { padding: Spacings.l, gap: Spacings.m },
    medium: { padding: Spacings.m, gap: Spacings.s },
    small: { padding: Spacings.s, gap: Spacings.xs },
  };

  const selectedSize = size ? sizeStyles[size] : sizeStyles.medium;

  return (
    <Card
      sx={{
        padding: padding ?? selectedSize.padding ?? Spacings.m,
        gap: gap ?? selectedSize.gap ?? Spacings.s,
        display: "flex",
        flex: flex ?? "flex-start",
        flexDirection: flexDirection ?? "column",
        boxShadow: Radiuses.xl,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default MyCard;
