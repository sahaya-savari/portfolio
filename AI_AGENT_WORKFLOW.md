# AI_AGENT_WORKFLOW.md — AI Agent Standard Operating Procedure

> **Internal Master Operational Workflow Document**  
> This file defines the **standard operating procedure and execution lifecycle** that **Antigravity** and any future AI coding agents MUST follow when working on the **Sahaya Savari F production portfolio** repository (`sahayasavari.me`).

---

## 4-File Documentation Structure Baseline

```text
portfolio/
├── AI_PROJECT_CONTEXT.md   # WHAT the project is (Architecture, Infrastructure, Baseline Facts)
├── AI_AGENT_WORKFLOW.md    # HOW AI agents must work (THIS FILE — Execution Lifecycle & Rules)
├── PROJECT.md              # System context reference & technical development documentation
└── README.md               # Public GitHub repository documentation
```

---

## Standard Execution Lifecycle

```text
USER REQUEST
    ↓
READ CONTEXT (AI_PROJECT_CONTEXT.md & AI_AGENT_WORKFLOW.md)
    ↓
INSPECT REPOSITORY (Verify actual source files before assuming)
    ↓
UNDERSTAND IMPACT (Identify scope, affected files & risks)
    ↓
PLAN (Formulate targeted implementation plan)
    ↓
ASK CLARIFICATION IF NEEDED (Stop if ambiguous or destructive)
    ↓
IMPLEMENT MINIMAL CHANGE (Targeted 1–3 files, no unnecessary refactoring)
    ↓
VERIFY (Check syntax, logic, and runtime conditions)
    ↓
BUILD (Run npm run build for production source changes)
    ↓
REVIEW DIFF (git status, git diff, git diff --check)
    ↓
TEST GENERATED OUTPUT (Inspect dist/index.html, dist/sitemap.xml, dist/robots.txt)
    ↓
COMMIT (Use clear conventional commit message)
    ↓
PUSH (Push to origin/main when verified)
    ↓
DEPLOY ONLY WHEN REQUIRED (npx firebase deploy --only hosting)
    ↓
VERIFY PRODUCTION (Test HTTP status & live endpoints)
    ↓
DOCUMENT (Update AI_PROJECT_CONTEXT.md if architecture changes)
    ↓
FINAL REPORT (Structured report: What Changed, Verification, Git, Firebase)
```

---

## 1. Start Every Task

Before taking any action or editing any file:

1. **Read `AI_PROJECT_CONTEXT.md` completely** to understand the project architecture and non-negotiable rules.
2. **Read `AI_AGENT_WORKFLOW.md`** to confirm standard operational rules.
3. **Inspect current Git state**:
   ```bash
   git status
   ```
4. **Inspect current branch**:
   ```bash
   git branch --show-current
   ```
5. **Inspect recent commit history**:
   ```bash
   git log --oneline --decorate -10
   ```
6. **Determine whether the working tree is clean**.

> [!IMPORTANT]  
> **Working Tree Safety**: Never assume the repository working tree is clean. If existing uncommitted user changes are detected:
> - Do NOT overwrite them.
> - Do NOT reset them (`git reset --hard` / `git checkout .`).
> - Do NOT stash them automatically (`git stash`).
> - Do NOT include them in a commit unless explicitly requested by the user.

---

## 2. Understand the User Request

Before modifying any source files, analyze the request to determine:
- What exact problem or capability is requested?
- Which files and components are affected?
- Is this a bug fix, feature addition, optimization, documentation update, SEO adjustment, infrastructure task, or deployment?
- Will this change affect production behavior or endpoints?
- Does the request touch external systems (Cloudflare, Namecheap, Firebase Console, GitHub)?

*Do not implement a broader change than what was requested.*

---

## 3. Inspect Before Editing

Always inspect authoritative source files in the repository before making code changes or assumptions.

- **SEO Task**: Inspect `src/seo.ts`, `src/components/SEOHead.tsx`, `public/robots.txt`, `public/sitemap.xml`, and `scripts/prerender-seo.js`.
- **Routing Task**: Inspect `src/App.tsx`, `src/entry-server.tsx`, `src/pages/`, and `scripts/prerender-seo.js`.
- **Hosting / Security Task**: Inspect `firebase.json` and `.firebaserc`.
- **Build / Performance Task**: Inspect `vite.config.ts`, `package.json`, and manual chunking definitions.

*Never modify code based solely on old conversation logs or speculative assumptions.*

---

## 4. Distinguish Facts from Assumptions

Categorize every statement and claim using these 4 strict levels:
1. **VERIFIED FROM REPOSITORY**: Confirmed by inspecting source code, configuration files, or local build outputs.
2. **VERIFIED FROM LIVE PRODUCTION**: Confirmed by performing live HTTP requests to `https://sahayasavari.me/`.
3. **VERIFIED FROM USER-PROVIDED INFORMATION**: Provided directly by the website owner.
4. **NOT INDEPENDENTLY VERIFIED — MANAGED OUTSIDE THE REPOSITORY**: External portal configurations (Namecheap registrar dashboard, Cloudflare SSL/TLS dashboard settings, Search Console / Bing Webmaster Tools portals).

