import sharp from "sharp";

const jobs = [
  ["kuvia/DSC01252_DxO.jpg", "public/images/photos/bjj-heitto.jpg"],
  ["kuvia/DSC01277_DxO.jpg", "public/images/photos/bjj-matto.jpg"],
  ["kuvia/DSC01314_DxO.jpg", "public/images/photos/bjj-valmennus.jpg"],
  ["kuvia/DSC01344_DxO.jpg", "public/images/photos/bjj-kaato.jpg"],
  ["kuvia/DSC01467_DxO.jpg", "public/images/photos/bjj-ryhma.jpg"],
  ["kuvia/DSC01495_DxO.jpg", "public/images/photos/sw-nogi.jpg"],
  ["kuvia/DSC01547_DxO.jpg", "public/images/photos/kb-opetus.jpg"],
];

const { statSync } = await import("node:fs");
for (const [src, out] of jobs) {
  await sharp(src).resize({ width: 2000 }).jpeg({ quality: 80 }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(out, `${m.width}x${m.height}`, `${Math.round(statSync(out).size / 1024)} kB`);
}
