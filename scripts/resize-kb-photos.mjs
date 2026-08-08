import sharp from "sharp";

const jobs = [
  ["kuvia/DSC01098_DxO.jpg", "public/images/photos/kb-keha.jpg"],
  ["kuvia/DSC01053_DxO.jpg", "public/images/photos/kb-sparri.jpg"],
  ["kuvia/DSC01057_DxO.jpg", "public/images/photos/kb-sparri2.jpg"],
  ["kuvia/DSC01075_DxO.jpg", "public/images/photos/kb-junnut.jpg"],
  ["kuvia/DSC01099_DxO.jpg", "public/images/photos/kb-keha2.jpg"],
];

const { statSync } = await import("node:fs");
for (const [src, out] of jobs) {
  await sharp(src).resize({ width: 2000 }).jpeg({ quality: 80 }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(out, `${m.width}x${m.height}`, `${Math.round(statSync(out).size / 1024)} kB`);
}
