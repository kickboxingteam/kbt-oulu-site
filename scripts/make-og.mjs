import sharp from "sharp";

const src = "public/images/hero-bg.jpg";
const out = "public/images/og.jpg";

const meta = await sharp(src).metadata();
console.log("source:", meta.width, "x", meta.height);

await sharp(src)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82 })
  .toFile(out);

const outMeta = await sharp(out).metadata();
console.log("og:", outMeta.width, "x", outMeta.height, `${Math.round((await import("node:fs")).statSync(out).size / 1024)} kB`);
