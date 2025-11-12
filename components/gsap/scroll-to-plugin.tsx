import gsap from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export const GSAPScrollToPlugin = () => {
  return null;
};

export { ScrollToPlugin };
