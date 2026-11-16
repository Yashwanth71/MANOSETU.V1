# ManoSetu web frontend foundation

An isolated React + TypeScript application alongside the existing Expo client. Existing backend endpoints are deliberately not called: authorization and safety remediation must precede pilot integration.

## Run

```sh
cd apps/web
npm ci
npm run dev
```

Run `npm test` for session-clock checks and `npm run build` for strict type checking and a production bundle.

## Implemented

Responsive Home, Manas interface with explicit preview consent, mood check-in, 3-minute inline breathing, 7/11-minute full sessions, journal, Setupath session milestones, Support, Community principles, Settings, light/dark appearance, native dialog keyboard behavior, and reduced motion. Breathing uses requestAnimationFrame and pauses on hidden tabs.

All user entries are held in memory. No AI calls, booking, diagnosis, authentication, notifications, analytics, or institution connection. Refresh or Clear all preview entries removes entered data. Google Fonts loads typography; self-host fonts before a privacy-sensitive pilot. The full CTO plan is delivered separately; this branch contains the frontend only.

## Validation

Strict TypeScript checking, the production build, and session-clock unit tests passed. Browser interaction and visual QA remain outstanding because the available browser could not access this workspace's loopback preview. Do not treat build success as a completed accessibility or clinical review.

## Development tools

VS Code recommendations are at the repository root. Run `bash scripts/install-editor-extensions.sh` from the root on a machine with the VS Code CLI. This is an installer for the developer's computer; it does not create provider accounts.
