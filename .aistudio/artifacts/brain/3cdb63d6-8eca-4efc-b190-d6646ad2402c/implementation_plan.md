# Cinematic Streaming Portfolio — The Series

A high-production, cinematic streaming-platform portfolio web application ("The Series") with full interactive episodic structure, designed to showcase a Full-Stack Developer and AI / Machine Learning engineer. Built with high-fidelity streaming UI patterns, zero-pill discipline, modular `portfolio.ts` single source of truth, and interactive modals.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Strategy**: The complete architectural and feature structure of "The Series" template is preserved 100% intact (Studio Intro, "Who's Watching?" profile selector, Billboard Hero with parallax, Play Intro highlight reel, Episodes/Seasons journey, Originals horizontal project showcase with full-screen project modals, Top 10 picks, Skill genres with usage evidence, Achievements & Certifications rails, Interactive Resume Sheet & PDF Viewer, and "To Be Continued" contact CTA).
>
> **Data Replacement Ready**: All profile data, projects, episodes, skills, achievements, and contact details are cleanly centralized in `src/data/portfolio.ts` so the user can easily swap in their own details or provide them to be replaced directly without touching UI component code.

- **Confirmed Role Focus**: Full-Stack Developer and AI / Machine Learning.
- **Visual & Structural Preservation**: 1:1 parity with the cinematic streaming platform layout, animations, audio/visual cues, Lenis smooth scrolling, film grain, and custom cursor.
- **Asset Routing**: Connected directly to the verified uploaded assets in `/public/assets/aistudio/` (portraits, icons, og-image, and resume PDF) with bulletproof fallbacks.

---

## 1. Overview & Core Concept

- **What It Does**: Reimagines a developer's career as an original cinematic streaming television series. Every major career stage is an "Episode" grouped into "Seasons", every major project is a "Streaming Original" with episode runtimes and match scores, skills are organized by "Genres", and achievements are presented as "Festival Selections" and "Certifications".
- **Target Audience / Persona**: Tech recruiters, engineering hiring managers, founders, and peer developers seeking an unforgettable, high-signal presentation of full-stack engineering and machine learning capabilities.
- **Key Value**: Replaces conventional, forgettable flat resumes with an immersive, story-driven streaming experience that commands attention while providing direct instant access to project code, technical specifications, and downloadable resume documents.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Cold Open / Studio Title Sequence**:
   - Deep cinematic black backdrop (`#07070a`) with subtle film grain.
   - Studio card fade-in (`AN ORIGINAL SERIES`), followed by dramatic typography reveal (`SUSHMITA / THE SERIES`).
   - Zoom transition smoothly cueing the interactive "▶ PLAY" action or skip hotkey (`Enter` / `Esc`).

2. **"Who's Watching?" Profile Selector**:
   - Streaming avatar selector presenting viewer lenses:
     - **Recruiter Profile**: Prioritizes key project metrics, production uptime, tech stack, and quick resume download.
     - **Engineering Profile**: Highlights architecture, algorithms, data structures, and system design.
     - **Creative / Founder Profile**: Emphasizes product intuition, end-to-end delivery, and AI innovation.
   - Smooth transition into the main Billboard dashboard upon selection.

3. **Billboard Hero & Highlight Reel**:
   - Hero banner with parallax portrait, ambient light streaks, and particle motion.
   - Action buttons: "▶ Play Intro" (opens a full-screen story-style highlight reel with pause, progress bars, and keyboard arrows), and "More Info" (smooth scroll to overview).

4. **Episodic Journey & Originals Showcase**:
   - **Continue Watching / Season Journey**: Interactive timeline organized by Seasons (e.g. *Season 1: Foundations*, *Season 2: Full-Stack Engineering & AI Systems*).
   - **Originals Rail**: Pinned horizontal showcase on desktop and smooth touch rail on mobile, with hover preview states and match percentages.
   - **Project Detail Modal**: Rich popout with overview, architecture highlights, metrics, live links, and tech breakdown.

5. **Top 10 Picks, Skill Genres & Credentials**:
   - Ranked badge numbers (1–10) styled with large dimensional display typography.
   - Skill genres showing real application evidence ("Used in: PolicyGuard AI, Payment Gateway").
   - Poster-style achievement cards and verified certification credentials.

6. **Resume Viewer & "To Be Continued" CTA**:
   - Tabbed resume drawer featuring an in-app formatted sheet viewer and PDF download.
   - Cinematic closing credits with contact links (GitHub, LinkedIn, Email).

### Visual Identity & Theme Tokens

