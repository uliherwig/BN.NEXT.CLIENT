import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
    extension: /\.(md|mdx)?$/,
    options: {
      // Any additional MDX options can be added here
    },
  })

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

// Compose the plugins together
const composedConfig = withNextIntl(withMDX(nextConfig));

export default composedConfig;