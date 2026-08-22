# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability or potential security concern affecting the **Sahaya Savari F Portfolio** (`sahayasavari.me`) or its repository, please report it privately.

Please send security reports via email to:
**[contact@sahayasavari.me](mailto:contact@sahayasavari.me)**

### What to Include
When reporting a security issue, please include:
- A description of the vulnerability and its potential security impact.
- Steps to reproduce the issue (proof-of-concept code, URL endpoints, or headers).
- Any relevant details regarding affected browsers or configurations.

### Response & Remediation
Reports will be reviewed as soon as reasonably possible. If a vulnerability is confirmed, remediation and deployment of a fix will be prioritized based on the severity and operational impact of the issue.

---

## Security Architecture Overview

The portfolio application incorporates security best practices across client-side code and hosting infrastructure:

- **HTTPS Enforcement**: Global HTTP Strict Transport Security (`Strict-Transport-Security: max-age=31536000; includeSubDomains`).
- **Content-Security-Policy (CSP)**: CSP configured in `firebase.json` restricting script execution, style loading, worker threads, and network connections to allowed origins.
- **Browser Protection Headers**:
  - `X-Content-Type-Options: nosniff` (Prevents MIME-type sniffing)
  - `X-Frame-Options: DENY` (Prevents clickjacking and framing attacks)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), microphone=(), camera=()`
- **No Secret Exposure**: The repository contains zero hardcoded API keys, database credentials, server secrets, or private tokens. All static assets and pre-rendered HTML files are public data.

---

## Scope

This security policy applies to:
- The production website hosted at [https://sahayasavari.me](https://sahayasavari.me)
- Frontend application source code in the public [sahaya-savari/portfolio](https://github.com/sahaya-savari/portfolio) repository

Third-party dependencies, open-source libraries, and external hosting platforms (Firebase Hosting) are managed by their respective maintainers.
