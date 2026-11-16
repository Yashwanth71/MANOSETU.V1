# ManoSetu — Design system and frontend specification

**Version 1 · 16 November 2026 · Arovia Private Limited**

## 1. Product concept

**A little space, a clear next step.** ManoSetu is a student-first wellbeing platform for India: Manas, an explicitly identified AI companion; everyday self-care; Setupath, a non-competitive personal journey; professional support; and separate institutional insights. The product should feel orderly, warm and credible. Clarity is more important than the amount of content on the screen.

Use generous space, crisp type, softly rounded surfaces and a violet breathing sphere. Apple-inspired principles mean hierarchy, predictable interaction, consistent feedback, respect for system preferences and efficient rendering. They do not mean copying Apple assets, obscuring content behind glass, or using motion everywhere.

One dominant action per section. Avoid guilt-inducing streaks, recovery scores, manipulative reminders, public mood rankings and decorative medical imagery. Use original copy and brand assets. Every AI response must be labelled; AI must never visually impersonate a licensed professional.

## 2. Research and design decisions

This is a qualitative desk review of official product pages, public GitHub documentation and selected public social discussions. It is not a usability study, source-code security audit or clinical effectiveness comparison. Public comments are anecdotes, not representative survey results. No private social accounts were accessed.

| Reference | Pattern reviewed | ManoSetu decision |
|---|---|---|
| Calm official content/help and indexed Breathe Bubble video | Self-care content library and a simple visual breathing guide | Separate a searchable library from an uninterrupted practice screen; put start/pause/reset beside the guide |
| Wysa official individuals page | Conversational self-care, professional support and explicit service limits | Pair Manas with visible human-support paths and clearly identify AI and emergency limitations |
| Headspace official box-breathing page | Four equal inhale/hold/exhale/rest phases | Specify box rhythm as 4/4/4/4 seconds, with a no-hold alternative |
| Headspace public Reddit threads and official LinkedIn redesign post/comments | Anecdotes about findability, changing navigation, favourites and remembered durations | Stable primary navigation; searchable content; bookmarks; clear session duration control; validate these hypotheses with users |
| Tele-MANAS official government announcement | India-oriented multilingual and accessible support direction | Plan English, Telugu and Hindi with reviewed translations; keep support accessible outside the chat |
| paulcushing/breathe GitHub README | Tunable phase timing, reduced-motion attention, local preferences and offline/PWA direction | Use one shared phase engine and an explicit session state machine. No source code copied |
| WCAG 2.2, WAI animation guidance and React Native accessibility docs | Contrast, keyboard access, names, target sizes and reduced motion | Design for AA; use a 44px product target for controls; provide textual phase cues and platform accessibility semantics |

Specific social sources: Reddit r/Headspace discussions on UI confusion, course discovery and missing favourites; LinkedIn official Headspace redesign post. YouTube was surfaced through search; the full video was not watched. Instagram and other social platforms were not exhaustively reviewed. “Telemanus” from earlier discussion is interpreted as Tele-MANAS; confirm if another product was intended.

## 3. Information architecture

Primary navigation: **Home · Manas · Library · Journey · Support**. These remain stable across the web and mobile layouts. The current web interface lab exposes secondary destinations through **Explore all interfaces**; mobile exposes them through **More**. In production, organise the secondary routes under the appropriate primary destination, rather than showing every route as a top-level tab.

- Public: overview, how it works, privacy explanation, support access, institution enquiry.
- Getting started: optional guest exploration, language/intention, AI/privacy explanation, sign-in and consent when services are connected.
- Home: mood check-in, one suggested next step, breathing shortcut, reflection and support.
- Manas: conversation, privacy/AI identity, source cards, embedded 3-minute breathing, support and referral actions.
- Library: breathing; sleep, focus, grounding, student-life and connection resources; search; bookmarks.
- Journey: Setupath, mood history, journal, flexible plan and personal activity insights.
- Support: professional directory, profiles, availability, appointment management, campus support and urgent-support entry.
- Account: profile, language, accessibility, privacy, consent, reminders, exports and deletion.
- Institutional workspace: aggregate participation/activity, coverage, suppression, period/cohort filters and approved exports.
- Care workspace: consented referrals, acknowledgement, follow-up and operational response standards. It must be separately authorised.

