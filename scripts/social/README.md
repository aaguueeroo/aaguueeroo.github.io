# Social link previews

## Flatto

`public/flatto/images/flatto-share-v1.jpg` is the 1200 × 630 card for `/flatto/`. The same image
serves X, unlike Chotos. Its editable source is `scripts/social/flatto-share.html`, which uses
relative paths, so it opens straight from disk. Capture it at exactly 1200 × 630 with
`--allow-file-access-from-files` so its local fonts load, export a JPEG and use a new versioned
filename for any future change, then update `meta.shareImage` in
`src/pages/flatto/landing/content/landingContent.ts`.

`src/assets/images/portfolio/flatto-thumbnail.jpg` is the 1200 × 770 thumbnail for the Flatto card
on `/portfolio`, which shows it at 312 × 200 on desktop. Its editable source is
`scripts/social/flatto-portfolio-thumbnail.html`, built from the landing page's screens, so refresh
it when they change. The card crops it with `object-fit: cover` at other widths, so keep the main
phone in the centre and tangerine around the phones: the screens are cream and the card is white.
Leave text out, because the card's title and description sit right below it. Capture it the same
way, then export a JPEG at quality 80. Vite hashes the filename, so it doesn't need a version.

## Chotos

The landing page uses a dedicated composition rather than its app icon or a full hero screenshot.
The brand, three-line headline and a labelled app mockup stay recognizable at chat-card sizes.
The headline is embedded in the JPEG so it remains present even when a platform omits descriptions.

## Exports

- `public/chotos/images/chotos-compartir-v1.jpg`: 1200 × 630, Open Graph default.
- `public/chotos/images/chotos-compartir-x-v1.jpg`: 1200 × 600, separate X large card.
- Editable source: `scripts/social/chotos-share.html`, using the app's existing fonts and mockup.

Serve the repository root locally, open `/scripts/social/chotos-share.html`, wait until its local
fonts and two images are loaded, and capture the viewport at exactly the dimensions above.
The 600px-height media query adapts the composition for X. Export JPEG, verify actual pixel
size, and inspect both images before replacing them. Use a new versioned filename for future
image changes and update the static metadata in `public/chotos/index.html`. No runtime image
service, JavaScript metadata injection or new dependency is involved.

## Platform research — checked 1 November 2026

- LinkedIn: its sharing module documents minimum 1200 × 627, recommended 1.91:1, maximum
  5 MB. Our 1200 × 630 JPEG is a compatible landscape choice. Source:
  https://www.linkedin.com/help/linkedin/answer/a521928/image-specifications-for-your-linkedin-pages-and-career-page
- Facebook / Messenger: use the standard Open Graph image with explicit width, height, MIME
  type, HTTPS URL and image description. 1200 × 630 is our compatibility target, not a claim
  about every Facebook placement. Meta's current image/webmaster docs returned HTTP 429 during
  research, so current platform-specific limits could not be independently confirmed:
  https://developers.facebook.com/docs/sharing/webmasters/images/
- WhatsApp: use the same lightweight Open Graph JPEG and early, server-delivered head tags.
  No separate WhatsApp-only image tag is introduced. Current developer specifications were
  inaccessible (HTTP 429), so we do not claim a verified universal image-size limit. WhatsApp
  documents that senders may disable previews entirely:
  https://faq.whatsapp.com/445453537819972/?cms_platform=iphone
- X: explicitly select `summary_large_image`, with a separate 2:1, 1200 × 600 JPEG plus
  title, description and alt text. This is a compatibility design choice based on the historical
  card format. The formerly official specification URL now redirects to a generic documentation
  overview; its historical numeric limits cannot be represented as verified current requirements:
  https://developer.x.com/en/docs/x-for-websites/cards/overview/summary-card-with-large-image
- Telegram: uses website previews with title, description and media. Senders can select large
  or small media. No fixed image dimensions are published in the cited announcement; use the
  landscape Open Graph default and don't promise identical rendering on every client:
  https://telegram.org/blog/reply-revolution
- Apple Messages / rich links: Apple's metadata framework retrieves titles, icons and images.
  The cited source does not prescribe a universal card image size; use the public JPEG metadata:
  https://developer.apple.com/documentation/linkpresentation
- Instagram: link cards, feed uploads and Story artwork are different surfaces. This change
  supplies the website's link-preview metadata; it does not create or publish Instagram posts
  or claim that an external URL will automatically become a feed/Story image. Attempts to access
  current official Instagram guidance did not yield an accessible specification. A separate
  portrait composition would be needed for a future Story or feed campaign.

Open Graph's primary specification defines image type, width, height, secure URL and alt text:
https://ogp.me/#structured

## Verification and cache limitations

Check the raw published HTML, not only a browser DOM: crawlers must get these tags without JS.
Both JPEG URLs must return HTTP 200 with image/jpeg and match the declared sizes. Inspect small
card rendering as well as full resolution. Keep filenames versioned to avoid reusing the old icon
asset's cache. Metadata changes cannot replace images already embedded in sent messages.
Facebook Sharing Debugger and LinkedIn Post Inspector can request a re-scrape where available;
other apps control their own caches. Actual private social posts/messages are not sent by this
workflow and platform rendering is not claimed as tested without an observed result.
