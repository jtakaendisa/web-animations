import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export function GSAPuseGSAP() {
  return null;
}

export { useGSAP };
