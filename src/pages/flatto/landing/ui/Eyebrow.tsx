import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
}

export const Eyebrow = ({ children }: EyebrowProps) => <p className="eyebrow">{children}</p>;
