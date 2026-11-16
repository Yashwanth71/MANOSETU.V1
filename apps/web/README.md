# ManoSetu interface lab

React + TypeScript + Vite web frontend alongside the Expo React Native mobile application. Shared theme tokens and breathing engine live in `packages/design-system`.

## Run

```sh
cd apps/web
npm ci
npm run dev
npm test
npm run build
```

For mobile, run `npm ci` then `npx expo start` in `manosetu-frontend`. `App.js` opens the new frontend preview; `LegacyApp.js` preserves the previous connected implementation. Metro watches the shared package. Native typography currently uses the platform font fallback.

## Coverage

Overview, onboarding, Home, Manas, mood, assessment release requirements, self-care plan, searchable breathing and resources libraries, bookmarks, journal, personal analytics, Setupath, fictional professional directory and appointment selections, community preview, reminders, settings, institutional aggregates, care workflow, and design reference. Web provides richer interactions than the native foundation; see `docs/DESIGN_SYSTEM.md` for the feature matrix.

Eight breathing entries, four interactive rhythms, three web textures, optional browser voice, 3/7/11-minute sessions, pause/reset and hidden-tab pause. Reduced motion removes decorative animation. Theme tokens target accessible text contrast; a complete accessibility audit remains a release requirement.

## Data and integration

Entries live in memory. Refresh or Settings → Clear all preview entries clears them. No account, live AI, clinical scoring, booking, push service, telemetry or institution connection is active. Campus/care numbers and professional profiles are synthetic. Menu navigation is not authorization. Review access controls and clinical workflows before connecting backend services. Self-host fonts before a privacy-sensitive pilot.

## Verification

Production web build and 10 unit tests pass. Browser smoke checks covered dark/light appearance, box-rhythm selection, running/pause states and small-cohort suppression. Expo web and Android JavaScript exports compile; this is not an iOS/Android device test or store-ready build.
