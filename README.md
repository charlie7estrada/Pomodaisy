# Pomodaisy

A Pomodoro timer for the browser, starring Daisy the shih tzu. Inspired by [pomofox](https://www.pomofox.com/).

Live site: https://pomodaisy.vercel.app

## Features

- Three modes: pomodoro (25 min), short break (5 min), and long break (15 min)
- Start, pause, resume, and reset
- An alarm tone when a session ends, then a "Done!" screen
- A progress ring that drains as the session runs
- Settings to change each mode's length (whole minutes, 1 to 180)
- Your chosen mode and durations are remembered across visits
- Stays accurate in background tabs
- A slow, drifting background that stops when your system's reduce-motion setting is on

## Stack

- Next.js 16 (App Router, Server Actions, Cache Components)
- React 19 and TypeScript
- Tailwind CSS 4
- Web Audio API for the alarm
- Hosted on Vercel

## How it works

**The timer reads the clock instead of counting ticks.** Browsers delay timers in background tabs, so counting `setInterval` ticks drifts. When a session starts, Pomodaisy stores the time it should end (`endsAt`). Each tick reads `Date.now()` and shows `endsAt - now`, so a late tick still shows the correct time. Pausing saves the time left, and resuming sets a new end time from it.

**The timer is a small state machine.** It has four statuses: `not_started`, `running`, `paused`, and `done`. A single handler applies the rules for the main button. The interval only exists while the status is `running`, and an effect cleanup stops it whenever the status changes.

**Most values are calculated, not stored.** Time left is calculated from the status on each render (the end time while running, the saved time while paused, the full duration otherwise). Changing a setting or resetting never has to update a separate copy of the time.

**Preferences live in a cookie, written by a Server Action.** The server reads the cookie while rendering, so the saved mode and durations are in the first HTML with no flash. Changes are saved through a Server Action, which validates its input because any client can call it. Bad or missing values fall back to defaults one at a time. Future accounts can replace the cookie with a database without changing the timer component.

**The look is defined in one place.** Colors, the pixel font, and the background animation are theme tokens in `app/globals.css`. Button styles are shared variants in `components/buttonStyles.ts`.

## Run it locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

- `npm run build` builds for production
- `npm run lint` runs ESLint
- `npx tsc --noEmit` type-checks the project

## Roadmap

- Phase 2: session tally, auto-start, and accounts
- Phase 3: themes and customization, and an animated Daisy
