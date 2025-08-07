import Image, { ImageProps } from 'next/image';
import { getBase64 } from '@/lib/getBase64';

type CustomImageProps = Omit<ImageProps, 'placeholder' | 'blurDataURL'> & {
  src: string; // path relative to public folder, e.g., "images/example.jpg"
};

export default async function CustomImage({ src, ...props }: CustomImageProps) {
  const { base64 } = await getBase64(src);

  return (
    <Image
      src={src}
      placeholder="blur"
      blurDataURL={base64}
      {...props} // user defines width, height, fill, etc.
    />
  );
}
