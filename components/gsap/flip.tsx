import gsap from 'gsap';
import { Flip } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export const GSAPFlip = () => {
  return null;
};

export { Flip };
