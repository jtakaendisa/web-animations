'use client';

import dynamic from 'next/dynamic';

// Split GSAP runtimes out of the main bundle and ensure client-only execution
const GSAP = dynamic(() => import('./index').then((m) => m.GSAP), { ssr: false });

const ScrollTrigger = dynamic(
  () => import('./scroll-trigger').then((m) => m.GSAPScrollTrigger),
  { ssr: false }
);

const SplitText = dynamic(() => import('./split-text').then((m) => m.GSAPSplitText), {
  ssr: false,
});

const ScrollToPlugin = dynamic(
  () => import('./scroll-to-plugin').then((m) => m.GSAPScrollToPlugin),
  { ssr: false }
);

const CustomEase = dynamic(
  () => import('./custom-ease').then((m) => m.GSAPCustomEase),
  { ssr: false }
);

export function GSAPRuntime() {
  return (
    <>
      <GSAP />
      <ScrollTrigger />
      <SplitText />
      <ScrollToPlugin />
      <CustomEase />
    </>
  );
}