## 4. Theme and foundations

| Token | Light | Dark | Use |
|---|---|---|---|
| Brand primary | #7C3AED | #7C3AED | Main action and brand |
| Brand secondary | #2563EB | #2563EB | Secondary identity, restrained accents |
| Background | #FAFAF8 | #0C1120 | Canvas |
| Surface | #FFFFFF | #111827 | Cards and panels |
| Raised surface | #F0EFED | #1C2333 | Secondary controls |
| Primary text | #0D1117 | #F0F4FF | Content |
| Secondary text | #4D5769 | #A4B1C8 | Supporting copy |
| Border | #CCD1DB | #344057 | Separation |
| Accessible accent text | #6D28D9 | #C4B5FD | Links and selected text |
| Decorative lavender | #A99AF7 | #A99AF7 | Orb and illustration only |

Do not assume a brand swatch is suitable for small text on every surface. Essential theme text pairs are covered by automated normal-text contrast checks. Production must also audit every button, disabled state, focus ring, chart, error and native screen. Charts need labels/patterns in addition to colour. Never encode risk or mood using colour alone.

Typography: **Syne** for display/headings, **DM Sans** for body and controls. Adobe Fonts metadata confirms DM Sans availability; no new Adobe font subscription was activated. Web currently loads Google Fonts. Self-host reviewed font files for production. Native currently uses system font fallback; matching font loading and Telugu/Devanagari fallbacks remain implementation tasks.

Type: 16px body, line-height 1.6; 14px supporting labels; avoid essential small text. Display 36–64px desktop, 28–40px mobile; section headings 24–32px. Support native text scaling and 200% browser zoom without truncation. Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64. Control radius 12px; card radius 20px; pills fully rounded. Minimum product target 44×44px. WCAG AA target-size minimum is 24×24px subject to exceptions; 44px is our stronger product target, not the AA minimum.

Desktop: stable left navigation, readable content width, two-column task/support layouts and four-column metric rows when space permits. Tablet: reduce columns before text compresses. Phone: one-column tasks, bottom primary navigation, secondary destinations in More; safe-area padding and reachable controls. Role dashboards should use tables only when columns remain readable; otherwise switch to labelled records.

## 5. Components and state contracts

Foundations: theme provider, typography, spacing, icon strokes, focus rings, motion preferences and content width. Components: primary/secondary/text/icon buttons; input/textarea/select; checkbox/switch; chips; cards; alerts; modal/dialog; searchable collection; empty state; timeline; metric; labelled bar; date/slot picker; chat message/composer; consent panel; orbit.

Every connected feature must define idle, loading, populated, empty, error, offline, permission-denied and completion states. Current preview implements local interactions and honest unavailable/review-pending states; it does not simulate every eventual network state. Retry must preserve unsent text. Disabled actions need an explanation. Modal opens must move focus, Escape closes where appropriate, and focus returns to the trigger. Route changes announce the page heading. No modal or overlay may trap the user away from support.

Use short, respectful copy: “Begin when you’re ready”, “Pause”, “You can change this later”. Avoid promises of treatment, diagnosis or recovery. Missing days are gaps, not failures. Production reminders are opt-in with quiet hours and discreet wording; avoid revealing health details on a lock screen.

## 6. Motion concept

Motion explains state rather than rewarding engagement. Feedback: 120ms; view changes: 180ms; sheets: 240ms. Use opacity and small transforms; avoid continuous background particles, parallax and flashing. Use platform reduced-motion settings. Under reduced motion, remove decorative entry motion and orbit travel/scale; retain readable phase name, countdown, play/pause and progress text. The animation is never the only instruction.

Do not announce every animation frame or every second to a screen reader. Announce phase changes politely; make detailed countdown available as text. Voice is opt-in and off by default. The web uses browser speech synthesis, whose availability and voice behaviour vary by browser; it is not recorded therapeutic audio. A production audio setting needs volume, mute and interruption behaviour. Native voice and haptics are not implemented yet.

## 7. Breathing orbit specification

### Quantities and layers

**Eight library entries, four interactive rhythms, three visual treatments, five visual layers.** The visual treatments are presentation choices, not additional breathing techniques.

