import fs from 'fs';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';

export async function getBase64(imagePath: string) {
  const absolutePath = path.join(process.cwd(), 'public', imagePath);
  const buffer = fs.readFileSync(absolutePath);

  const { base64, metadata } = await getPlaiceholder(buffer);

  return {
    base64,
    img: {
      width: metadata.width,
      height: metadata.height,
    },
  };
}