*Never present an inference or guess as a verified fact.*

---

## 5. Check `AI_PROJECT_CONTEXT.md` Non-Negotiable Constraints

Before making architectural changes, verify that the requested change does NOT violate any documented non-negotiable decision in `AI_PROJECT_CONTEXT.md`:
- Do NOT change the website hosting provider (Firebase Hosting).
- Do NOT change domain DNS records or nameservers without explicit approval.
- Do NOT disable Cloudflare DNS proxying or edge security settings.
- Do NOT restore the archived `/projects/neobeat` route.
- Do NOT alter the canonical domain (`https://sahayasavari.me`).
- Do NOT hardcode secrets, API keys, or private tokens.
- Do NOT introduce duplicate Schema.org JSON-LD nodes.
- Do NOT make speculative SEO changes.

*If a requested change conflicts with a documented decision, STOP and ask the user for confirmation.*

---

## 6. Create an Implementation Plan

For non-trivial tasks, create an implementation plan before making edits:
- **Problem**: What issue is being resolved?
- **Evidence**: What log, error trace, or file view proves it?
- **Files Affected**: Which exact files will be modified?
- **Proposed Changes**: What code modifications will be made?
- **Risks**: What side effects could occur?
- **Verification Plan**: How will the fix be tested?

---

## 7. Ask Clarification Questions When Required

Do **NOT** guess when critical information is missing. Ask the user when:
- Requirements are ambiguous or underspecified.
- Multiple valid architectural choices exist.
- An external dashboard change is required (Cloudflare, Namecheap, Firebase Console).
- Production DNS or hosting settings must be modified.
- Destructive operations are proposed.

*Do not ask unnecessary questions when the repository itself provides a clear, authoritative answer.*

---

## 8. Minimal Implementation Principle

Implement the minimal targeted change required to solve the problem cleanly.

- **Prefer**: 1–3 surgical file edits over broad codebase refactorings.
- **Do NOT**:
  - Refactor unrelated components or utility functions.
  - Rename files or reorder exports unnecessarily.
  - Upgrade dependencies without explicit justification.
  - Redesign UI elements during backend, SEO, or infrastructure tasks.
  - Rewrite working configuration files.

*Preserve existing code conventions, formatting, and single-source-of-truth architectures.*

---

## 9. Protect Secrets & Credentials

Never hardcode, log, or commit sensitive credentials:
- `.env`, `.env.local`, `.env.production`
- API keys, access tokens, service account keys
- Passwords, private certificates, SSH keys
- Firebase credentials, Cloudflare API tokens, Namecheap credentials

Always review `git diff` before staging to verify no secrets exist in the working tree.

---

## 10. Build After Production Source Changes

Whenever production source files (`src/`, `public/`, `firebase.json`, `vite.config.ts`, `scripts/`) are modified, execute the production build pipeline:

```bash
npm run build
```

Under the hood, `npm run build` executes `vite build && node scripts/prerender-seo.js`.

Verify that:
- Build exits with code `0`.
- No compilation errors or broken imports occur.
- Static HTML files are generated for all **9 active routes** in `dist/`.
- Automated `dist/sitemap.xml` is generated cleanly.

---

## 11. Test the Actual Result

Do not stop at "build succeeded." Test the actual feature or modification:
- **SEO Changes**: Inspect generated `<title>`, `<meta description>`, `canonical`, `robots`, and JSON-LD script tags in `dist/index.html`.
- **Routing Changes**: Verify component rendering, direct URL routing, refresh behavior, and static pre-rendering in `dist/<route>/index.html`.
- **UI Changes**: Check desktop and mobile layout rendering, CSS styles, and browser console errors.
- **Data / Schema Changes**: Verify valid JSON-LD graph formatting and property types.

---

## 12. Review Generated Build Output (`dist/`)

Inspect generated files in `dist/` before deployment:
- `dist/index.html`
- `dist/<route>/index.html`
- `dist/sitemap.xml`
- `dist/robots.txt`

*Never assume generated output is correct merely because the build tool exited without errors.*

---

## 13. Git Review Workflow

Before committing changes, execute strict Git validation:

1. **Check status**:
   ```bash
   git status
   ```
2. **Check diff**:
   ```bash
   git diff
   ```
3. **Check whitespace errors**:
   ```bash
   git diff --check
   ```

Confirm that:
- Only intended files are modified.
- No secrets or credentials are staged.
- No temporary build artifacts or scratch files are included.
- No whitespace formatting errors exist.

---

## 14. Git Commit Rules

Use clear, descriptive conventional commit messages:

Examples:
- `feat: add project case study for prep-mind`
- `fix: resolve mobile navigation backdrop blur`
- `fix(seo): correct canonical URL and title tag`
- `perf: optimize HLS video loading strategy`
- `docs: update AI_PROJECT_CONTEXT.md architecture reference`
- `refactor: simplify route metadata definitions`

*Never use vague or meaningless commit messages like `update`, `fix`, `changes`, or `work`.*

---

## 15. Git Push Rules

