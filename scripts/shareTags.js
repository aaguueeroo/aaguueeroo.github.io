// The tags in <head> that social apps (WhatsApp, X, Facebook, LinkedIn, Telegram…) read to build a link
// preview. Those apps don't run JavaScript, so a page only gets a preview if its static HTML already has them.
import fs from 'fs';

export const SITE_URL = 'https://juliaaguero.com';
export const DEFAULT_SHARE_IMAGE = `${SITE_URL}/meta-image.jpg`;

export function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return null;
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Width and height of a PNG or JPEG file, read from its header, or null for anything else. */
export function imageSize(filePath) {
  let data;
  try {
    data = fs.readFileSync(filePath);
  } catch {
    return null;
  }
  // PNG: the IHDR chunk always comes first.
  if (data.length > 24 && data.readUInt32BE(0) === 0x89504e47) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  // JPEG: walk the segments until a start-of-frame marker.
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) return null;
      const marker = data[offset + 1];
      const length = data.readUInt16BE(offset + 2);
      const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isStartOfFrame) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) };
      }
      offset += 2 + length;
    }
  }
  return null;
}

/**
 * The page of a blog post, from its entry in src/blog/content/index.json.
 * `image` is the share image's absolute URL, with its size when known.
 */
export function blogPostRoute(post, image) {
  const spanish = post.language === 'Spanish';
  return {
    path: `/blog/${post.slug}`,
    // Served by GitHub Pages at /blog/<slug> directly, with no redirect to a trailing slash.
    file: `blog/${post.slug}.html`,
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.subtitle || post.contentPreview || '',
    url: `${SITE_URL}/blog/${post.slug}`,
    lang: spanish ? 'es' : 'en',
    locale: spanish ? 'es_ES' : 'en_US',
    type: 'article',
    publishedTime: post.publishedDate,
    image: image?.url ?? DEFAULT_SHARE_IMAGE,
    imageWidth: image?.width,
    imageHeight: image?.height,
    imageAlt: post.title,
  };
}

/** Copies the site's base index.html with the route's own title, description, image and language. */
export function applyRoute(baseHtml, route) {
  let html = baseHtml;
  const attr = (value) => escapeAttribute(value);
  const setMeta = (pattern, value) => {
    html = html.replace(pattern, (_match, start) => `${start}${attr(value)}`);
  };

  if (route.lang) {
    html = html.replace(/<html lang=".*?">/, () => `<html lang="${attr(route.lang)}">`);
  }
  if (route.siteName) {
    setMeta(/(<meta property="og:site_name" content=")[^"]*/, route.siteName);
  }
  if (route.image) {
    html = html.replace(/(<meta (?:property="og|name="twitter):image" content=")[^"]*/g, (_m, start) => `${start}${attr(route.image)}`);
  }
  if (route.icon) {
    // Drops the site's favicons and manifest and puts the route's icon in their place.
    html = html.replace(/\s*<link rel="(?:icon|apple-touch-icon|manifest)"[^>]*>/g, '');
    html = html.replace(
      '<meta charset="UTF-8" />',
      () => `<meta charset="UTF-8" />\n    <link rel="icon" type="${attr(route.iconType ?? 'image/svg+xml')}" href="${attr(route.icon)}" />`,
    );
  }
  if (route.localFonts) {
    html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, '');
  }

  html = html.replace(/<title>.*?<\/title>/, () => `<title>${attr(route.title)}</title>`);
  setMeta(/(<meta name="description" content=")[^"]*/, route.description);
  setMeta(/(<meta property="og:title" content=")[^"]*/, route.title);
  setMeta(/(<meta property="og:description" content=")[^"]*/, route.description);
  setMeta(/(<meta property="og:url" content=")[^"]*/, route.url);
  setMeta(/(<meta name="twitter:title" content=")[^"]*/, route.title);
  setMeta(/(<meta name="twitter:description" content=")[^"]*/, route.description);
  if (route.type) {
    setMeta(/(<meta property="og:type" content=")[^"]*/, route.type);
  }

  // Tags the base page doesn't have, added after og:type when the route knows them.
  const extra = [
    route.locale && `<meta property="og:locale" content="${attr(route.locale)}" />`,
    route.imageWidth && `<meta property="og:image:width" content="${attr(route.imageWidth)}" />`,
    route.imageHeight && `<meta property="og:image:height" content="${attr(route.imageHeight)}" />`,
    route.imageAlt && `<meta property="og:image:alt" content="${attr(route.imageAlt)}" />`,
    route.imageAlt && `<meta name="twitter:image:alt" content="${attr(route.imageAlt)}" />`,
    route.publishedTime && `<meta property="article:published_time" content="${attr(route.publishedTime)}" />`,
  ].filter(Boolean);
  if (extra.length) {
    html = html.replace(/(<meta property="og:type" content="[^"]*" \/>)/, (tag) => [tag, ...extra].join('\n    '));
  }

  return html;
}
