import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export const GSAPScrollToPlugin = () => {
  return null;
};

export { ScrollToPlugin };
