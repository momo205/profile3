# Security Documentation

This document outlines the security model, practices, and limitations for this Next.js portfolio website.

## Security Model

This is a **static portfolio website** with client-side functionality. The site does not have a custom backend and operates entirely in the browser.

### What This Means

- **No server-side secrets**: All code runs in the browser and can be inspected by users
- **Public environment variables**: `NEXT_PUBLIC_*` variables are intentionally public and safe to expose
- **Client-side only**: No database, no server-side API routes, no serverless functions

## What is Considered a Secret?

### ❌ SECRETS (Never commit or expose):

- Private API keys (e.g., `sk_...`, `pk_...`)
- Database connection strings
- OAuth client secrets
- Private keys (SSH, SSL certificates)
- Passwords or authentication tokens
- AWS/Azure/GCP private keys
- Any value that grants privileged access or can be used to modify data

### ✅ PUBLIC (Safe to expose):

- `NEXT_PUBLIC_*` environment variables (by design)
- EmailJS public keys (intended for client-side use)
- Public API endpoints
- Client-side configuration
- Third-party service public keys (e.g., Google Maps API key with restrictions)

## Current Public Variables

The following `NEXT_PUBLIC_*` variables are used and are **intentionally public**:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - EmailJS service identifier (public)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - EmailJS template identifier (public)
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - EmailJS public key (designed for client-side use)

**These are safe to expose** because:
- EmailJS public keys are designed for client-side use
- They only allow sending emails through your configured template
- They cannot access your EmailJS account or modify settings
- Rate limiting is handled by EmailJS

## Security Features

### 1. Security Headers

The site implements comprehensive security headers via `next.config.mjs`:

- **Content-Security-Policy (CSP)**: Restricts resource loading to prevent XSS
- **Strict-Transport-Security (HSTS)**: Forces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Disables unnecessary browser APIs

### 2. Contact Form Protection

The contact form implements multiple layers of client-side protection:

- **Honeypot field**: Hidden field that blocks bots if filled
- **Rate limiting**: Maximum 3 submissions per 10 minutes (localStorage-based)
- **Spam detection**: Blocks messages with excessive links (>3)
- **Input validation**: Client-side validation for all fields
- **Generic error messages**: Does not leak system details

**Limitations**: Client-side protection can be bypassed by determined attackers. For production use, consider:
- Cloudflare Turnstile (client-side bot detection)
- Server-side rate limiting (requires backend)
- EmailJS rate limiting (configured in EmailJS dashboard)

### 3. Secret Scanning

A pre-build script (`npm run security:scan`) scans the codebase for potential secrets:

- Runs automatically before builds
- Scans for common secret patterns
- Ignores known-safe patterns (NEXT_PUBLIC_*)
- Fails the build if secrets are detected

### 4. Code Security

- **React Strict Mode**: Enabled for additional safety checks
- **TypeScript**: Strict type checking enabled
- **No `dangerouslySetInnerHTML`**: Prevents XSS vulnerabilities
- **Input sanitization**: All user inputs are validated and trimmed
- **No source maps in production**: Prevents source code exposure

## Content Security Policy (CSP)

The CSP is configured to allow:

- **Scripts**: Self, EmailJS CDN (for contact form)
- **Styles**: Self, inline styles (required for Tailwind)
- **Images**: Self, data URIs, HTTPS sources
- **Connections**: Self, EmailJS API endpoints
- **Frames**: Self, Calendly (for scheduling)

If you add new third-party services, update the CSP in `next.config.mjs`.

## Dependency Security

### Regular Maintenance

1. **Check for vulnerabilities**:
   ```bash
   npm audit
   ```

2. **Update dependencies**:
   ```bash
   npm update
   ```

3. **Review security advisories**:
   - Check npm security advisories
   - Monitor GitHub security alerts (if repo is public)

### Lockfile Enforcement

- `package-lock.json` is committed to ensure consistent installs
- Never commit `node_modules/`
- Use `npm ci` in production for reproducible builds

## Environment Variables

### Development

Create `.env.local` (not committed to git):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Production

Add the same variables in your hosting platform:
- **Vercel**: Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **Other platforms**: Check their documentation

### Rotation

If you need to rotate EmailJS keys:

1. Generate new keys in EmailJS dashboard
2. Update environment variables
3. Redeploy the site
4. Old keys will stop working (EmailJS handles this)

## Known Limitations

### Client-Side Security

- **Rate limiting**: Client-side only, can be bypassed
- **Spam protection**: Basic heuristics, not foolproof
- **No server-side validation**: All validation happens in browser
- **Public keys**: All keys are visible in client bundle

### Recommendations for Production

1. **Monitor EmailJS usage**: Check EmailJS dashboard for unusual activity
2. **Set EmailJS rate limits**: Configure limits in EmailJS dashboard
3. **Consider Cloudflare Turnstile**: Add client-side bot detection
4. **Monitor form submissions**: Watch for spam patterns
5. **Regular security audits**: Run `npm audit` regularly

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not** open a public issue
2. Contact the site owner directly
3. Provide details of the vulnerability
4. Allow reasonable time for fixes before disclosure

## Security Checklist

Before deploying:

- [ ] Run `npm run security:scan` (runs automatically on build)
- [ ] Verify no secrets in client bundle (check `.next/static`)
- [ ] Test CSP doesn't break functionality
- [ ] Verify security headers are present (use browser dev tools)
- [ ] Check `npm audit` for vulnerabilities
- [ ] Verify environment variables are set correctly
- [ ] Test contact form with rate limiting
- [ ] Verify honeypot field works

## Additional Resources

- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [EmailJS Security](https://www.emailjs.com/docs/security/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**Last Updated**: 2025-01-XX
**Maintained By**: Site Owner

