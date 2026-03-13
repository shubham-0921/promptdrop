# PromptDrop — Product Requirements Document

**Version:** 1.0 — Phase 1 MVP  
**Author:** Shubham  
**Date:** March 2026  
**Status:** Draft  
**Platform:** Web (PWA)

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [User Journey](#4-user-journey)
5. [Features & Requirements](#5-features--requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Out of Scope (Phase 1)](#7-out-of-scope-phase-1)
8. [Competitive Landscape](#8-competitive-landscape)
9. [Risks & Mitigations](#9-risks--mitigations)
10. [Phased Roadmap](#10-phased-roadmap)
11. [Open Questions](#11-open-questions)

---

## 1. Product Overview

### 1.1 Problem Statement

AI chatbots like Claude, ChatGPT, and Gemini produce uniquely personal, generative responses — but there is no easy way to turn those responses into a shared social experience. If you want a friend to try the same fun prompt, you have to copy-paste the text, explain how to use it, and hope they bother. The result: a huge amount of delightful, viral-worthy AI content never gets shared.

### 1.2 The Insight

The core insight is the separation of two things that currently require manual effort:

- **Prompt delivery** — getting the exact same prompt into someone else's AI chat with zero friction
- **Result sharing** — aggregating what different people's AIs said back into one place for comparison

Neither exists today as a lightweight, social-first product.

### 1.3 Solution

**PromptDrop** is a web app that lets anyone create a shareable prompt link. When a friend clicks the link, it opens their preferred AI (Claude, ChatGPT, Gemini, etc.) with the prompt pre-loaded and ready to run. After getting their result, they paste it back to a shared results wall — where everyone who took the same prompt can compare their AI's answers side by side.

Think of it as: **Spotify Wrapped cards, but for AI conversations. Created by anyone, shared with everyone.**

### 1.4 Tagline

> *Share a prompt. See what your friends become.*

---

## 2. Goals & Success Metrics

### 2.1 Phase 1 Goals

| Goal | Description |
|---|---|
| Validate virality | Does a prompt link actually get shared and clicked? |
| Test result collection | Will users paste their results back? |
| Measure prompt themes | Which categories (personality, trivia, creative) drive the most engagement? |
| Zero-auth MVP | Can we get traction without requiring sign-up? |

### 2.2 Success Metrics (30 days post-launch)

| Metric | Target |
|---|---|
| Prompt links created | 200+ |
| Unique link clicks | 1,000+ |
| Result submissions per prompt (avg) | 3+ |
| Share rate (results shared to social) | >20% of results |
| D7 retention (prompt creator returns) | >25% |

---

## 3. User Personas

### Persona A — The Prompt Creator ("The Host")

- **Who:** Someone curious, social, loves personality content — could be a college student, a startup person, or a content creator
- **Motivation:** Wants to know what their friend group would be, spark conversation, get reactions
- **Behaviour:** Shares prompts on WhatsApp, Instagram stories, Twitter/X
- **Pain today:** Copy-pasting prompts and chasing friends for their results is too much effort

### Persona B — The Responder ("The Guest")

- **Who:** The friend who received the link
- **Motivation:** Curiosity — wants to see their own AI result and compare with others
- **Behaviour:** Clicks link, runs AI, pastes result back, checks what others got
- **Pain today:** Has to manually find and open an AI tool, figure out what to ask

### Persona C — The Voyeur ("The Lurker")

- **Who:** Someone who sees the results wall linked on social media
- **Motivation:** Entertainment — browsing what others got, no intention to participate
- **Behaviour:** Reads results, maybe shares the wall link
- **Value:** Drives secondary virality and discovery

---

## 4. User Journey

### 4.1 Creator Flow

```
1. Land on PromptDrop homepage
2. Enter a prompt title  (e.g. "Which Jurassic dinosaur would you be?")
3. Paste or write the full prompt text
4. Pick a category/theme (Personality, Creative, Trivia, Wildcard)
5. Click "Create Drop"
6. Get a short shareable link  →  promptdrop.app/d/abc123
7. Share link on WhatsApp / Instagram / Twitter
```

### 4.2 Responder Flow

```
1. Click shared link
2. See the prompt title + description on a landing page
3. Choose their preferred AI  (Claude / ChatGPT / Gemini / Perplexity)
4. Redirect opens chosen AI with prompt pre-filled
5. Run the prompt, read their result
6. Return to PromptDrop  (back button or link in the page)
7. Paste their result into the submission box
8. Optionally add their name/emoji
9. Hit "Add My Result" → result appears on the wall
10. See all other results, share their own card
```

### 4.3 Results Wall (Shared View)

```
1. Anyone with the link can see the results wall
2. Results show as cards: name/emoji + AI used + their result (truncated with expand)
3. Stats shown: "X people tried this • Most common: [outcome]"
4. Each result card has a copy/share button
5. Visitor can click "Try it yourself" to go through the responder flow
```

---

## 5. Features & Requirements

### 5.1 Core Features (Must Have)

#### F1 — Prompt Creation

| Requirement | Details |
|---|---|
| Prompt title | Short, human-readable name (max 100 chars) |
| Prompt body | Full prompt text (max 2,000 chars) |
| Category tag | Dropdown: Personality / Creative / Trivia / Wildcard |
| Prompt preview | Show how the prompt will look in the AI chat |
| Short link generation | Auto-generate a slug (e.g. `/d/abc123`) on submit |
| No sign-up required | Creator does not need an account in Phase 1 |

#### F2 — AI Deeplink Routing

| AI Platform | URL Format |
|---|---|
| ChatGPT | `https://chat.openai.com/?q={encoded_prompt}` |
| Claude | `https://claude.ai/new?q={encoded_prompt}` |
| Gemini | `https://gemini.google.com/app?q={encoded_prompt}` |
| Perplexity | `https://perplexity.ai/?q={encoded_prompt}` |

- User selects their preferred AI on the landing page
- Prompt is URL-encoded and injected as the `q` parameter
- Opens in a new tab so user can return to PromptDrop easily

#### F3 — Result Submission

| Requirement | Details |
|---|---|
| Result text box | Paste area for AI response (max 1,500 chars) |
| Display name | Optional — name or emoji (defaults to "Anonymous") |
| AI badge | Auto-tagged based on which AI they selected |
| Submission confirmation | Instant — result appears on wall in real time |
| No duplicate gate (Phase 1) | Allow multiple submissions per person (revisit in Phase 2) |

#### F4 — Results Wall

| Requirement | Details |
|---|---|
| Card display | Name + AI badge + result snippet (first 200 chars, expandable) |
| Aggregate stat | "N people tried this" counter |
| Most common outcome | Simple keyword frequency from results (e.g. "Most got: T-Rex") |
| Sort order | Newest first by default |
| Share card | Copy result as image card or copy text (for Instagram Stories / Twitter) |
| "Try it yourself" CTA | Persistent button to enter the responder flow |

#### F5 — Shareability

| Requirement | Details |
|---|---|
| OG meta tags | Prompt title + result count rendered for WhatsApp / Twitter previews |
| Short URL | Clean slug, no query params exposed |
| Result card export | One-click copy of result as shareable image (basic) |

### 5.2 Nice to Have (Phase 1.5)

- Trending prompts homepage feed
- Reaction/emoji voting on results ("😂 12 · 🔥 8")
- Creator can set an "expected outcomes" list (e.g. T-Rex, Raptor, Triceratops) and results auto-tag
- Password-protected drops (for private friend groups)
- Prompt expiry / close submissions after N responses

---

## 6. Technical Architecture

### 6.1 Stack (Recommended for Solo MVP)

| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js (React) | SSR for OG tags, fast to build |
| Styling | Tailwind CSS | Rapid UI development |
| Backend / DB | Supabase | Instant Postgres + real-time + no auth headache |
| Hosting | Vercel | Free tier, instant deploys |
| Short URLs | Nanoid (self-generated slugs) | No dependency needed |
| Image card export | html2canvas or og-image | Simple result card screenshots |

### 6.2 Data Model

**prompts table**
```
id          uuid  PK
slug        text  UNIQUE  (e.g. "abc123")
title       text
body        text
category    text
created_at  timestamp
view_count  int
```

**results table**
```
id            uuid  PK
prompt_id     uuid  FK → prompts
display_name  text  (nullable)
ai_used       text  (claude | chatgpt | gemini | perplexity)
result_text   text
created_at    timestamp
```

### 6.3 Key Technical Decisions

**Prompt deeplink encoding**
```
const encoded = encodeURIComponent(promptBody);
const url = `https://chat.openai.com/?q=${encoded}`;
```

**No auth in Phase 1** — prompts and results are public by default. A creator token (stored in localStorage) lets them see their own prompts dashboard.

**Real-time results wall** — Supabase real-time subscriptions update the wall without page refresh when new results are submitted.

---

## 7. Out of Scope (Phase 1)

- User accounts / profiles
- Following other creators
- Prompt comments / discussion threads
- AI response auto-fetching (i.e. calling the AI API directly — users manually paste results)
- Mobile app (PWA only)
- Moderation / flagging system
- Monetisation
- Multi-language prompts

> **Why no auto-fetch?** Requiring users to manually paste their result is actually a feature, not a bug, in Phase 1. It creates a moment of engagement and personal ownership of the result. It also avoids API key management and cost entirely.

---

## 8. Competitive Landscape

| Product | What it does | Gap vs PromptDrop |
|---|---|---|
| LinkMyPrompt.com | Generates deeplinks to AI with pre-filled prompts | No results wall, no social layer, pure utility |
| Uquiz / BuzzFeed Quizzes | Fixed-option personality quizzes | Not AI-generated, not personalized, no ChatGPT/Claude integration |
| Riddle / Involve.me | Quiz builder with social sharing | B2B-focused, no AI deeplink, no results aggregation |
| Character.ai | AI personas and roleplay | Not prompt-sharing, no friend comparison |

**PromptDrop's differentiation:** The only product combining AI deeplink routing + results aggregation + social sharing in a lightweight consumer experience.

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI platforms break the `?q=` deeplink URL structure | Medium | High | Monitor; build fallback to copy-to-clipboard with one click |
| Low result submission rate (users don't return to paste) | High | High | Keep the return CTA persistent; consider a "share before you see others" gate |
| Prompt abuse / inappropriate content | Medium | Medium | Category-based flagging; soft moderation in Phase 1 (report button) |
| No virality — prompts don't get shared | Medium | High | Seed with 10 high-quality prompts at launch; share in relevant communities |
| OG previews don't render on WhatsApp | Low | Medium | Test thoroughly; WhatsApp uses specific OG tag formats |

---

## 10. Phased Roadmap

### Phase 1 — MVP (Target: 4 weeks)
- Prompt creation with short link
- AI deeplink routing (Claude, ChatGPT, Gemini, Perplexity)
- Result submission + public results wall
- Basic OG social preview tags
- Result card share (copy text)

### Phase 2 — Social Layer (Target: 8 weeks post-launch)
- User accounts (optional, Google OAuth)
- Creator profile with all their drops
- Trending / featured prompts homepage
- Reaction voting on results
- Expected outcomes + auto-tagging

### Phase 3 — Community & Discovery (Target: 6 months)
- Prompt categories browsable feed
- "Remix" a prompt (fork and edit)
- Private drops with invite-only access
- Weekly "Drop of the Week" curation
- Potential API integration (auto-run prompt + return result without copy-paste)

---

## 11. Open Questions

| # | Question | Owner | Priority |
|---|---|---|---|
| 1 | Should the results wall be public by default or private (creator-controlled)? | Product | High |
| 2 | Do we allow the same person to submit multiple results for the same prompt? | Product | Medium |
| 3 | What's the content moderation plan before we open to the public? | Product | High |
| 4 | Should we support custom domains for creators (e.g. `shubham.promptdrop.app`)? | Engg | Low |
| 5 | Will ChatGPT's `?q=` deeplink continue to work reliably without a Chrome extension? | Engg | High |
| 6 | What's the name — PromptDrop, DropThis, PromptWall, other? | Product | Medium |

---

*PromptDrop PRD v1.0 — March 2026*
