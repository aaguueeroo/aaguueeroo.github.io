import { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon, IconName } from "./Icon";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "bright" | "ghost";
  size?: "small" | "large";
  icon?: IconName;
  trailingIcon?: IconName;
  children: ReactNode;
}

// Every button on the page goes somewhere, so they're all links.
export const Button = ({
  variant = "primary",
  size = "large",
  icon,
  trailingIcon,
  children,
  ...link
}: ButtonProps) => (
  <a className={`button button--${variant} button--${size}`} {...link}>
    {icon && <Icon name={icon} size={22} />}
    {children}
    {trailingIcon && <Icon name={trailingIcon} />}
  </a>
);
