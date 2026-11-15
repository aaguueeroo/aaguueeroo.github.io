import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BlogPost from "../BlogPost";
import { BlogPost as BlogPostData } from "../../types";
import { renderWithProviders } from "../../../tests/renderWithProviders";

const text = (content: string) => ({
  type: "text",
  plain_text: content,
  text: { content },
  annotations: {},
});

const paragraph = (content: string) => ({
  type: "paragraph",
  paragraph: { rich_text: [text(content)] },
});

const image = (url: string, caption: ReturnType<typeof text>[] = []) => ({
  type: "image",
  image: { type: "file", file: { url }, caption },
});

const postWith = (content: unknown[]): BlogPostData => ({
  id: "post-id",
  title: "Post title",
  slug: "post-title",
  publishedDate: "2026-11-16",
  status: "Published",
  language: "Spanish",
  tags: [],
  postCategories: [],
  content,
});

describe("BlogPost body", () => {
  it("shows a Notion divider as a horizontal line between the blocks around it", () => {
    renderWithProviders(
      <BlogPost post={postWith([paragraph("Before"), { type: "divider", divider: {} }, paragraph("After")])} />,
    );

    const divider = screen.getByText("Before").closest("p")?.nextElementSibling;
    expect(divider?.tagName).toBe("HR");
    expect(divider?.nextElementSibling).toHaveTextContent("After");
  });

  it("uses the image's caption as its alt text and doesn't show it as text", () => {
    renderWithProviders(
      <BlogPost
        post={postWith([
          image("/blog-images/drawer.jpg", [text("Una libreta llena de ideas "), text("dentro de un cajón")]),
        ])}
      />,
    );

    const img = screen.getByAltText("Una libreta llena de ideas dentro de un cajón");
    expect(img).toHaveAttribute("src", "/blog-images/drawer.jpg");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(screen.queryByText("Una libreta llena de ideas dentro de un cajón")).not.toBeInTheDocument();
  });

  it("gives an image without a caption an empty alt instead of a made-up one", () => {
    const { container } = renderWithProviders(
      <BlogPost post={postWith([image("/blog-images/no-caption.png")])} />,
    );

    const img = container.querySelector('img[src="/blog-images/no-caption.png"]');
    expect(img).toHaveAttribute("alt", "");
  });
});
