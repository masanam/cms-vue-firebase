import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { lazyload, placeholder } from '@cloudinary/vue';

export default function useCloudinary() {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dg3ef3wmd',
    },
  });

  const plugins = [lazyload(), placeholder()];

  const createImageInstance = (publicId: string): CloudinaryImage => {
    const image = cloudinary.image(publicId);
    image.format('auto');
    return image;
  };

  return {
    createImageInstance,
    cloudinary,
    plugins,
  };
}
