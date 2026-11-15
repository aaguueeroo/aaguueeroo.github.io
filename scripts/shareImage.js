// A light copy of a cover for link previews. WhatsApp leaves the image out of a preview when the file
// is larger than about 300 KB, and the covers that come from Notion are often several megabytes.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const MAX_SHARE_IMAGE_BYTES = 300 * 1024;
export const MAX_SHARE_IMAGE_WIDTH = 1200;

/** Writes a JPEG of the image at `sourcePath` to `outputPath`, as light as needed, and returns its size. */
export async function makeShareImage(sourcePath, outputPath) {
  const qualities = [82, 72, 62, 52, 42];
  let result;
  for (const quality of qualities) {
    result = await sharp(sourcePath)
      .rotate()
      .resize({ width: MAX_SHARE_IMAGE_WIDTH, withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });
    if (result.data.length <= MAX_SHARE_IMAGE_BYTES) break;
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.data);
  return { width: result.info.width, height: result.info.height, bytes: result.data.length };
}