Before pushing commits to remote:
- Confirm current branch is `main`.
- Confirm remote repository is `origin` (`https://github.com/sahaya-savari/portfolio.git`).
- Verify clean working tree state.
- **Never force push** (`git push --force`) unless explicitly instructed by the user.

---

## 16. Deployment Rules

Deployment is **NOT** automatic for every task.

### Documentation-Only Tasks
*Examples: Editing `README.md`, `AI_PROJECT_CONTEXT.md`, or `AI_AGENT_WORKFLOW.md`*
- **Action**: Commit and push to `origin/main`.
- **Firebase Deployment**: **NOT REQUIRED**.

### Source Code / Configuration Tasks Affecting Production
*Examples: Editing `src/`, `public/`, `firebase.json`, `vite.config.ts`*
- **Action**: Build, test `dist/`, commit, push to `origin/main`, and deploy to Firebase Hosting:
  ```bash
  npx firebase deploy --only hosting
  ```

*Always use the established Firebase project (`my-portfolio-fss`) and target (`sahayasavari`). Never initialize a new Firebase project.*

---

## 17. Production Verification

After executing a production deployment, perform live HTTP verification on production endpoints:
- `https://sahayasavari.me/` (HTTP 200, title, meta description, canonical, Person JSON-LD)
- `https://sahayasavari.me/robots.txt` (HTTP 200, Googlebot & Bingbot allowed)
- `https://sahayasavari.me/sitemap.xml` (HTTP 200, 9 active routes)

*Never claim a deployment is complete until live production endpoint health has been verified.*

---

## 18. SEO / AEO / GEO Execution Guidelines

- **SEO**: Enforce single `<h1>`, clean `<head>` metadata, canonical URLs, and semantic HTML. Avoid keyword stuffing.
- **AEO**: Ensure identity, education, projects, skills, and links are clearly stated in `/llms.txt` and static HTML.
- **GEO**: Build genuine Schema.org entity relationships (`@id: "https://sahayasavari.me/#person"`).
- **Restrictions**:
  - Do NOT create fake backlinks or spam directories.
  - Do NOT add unverified social profiles to `sameAs`.
  - Do NOT claim indexing unless explicitly verified in Search Console or Bing Webmaster Tools.

---

## 19. External Infrastructure Safety Rules

Respect the separation of infrastructure providers:
- **Namecheap**: Domain Registrar (`sahayasavari.me`).
- **Firebase Hosting**: Primary Website Hosting Provider.
- **Cloudflare**: DNS Proxy, SSL/TLS, Cloudflare Insights, Managed Robots signals, Email Routing.

> [!CAUTION]  
> Never modify DNS records, nameservers, Cloudflare proxy status (orange cloud), or email routing rules without explicit user authorization.

---

## 20. Production Safety & Destructive Operations

For high-risk or destructive operations:
- Deleting production routes or project pages
- Changing DNS records or nameservers
- Modifying Firebase hosting targets or project IDs
- Disabling security headers in `firebase.json`
- Rewriting Git commit history (`git rebase` / `git push -f`)

**STOP and request explicit user confirmation before execution.**

---

## 21. Documentation Synchronization

Whenever project architecture, routes, hosting targets, dependencies, or SEO rules change, update [AI_PROJECT_CONTEXT.md](file:///d:/GITHUB/portfolio/AI_PROJECT_CONTEXT.md) in the same task to maintain documentation integrity.

---

## 22. Final Task Report Format

Every completed task must end with a clean, structured completion report:

```markdown
# Task Completed

## What Changed
- ...

## Files Changed
- ...

## Build Status
- PASS / FAIL / NOT REQUIRED

## Git Status
- Commit: <hash>
- Push: origin/main

## Deployment Status
- Deployed / NOT REQUIRED

## Live Production Verification
- PASS / FAIL / NOT REQUIRED

## Categorized Findings
- FIXED: ...
- VERIFIED: ...
- NOT CHANGED: ...
- NOT VERIFIED: ...
```

---

## 23. When to Stop

Stop execution and ask the user for clarification whenever:
- User intent is ambiguous or contradictory.
- Architectural changes are required.
- External portal changes (Cloudflare, Namecheap, Firebase Console) are needed.
- Destructive actions (deleting files, resetting git) are implied.
- Live production verification reveals unexpected endpoint errors.

---

## 24. Document Maintenance

Keep document roles strictly separate:
- **`AI_PROJECT_CONTEXT.md`**: WHAT the project is (Architecture & Baseline Facts).
- **`AI_AGENT_WORKFLOW.md`**: HOW AI agents work (Execution Lifecycle & SOP).
- **`PROJECT.md`**: Technical development & system context reference.
- **`README.md`**: Public GitHub repository documentation.

*Do not merge these files into a single document.*

---

## Final Golden Rule

> **Accuracy > Speed.**  
> **Evidence > Assumptions.**  
> **Minimal Targeted Edits > Unnecessary Refactoring.**  
> **Empirical Runtime Verification > Unverified Claims.**  
> **Explicit User Approval > Destructive Operations.**  
> 
> *Read `AI_PROJECT_CONTEXT.md` before acting. Inspect the repository before editing. Build before deploying. Review diff before committing. Verify live production after deployment.*