1. Softly lit sphere: violet/lavender gradient, no strobing or animated lighting.
2. Static low-contrast halo: separation and depth.
3. Phase track with boundary markers: communicates where the current phase sits in the cycle.
4. One moving pointer: linear travel through the full cycle, paused with the session.
5. Outer session-progress arc: advances once over the full selected duration.

Treatments: **Smooth** (default), **Soft grain** (static low-opacity noise), **Contour** (static line pattern). Grain/contour do not animate independently. Avoid canvas/WebGL for this simple guide; web CSS and SVG are sufficient and keep the rendering cost small.

### Timing catalogue

| Entry | Inhale / hold / exhale / rest (seconds) | Cycle | Current state |
|---|---|---:|---|
| Gentle breathing | 4 / 0 / 6 / 0 | 10s | Interactive preview; default without holds |
| Box breathing | 4 / 4 / 4 / 4 | 16s | Interactive preview |
| Equal breathing | 5 / 0 / 5 / 0 | 10s | Interactive preview |
| Longer exhale | 4 / 0 / 8 / 0 | 12s | Interactive preview |
| 4–7–8 | 4 / 7 / 8 / 0 | 19s | Read-only introduction; review pending |
| Nadi Shodhana | Illustrative 4 / 0 / 4 / 0 | 8s model | Review pending; alternating nostril instructions are not reducible to a timer |
| Bhramari | Illustrative 4 / 0 / 6 / 0 | 10s model | Review pending; humming instructions/audio require review |
| Dirga | Illustrative 5 / 0 / 5 / 0 | 10s model | Review pending; three-part instruction requires review |

The last three rows are animation placeholders, not validated instruction, universal technique timing or prescribed practice. Their full instructional content must be reviewed before interactive release. Even the four interactive previews are product demonstrations, not clinically validated treatment. Breathing should be comfortable and unforced; users can stop, choose a no-hold pattern or breathe naturally.

### Box-breathing sequence

| Time in cycle | Label | Sphere | Pointer |
|---|---|---|---|
| 0–4s | Breathe in | Scale 0.78 → 1.00 | First quarter |
| 4–8s | Hold gently | Remain at 1.00 | Second quarter |
| 8–12s | Breathe out | Scale 1.00 → 0.78 | Third quarter |
| 12–16s | Rest gently | Remain at 0.78 | Fourth quarter |

Expansion/contraction use cosine interpolation: `eased = (1 - cos(π × phaseFraction)) / 2`. Pointer travel uses `elapsedWithinCycle / cycleDuration`, so it does not accelerate with sphere easing. Zero-duration phases are skipped. Phase markers are based on phase-duration ratios; box markers fall at the four quarters. Full-session arc uses elapsed/session-duration.

### Session state and reliability

Idle → running ↔ paused → complete. Reset returns to idle. Changing rhythm or duration resets elapsed time. Hidden browser tab or inactive mobile app pauses the session; returning does not silently restart it. Use elapsed timestamps through requestAnimationFrame rather than adding an assumed second per tick. Clamp elapsed time at completion and fire completion once. Do not update React state with side effects inside a state updater.

Manas embedded session: **3 minutes**. Library session: **7 or 11 minutes**. A 7-minute box session is 26 full cycles plus 4 seconds; an 11-minute session is 41 cycles plus 4 seconds. The preview ends exactly at the selected duration, potentially mid-cycle. Before production, user testing and clinical review should choose whether to retain exact timing or explicitly offer “finish this cycle”; never silently add time. Completion copy should invite a reflection without claiming a health improvement.

## 8. Feature and implementation matrix

“Interactive” below means local frontend state, not a connected production service.