- **Dominant Canvas (60%)**: Deep rich ink `#07070a` and layered surfaces `#0e0e13`, `#16161d`.
- **Structural Surfaces (30%)**: Glassmorphic panels with `backdrop-filter: blur(14px)`, subtle hairline borders `rgba(255,255,255,0.08)`, and bone text `#f4f1ec`.
- **Accent Budget (10%)**: Streaming crimson `#e5132b` and electric rose `#ff3d5a` strictly on primary actions, focus rings, and active play indicators.
- **Typography**:
  - Display: Bebas Neue / Oswald (`font-display`) for oversized cinematic series titles and ranked typography.
  - Serif: Instrument Serif (`font-serif`) for elegant episode titles and quotes.
  - Sans: Inter (`font-sans`) with tabular figures for technical metadata.
- **Anti-Slop Discipline**: No generic pill sandwiches or mechanical comment headers; clean typographic dividers (`·`, `/`) and high-performance compositor-only animations.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Centralized Single Source of Truth (`src/data/portfolio.ts`)**:
  - *Chosen Approach*: Decouple all portfolio content (profile, projects, seasons, skills, achievements, contact details) into a strictly typed data model in `src/data/portfolio.ts`.
  - *Why*: Allows instant replacement of Sushmita's details with the user's information without risking regressions or modifying complex animation components.
  - *Alternatives Considered*: Hardcoding content inside JSX components (rejected because it makes user data replacement tedious and fragile).

- **Decision 2: Framer Motion & CSS Hybrid for Performance**:
  - *Chosen Approach*: Hardware-accelerated transforms and opacity transitions with `prefers-reduced-motion` fallbacks, plus Lenis smooth scrolling.
  - *Why*: Delivers 60fps streaming cinematic quality while respecting accessibility and low-powered mobile devices.

- **Decision 3: Multi-Mode Profile Switching**:
  - *Chosen Approach*: Selecting a profile re-orders and tailors the prominence of sections (e.g., highlighting resume & achievements for Recruiters, or deep technical project architecture for Developers) without hiding any content.
  - *Why*: Keeps all information accessible while offering an authentic streaming personalization experience.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│   (Stage Controller: Opening → ProfileSelect → Home)   │
└───────────┬────────────────────────────────────────────┘
            │
            ├─── OpeningSequence (Studio Card, Title Card, Play trigger)
            ├─── ProfileSelector ("Who's watching?", Persona selection)
            │
            ▼ [Main Streaming Dashboard]
 ┌──────────────────────────────────────────────────────────────────┐
 │ Navbar (Sticky, hide-on-scroll, profile menu, resume CTA)       │
 ├──────────────────────────────────────────────────────────────────┤
 │ Billboard Hero (Parallax portrait, particles, Play Intro button) │
 ├──────────────────────────────────────────────────────────────────┤
 │ PlayIntro Modal (Fullscreen story reel with progress bars)       │
 ├──────────────────────────────────────────────────────────────────┤
 │ ContinueWatching / Seasons (Career timeline as episodes)         │
 ├──────────────────────────────────────────────────────────────────┤
 │ Originals (Horizontal rail, project cards, hover preview)        │
 ├──────────────────────────────────────────────────────────────────┤
 │ ProjectModal (Cinematic full-screen project spec & tech deep dive)│
 ├──────────────────────────────────────────────────────────────────┤
 │ TopPicks (Ranked 1-10 showcase with dimensional numerals)       │
 ├──────────────────────────────────────────────────────────────────┤
 │ Skills (Categorized by genres with direct project evidence)      │
 ├──────────────────────────────────────────────────────────────────┤
 │ Achievements & Certifications (Awards & verified credentials)    │
 ├──────────────────────────────────────────────────────────────────┤
 │ ResumeModal (Interactive sheet viewer & direct PDF download)     │
 ├──────────────────────────────────────────────────────────────────┤
 │ FinalCTA (Cinematic credits & direct contact channels)           │
 └──────────────────────────────────────────────────────────────────┘
            ▲
            │ reads from
 ┌──────────────────────────────────────────────────────────────────┐
 │                    src/data/portfolio.ts                         │
 │  (Single source of truth: Profile, Projects, Seasons, Skills)    │
 └──────────────────────────────────────────────────────────────────┘
```

### Data Model & State Mapping

- `stage`: `'opening' | 'profile-select' | 'main'` governs the initial transition sequence.
- `activeProfile`: `'recruiter' | 'developer' | 'creative'` controls section weighting and highlighted metadata.
- `activeProjectModal`: `Project | null` controls full-screen project modal rendering and scroll lock.
- `showIntroReel`: `boolean` activates the full-screen highlight reel story with pause/resume controls.
- `showResumeModal`: `boolean` opens the designed resume sheet and PDF viewer.
- `watchProgress`: persistent progress tracked per project/episode for the "Continue Watching" progress bars.
