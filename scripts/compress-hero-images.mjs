import sharp from 'sharp';
import { statSync, writeFileSync, renameSync } from 'node:fs';

const files = [
  'public/assets/img/slider/Businees.jpg',
  'public/assets/img/slider/financilabuilding.jpg',
];

for (const file of files) {
  const before = statSync(file).size;
  const buffer = await sharp(file)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();

  if (buffer.length >= before) {
    throw new Error(`${file}: compressed size not smaller than original`);
  }

  const tmpFile = `${file}.tmp`;
  writeFileSync(tmpFile, buffer);
  renameSync(tmpFile, file);
  const after = statSync(file).size;
  console.log(
    `${file}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
  );
}