| Interface | Web implementation | Native implementation | Release integration |
|---|---|---|---|
| Overview | Branded landing, product paths, privacy and campus preview | Overview cards | Public content/legal pages, institution enquiry |
| Onboarding | Three-step intention/language/preview understanding | Preview acknowledgement and intro | Accounts, consent versions, campus membership, translated copy |
| Home/mood | Check-in selection and memory-held history | Selection and local entries | Encrypted storage, edit/export/delete, timezone |
| Manas | Consent-gated composer, sample messages, embedded practice | Composer and embedded practice | Authenticated streaming AI, RAG sources, interruption, safety routing |
| Breathing | Search/category, eight entries, four selectable rhythms, textures, voice, pause/reset | Search, same rhythms/clock, simplified visual guide | Reviewed content; native texture/pointer/voice/haptic parity; device QA |
| Resources | Six original sample resources, search, reading dialog, bookmarks | Search/read/bookmark | Reviewed CMS, multilingual search, audio playback/downloads and rights |
| Assessment | Optional-screening catalogue and requirements; no questionnaire/score | Readiness explanation | Reviewed PHQ/GAD wording, translation, suitability, scoring and response workflow |
| Flexible plan | Select self-care intentions and task links | Self-care shortcut cards | Editable schedule and user-controlled recommendations |
| Journal | Write, search, delete preview reflections | Write/delete | Private encrypted store, access controls and retention |
| Setupath | Non-competitive activity milestones | Activity counters | Shared data model; no treatment/recovery score |
| Personal analytics | Activity counts, mood history and date-window view | Counts | Longitudinal data, missingness, accessible charts, exports |
| Professional directory | Fictional language-filtered profiles; dated sample slot selection | Fictional profiles and undated sample slots | Verified credentials, fees, real availability, cancellation and consent |
| Appointments | Preview selections/remove; duplicate check | Preview selections/remove | Booking state, reminders, video links and delivery acknowledgement |
| Community | Fictional room feeds, local post, report/hide | Community principles | Moderation staffing, reports, appeals, spam protection; no open direct messaging |
| Notifications | Read state and preference preview | Preference switch | Push/email consent, quiet hours and secure payloads |
| Settings | Theme, preview data clearing and privacy explanation | Theme and clearing | Profile, language, consent, export/delete, account recovery |
| Institution | Synthetic filters, metrics, activity bars, export, small-cohort suppression | Synthetic metrics and suppression switch | Tenant isolation, approved aggregates and privacy-reviewed queries |
| Care workspace | Synthetic referral-stage counters | Workflow explanation | Individually authorised consented referrals, acknowledgement and staffed follow-up |
| Design reference | In-app palettes/type/motion/orbit explanation | Reference cards | Figma component/variable library and comprehensive accessibility QA |

Web currently holds foundational Home/Journey records and extended-library records in separate preview states. Personal analytics combines counts; production must consolidate these into one data model. No sensitive text is sent to the server by these preview interactions. Font requests still contact the font provider. No telemetry or AI service is connected.

## 9. Institutional analytics rules

Student and institution experiences are different roles, not visual tabs that confer access. The prototype intentionally exposes synthetic screens for review. Production requires server-enforced role and tenant checks, not hidden menu links.

Only opt-in, purpose-limited aggregates. No administrator access to journal text, chatbot transcripts or identifiable mood histories. Show coverage, missingness, period, denominator and what the metric means. Suppress fewer than 20 participants in this prototype; this threshold is a product demonstration, not a guarantee of anonymity or a legal standard. Production also needs protection against differencing across filters/time periods, complementary suppression, query auditing and privacy review. Export must apply the same rules as the screen. No individual risk ranking or institutional diagnosis inference.

Care referrals need a separate consented workflow. Define request, acknowledged, contacted, follow-up and closed states; indicate who owns the next step, staffed hours and what happens if delivery fails. Do not imply a continuously monitored emergency service unless one is actually staffed.

## 10. Technical direction and backend boundaries

Web: React + TypeScript + Vite; CSS custom properties and SVG orbit. Mobile: Expo + React Native, currently JavaScript; incrementally migrate screens/shared domain types to TypeScript. Share tokens, content identifiers, phase logic and API contracts; keep platform layouts/accessibility native to each surface. Avoid forcing DOM components into native screens.

Backend direction: Python/FastAPI for AI/RAG orchestration and reviewed scoring services; PostgreSQL for consent/account/appointment data, with vector search only if retrieval evaluation warrants it. Existing backend code is not implicitly approved by the frontend work. Authentication, tenant access, encrypted secrets, audit events, retention, backups and monitoring precede pilot integration.

RAG/frontend contract: response text, explicit AI identity, retrieved source title/organisation/date/link, retrieval status, uncertainty and next-action options. Show original sources on request without exposing internal retrieval traces or hidden prompts. A retrieval miss must yield a clear limitation, not invented citations. User journals are not a default training or retrieval corpus. Any memory feature needs explicit, revocable consent. Avoid training a model on student conversations as a first milestone; start with a curated, versioned knowledge base and evaluated model behaviour.

