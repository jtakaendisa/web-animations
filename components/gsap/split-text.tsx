import gsap from 'gsap';
import { SplitText } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

export function GSAPSplitText() {
  return null;
}

export { SplitText };
