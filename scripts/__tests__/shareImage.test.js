// @vitest-environment node
import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, describe, expect, it } from "vitest";
import { makeShareImage, MAX_SHARE_IMAGE_BYTES } from "../shareImage.js";
import { imageSize } from "../shareTags.js";

const root = path.resolve(__dirname, "../..");
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "share-image-"));
afterAll(() => fs.rmSync(outDir, { recursive: true, force: true }));

describe("makeShareImage", () => {
  it("turns a heavy cover into a JPEG light enough for WhatsApp", async () => {
    const source = path.join(root, "public/blog-images/flatto-learning-in-public-1-cover.png");
    expect(fs.statSync(source).size).toBeGreaterThan(2 * 1024 * 1024);
    const output = path.join(outDir, "flatto-share.jpg");

    const result = await makeShareImage(source, output);

    expect(result.bytes).toBeLessThanOrEqual(MAX_SHARE_IMAGE_BYTES);
    expect(fs.statSync(output).size).toBe(result.bytes);
    expect(imageSize(output)).toEqual({ width: 1200, height: result.height });
    expect(result.height).toBe(Math.round((1024 / 1532) * 1200));
  });

  it("never enlarges a small image", async () => {
    const output = path.join(outDir, "icon-share.jpg");
    const result = await makeShareImage(path.join(root, "public/apple-touch-icon.png"), output);
    expect(result).toMatchObject({ width: 180, height: 180 });
  });
});