Required API families: session/consent, mood, journal, plans, content, practice history, chat streaming, directory/availability, appointments, reminders, personal exports, aggregate reports, consented referrals and moderation. Keep service errors separate from clinical interpretation. Add idempotency for writes and booking confirmation; cancellation/retry must not double-book or lose text.

## 11. Delivery and release sequence

1. Validate the concept and navigation with 5–8 students, including Telugu/Hindi speakers and assistive-technology users. Treat this as discovery, not proof of clinical safety.
2. Complete design tokens/components and native visual parity. Consolidate preview data models. Add real route URLs, browser back navigation and deep links before production.
3. Implement accounts, consent, secure personal data CRUD and content CMS. Audit role separation before any institution data exists.
4. Add evaluated Manas/RAG with reviewed source content, AI disclosure, uncertainty and referral/safety flows. Define clinical ownership and service boundaries.
5. Add verified directory, consented referral and booking lifecycle. Provide delivery/acknowledgement failure states.
6. Enable privacy-reviewed institutional aggregates, only after data governance is in place. Community follows moderation readiness.
7. Run keyboard/screen-reader, contrast, 200% zoom, reduced-motion, low-bandwidth and real iOS/Android tests. Measure performance on representative low/mid-range devices; no score is claimed from the current builds.

Acceptance targets: readable 320px web layout without horizontal overflow; 44px touch targets; no autoplay sound; preserved drafts on recoverable errors; reliable breathing pause/resume; no fake historical analytics; every synthetic value labelled; no private text in institutional exports; all connected actions visibly report actual delivery state. Security, privacy, clinical review and human support operations must be completed before a real-user pilot.

## 12. Verification and deliverables

Web strict TypeScript/production build passed; 10 unit tests cover phase boundaries/holds/zero phases, bounded timing, invalid patterns, 3/7/11-minute clamping, cohort threshold and essential theme text contrast. Browser smoke checks covered box selection, running/pause, light/dark and cohort suppression. Expo web and Android JavaScript export succeeded. These checks are not a full accessibility audit, device QA, performance benchmark or clinical validation.

Canva concept/spec document: https://canva.link/qyjs9t8r2k0vghk . It is a visual reference; this specification and code describe actual coverage. Existing editable brand file: https://www.figma.com/design/0pNl3LMwkfTHjzptk3F8tK . Figma Starter tool quota blocked adding new product frames in this turn. Adobe Fonts was used for DM Sans metadata; no Adobe Express product-screen editing is claimed.

## Sources

Reviewed 16 November 2026. Source pages may change. No product efficacy claims are inferred.

- Calm content: https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App
- Calm indexed Breathe Bubble video: https://www.youtube.com/watch?v=5DqTuWve9t8
- Wysa: https://www.wysa.com/for-individuals
- Headspace box breathing: https://www.headspace.com/content/mindful-activity/box-breathing/5647
- Public Reddit UI discussion: https://www.reddit.com/r/Headspace/comments/1r2z2mf/is_the_app_ui_just_super_confusing/
- Public Reddit navigation discussion: https://www.reddit.com/r/Headspace/comments/1o6b28l/are_the_fing_w_us/
- Public Reddit favourites discussion: https://www.reddit.com/r/Headspace/comments/1obvess
- Public Reddit course discovery: https://www.reddit.com/r/Headspace/comments/1bdzlch/how_to_find_just_courses_app_is_too/
- Official Headspace LinkedIn redesign post: https://www.linkedin.com/posts/headspaceapp_open-the-headspace-app-for-your-daily-meditation-activity-7376721687813292032-ALAV
- Tele-MANAS government announcement: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2177389&lang=2&reg=3
- Public GitHub reference: https://github.com/paulcushing/breathe
- WCAG 2.2: https://www.w3.org/TR/wcag/
- WAI animation guidance: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
- NHS comfortable breathing guidance: https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/
- React Native accessibility: https://reactnative.dev/docs/0.83/accessibility
- Expo 55: https://docs.expo.dev/versions/v55.0.0/
- Adobe DM Sans: https://fonts.adobe.com/fonts/dm-sans
