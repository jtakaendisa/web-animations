import type { Metadata } from 'next';

import { Lenis } from '../components/lenis';
import { GSAPRuntime } from '../components/gsap/runtime';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Web Animations',
  description: 'Just me trying to replicate some Awwwards-winning web animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Lenis root options={{}} />
        <GSAPRuntime />
      </body>
    </html>
  );
}
