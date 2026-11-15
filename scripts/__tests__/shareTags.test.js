import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { applyRoute, blogPostRoute, imageSize, DEFAULT_SHARE_IMAGE } from "../shareTags.js";

const root = path.resolve(__dirname, "../..");
const baseHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

const meta = (html, key) => {
  const match = html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)" />`));
  return match ? match[1] : null;
};

const spanishPost = {
  slug: "ia-nuevo-renacimiento",
  title: "La IA será el Nuevo Renacimiento de las ideas",
  metaTitle: "La IA será un nuevo Renacimiento | La Órbita de Dimorpho",
  metaDescription: "La IA es la imprenta más la electricidad: acerca el saber y da el poder de construir.",
  language: "Spanish",
  publishedDate: "2026-11-16",
  coverImage: "/blog-images/ia-nuevo-renacimiento-cover.jpg",
};

describe("a blog post's share page", () => {
  const route = blogPostRoute(spanishPost, {
    url: "https://juliaaguero.com/blog-images/ia-nuevo-renacimiento-cover.jpg",
    width: 1536,
    height: 1024,
  });
  const html = applyRoute(baseHtml, route);

  it("is written where GitHub Pages serves /blog/<slug>", () => {
    expect(route.file).toBe("blog/ia-nuevo-renacimiento.html");
  });

  it("carries the post's own title, description, cover and address for every social app", () => {
    expect(html).toContain("<title>La IA será un nuevo Renacimiento | La Órbita de Dimorpho</title>");
    for (const key of ["og:title", "twitter:title"]) {
      expect(meta(html, key)).toBe(spanishPost.metaTitle);
    }
    for (const key of ["description", "og:description", "twitter:description"]) {
      expect(meta(html, key)).toBe(spanishPost.metaDescription);
    }
    for (const key of ["og:image", "twitter:image"]) {
      expect(meta(html, key)).toBe("https://juliaaguero.com/blog-images/ia-nuevo-renacimiento-cover.jpg");
    }
    expect(meta(html, "og:url")).toBe("https://juliaaguero.com/blog/ia-nuevo-renacimiento");
  });

  it("describes itself as a Spanish article with its date and image size", () => {
    expect(html).toContain('<html lang="es">');
    expect(meta(html, "og:type")).toBe("article");
    expect(meta(html, "og:locale")).toBe("es_ES");
    expect(meta(html, "article:published_time")).toBe("2026-11-16");
    expect(meta(html, "og:image:width")).toBe("1536");
    expect(meta(html, "og:image:height")).toBe("1024");
    expect(meta(html, "og:image:alt")).toBe(spanishPost.title);
  });

  it("escapes quotes, ampersands and replacement patterns instead of breaking the tag", () => {
    const tricky = applyRoute(
      baseHtml,
      blogPostRoute({ ...spanishPost, metaTitle: 'Say "hi" & $& costs $1' }, null),
    );
    expect(meta(tricky, "og:title")).toBe("Say &quot;hi&quot; &amp; $&amp; costs $1");
  });

  it("falls back to the subtitle and the site's default image when the post has neither", () => {
    const route = blogPostRoute({ ...spanishPost, metaDescription: "", subtitle: "Un subtítulo" }, null);
    expect(route.description).toBe("Un subtítulo");
    expect(route.image).toBe(DEFAULT_SHARE_IMAGE);
  });
});

describe("a fixed page's share tags", () => {
  it("keep the base page's type and add no article tags", () => {
    const html = applyRoute(baseHtml, {
      path: "/about",
      title: "About Julia",
      description: "Who I am",
      url: "https://juliaaguero.com/about",
    });
    expect(meta(html, "og:title")).toBe("About Julia");
    expect(meta(html, "og:type")).toBe("website");
    expect(meta(html, "og:image")).toBe(DEFAULT_SHARE_IMAGE);
    expect(meta(html, "og:locale")).toBeNull();
  });
});

describe("imageSize", () => {
  it("reads the size of a JPEG and a PNG from their headers", () => {
    expect(imageSize(path.join(root, "public/meta-image.jpg"))).toEqual({ width: 1200, height: 715 });
    expect(imageSize(path.join(root, "public/apple-touch-icon.png"))).toEqual({ width: 180, height: 180 });
  });

  it("returns null for a missing file", () => {
    expect(imageSize(path.join(root, "public/does-not-exist.png"))).toBeNull();
  });
});
