import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src')
    };

    // Needed to make polling for file changes work if in development mode and Docker
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.IS_DOCKER === 'true'
    ) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300 // Delay before rebuilding
      };
    }

    return config;
  }
};

export default nextConfig;
