/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js requires 'unsafe-eval' for webpack in dev, and 'unsafe-inline' for styles
              // In production, Next.js optimizes and doesn't need 'unsafe-eval', but CSP is set at build time
              // EmailJS CDN is required for the contact form
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.emailjs.com",
              // Tailwind requires 'unsafe-inline' for dynamic styles
              "style-src 'self' 'unsafe-inline'",
              // Allow images from any HTTPS source (for portfolio images)
              "img-src 'self' data: https: blob:",
              // Fonts from self and data URIs
              "font-src 'self' data:",
              // EmailJS API endpoints for contact form
              "connect-src 'self' https://api.emailjs.com https://*.emailjs.com",
              // Calendly for scheduling
              "frame-src 'self' https://calendly.com",
              // Block plugins
              "object-src 'none'",
              // Restrict base tag
              "base-uri 'self'",
              // Form submissions only to self
              "form-action 'self'",
              // Prevent framing (also covered by X-Frame-Options)
              "frame-ancestors 'none'",
              // Upgrade HTTP to HTTPS
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },
  
  // Image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
