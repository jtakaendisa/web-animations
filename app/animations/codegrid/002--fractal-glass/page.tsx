'use client';

import { useLayoutEffect, useRef } from 'react';
import { Manrope } from 'next/font/google';
import Image from 'next/image';
import * as THREE from 'three';

import vertexShader from './_shaders/vertex.glsl';
import fragmentShader from './_shaders/fragment.glsl';
import Image1 from './_images/image1.webp';

import styles from './page.module.scss';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const config = {
  lerpFactor: 0.035,
  parallaxStrength: 0.1,
  distortionMultiplier: 10,
  glassStrength: 2.0,
  glassSmooothness: 0.0001,
  stripesFrequency: 35,
  edgePadding: 0.1,
};

const FractalGlassPage = () => {
  const heroElRef = useRef<HTMLDivElement | null>(null);
  const imageElRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const heroEl = heroElRef.current;
    const imageEl = imageElRef.current;

    if (typeof window === 'undefined' || !heroEl || !imageEl) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroEl.appendChild(renderer.domElement);

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const textureSize = { x: 1, y: 1 };

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTextureSize: {
          value: new THREE.Vector2(textureSize.x, textureSize.y),
        },
        uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        uStripesFrequency: { value: config.stripesFrequency },
        uGlassSmoothness: { value: config.glassSmooothness },
        uEdgePadding: { value: config.edgePadding },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const loadImage = () => {
      const texture = new THREE.Texture(imageEl);
      textureSize.x = imageEl.naturalWidth || imageEl.width;
      textureSize.y = imageEl.naturalHeight || imageEl.height;

      texture.needsUpdate = true;
      material.uniforms.uTexture.value = texture;
      material.uniforms.uTextureSize.value.set(textureSize.x, textureSize.y);
    };

    if (imageEl.complete) {
      loadImage();
    } else {
      imageEl.onload = loadImage;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1 - e.clientY / window.innerHeight;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x = lerp(mouse.x, targetMouse.x, config.lerpFactor);
      mouse.y = lerp(mouse.y, targetMouse.y, config.lerpFactor);
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className={`${manrope.variable} ${styles.fractalGlassPage}`}>
      <section ref={heroElRef} className={styles.hero}>
        <Image ref={imageElRef} src={Image1} alt="hero image" />

        <div className={styles.heroContent}>
          <h1>Designed for the space between silence and noise.</h1>
          <p>Developed by Jimmy</p>
        </div>
      </section>
    </main>
  );
};

export default FractalGlassPage;
