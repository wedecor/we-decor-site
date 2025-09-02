/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  eslint: { ignoreDuringBuilds: true }, // unblock prod build
  typescript: { ignoreBuildErrors: false },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dux3m2saz/**' },
      { protocol: 'https', hostname: 'wedecorevents.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.wedecorevents.com', pathname: '/**' }
    ],
  },
  experimental: {
    instrumentationHook: true,
    mdxRs: true,
  },
  webpack: (config, { isServer }) => {
    // Exclude scripts directory from webpack compilation
    config.resolve.alias = {
      ...config.resolve.alias,
      'scripts': false,
    };
    
    // Exclude MDX files from Sentry wrapping
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.mdx$/,
        use: {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
          },
        },
      });
    }
    
    return config;
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  async redirects() {
    const redirects = [
      // Force www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'wedecorevents.com' }],
        destination: 'https://www.wedecorevents.com/:path*',
        permanent: true,
      },
      // Force prod domain (no vercel preview in index)
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(.*)vercel\\.app' }],
        destination: 'https://www.wedecorevents.com/:path*',
        permanent: true,
      },
      {
        source: '/api/sitemap.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];

    // Add redirects for mixed routing cleanup
    if (process.env.NODE_ENV === 'production') {
      redirects.push(
        // Redirect old pages to new App Router pages
        {
          source: '/pages/:path*',
          destination: '/:path*',
          permanent: true,
        }
      );
    }
    
    return redirects;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(.*)vercel\\.app' }],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: "/(sitemap\\.xml|api/sitemap\\.xml)",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }]
      },
    ];
  },
};

module.exports = nextConfig;


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: "we-decor",
    project: "javascript-nextjs",

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Exclude MDX files from Sentry wrapping
    excludeServerRoutes: [/\.mdx$/],
    excludeClientRoutes: [/\.mdx$/],
  }
);
