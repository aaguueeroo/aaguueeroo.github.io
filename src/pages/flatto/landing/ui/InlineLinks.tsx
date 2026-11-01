import { InlineText } from "../content/types";

interface InlineLinksProps {
  text: InlineText;
}

export const InlineLinks = ({ text }: InlineLinksProps) => (
  <>
    {text.map((part) =>
      typeof part === "string" ? (
        part
      ) : (
        <a key={part.href} href={part.href}>
          {part.label}
        </a>
      ),
    )}
  </>
);
