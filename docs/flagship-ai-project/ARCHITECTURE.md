# 🚀 Flagship AI Project: Architect Design

## **Project Name: "CodeReview AI" (Working Title)**

### **1. Executive Summary**
A developer tool that acts as an automated, AI-powered Senior Engineer. It reviews GitHub Pull Requests, detects potential bugs, suggests architectural improvements, and ensures coding standards are met, all directly within the GitHub UI via webhooks.

### **2. Why this project?**
Recruiters and engineering managers look for:
- Integration with real-world developer workflows (GitHub, CI/CD).
- Complex backend orchestration (Webhooks, Async processing).
- Practical application of LLMs (not just a chatbot).
- Clean, maintainable architecture.

---

## **3. Architecture Overview**

### **Frontend (Dashboard)**
- **Tech:** Next.js (React), Tailwind CSS, TypeScript.
- **Purpose:** 
  - OAuth login via GitHub.
  - Dashboard to view review history, configure rules (e.g., "Enforce strict TypeScript", "Check for SQL injection").
  - Analytics on repository code quality over time.

### **Backend (API & Webhook Handler)**
- **Tech:** FastAPI (Python), Celery/Redis (Task Queue).
- **Purpose:** 
  - Receive GitHub Webhook events (`pull_request.opened`, `pull_request.synchronize`).
  - Fetch diffs using GitHub REST API.
  - Queue the review task so the webhook responds immediately (200 OK).

### **AI Processing Layer**
- **Tech:** LangChain / LlamaIndex + Google Gemini Pro.
- **Purpose:** 
  - Parse the diff, map it to the repository context.
  - Prompt: *"Act as a Senior Staff Engineer. Review the following code diff. Point out bugs, security flaws, and performance issues. Be concise."*
  - Format output as line-specific comments.

### **Integration Layer**
- **Tech:** GitHub Apps API / Octokit.
- **Purpose:** Post line-specific comments on the PR and submit a final Review (Approve, Request Changes, Comment).

---

## **4. Data Flow (Step-by-Step)**

1. **Trigger:** Developer opens a PR on GitHub.
2. **Webhook:** GitHub sends a POST request to FastAPI endpoint.
3. **Queue:** FastAPI pushes the PR data to a Redis queue and returns `200 OK` to GitHub.
4. **Worker:** Celery worker picks up the task, fetches the PR diff from GitHub.
5. **AI Evaluation:** Diff is parsed, chunked, and sent to Gemini API with specific engineering prompts.
6. **Response:** Gemini returns structured JSON containing line numbers and review comments.
7. **Action:** Worker uses GitHub API to post the comments back to the PR.

---

## **5. Database Schema (PostgreSQL)**
- `users`: id, github_id, email, access_token.
- `repositories`: id, user_id, repo_name, installation_id, settings (JSON).
- `reviews`: id, repo_id, pr_number, status, summary, created_at.

---

## **6. How to Build It (Milestones)**
- **Milestone 1:** Setup basic FastAPI server to receive and log GitHub webhooks.
- **Milestone 2:** Implement the GitHub API integration to fetch diffs and post static comments.
- **Milestone 3:** Integrate the Gemini API to generate dynamic comments based on the diff.
- **Milestone 4:** Add asynchronous task queuing (Celery/Redis) to handle large PRs without timeouts.
- **Milestone 5:** Build the Next.js frontend for configuration and OAuth.
