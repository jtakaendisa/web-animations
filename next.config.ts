import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.glsl': { loaders: ['raw-loader'], as: '*.js' },
      '*.frag': { loaders: ['raw-loader'], as: '*.js' },
      '*.vert': { loaders: ['raw-loader'], as: '*.js' },
    },
    resolveExtensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.glsl',
      '.frag',
      '.vert',
    ],
  },
};

export default nextConfig;
