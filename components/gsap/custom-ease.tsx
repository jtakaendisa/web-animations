import gsap from 'gsap';
import { CustomEase } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

export const GSAPCustomEase = () => {
  // For 003--radial-focus
  CustomEase.create(
    'hop',
    'M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1'
  );

  return null;
};

export { CustomEase };
