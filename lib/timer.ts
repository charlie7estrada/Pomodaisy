export type Mode = "pomodoro" | "short" | "long";
export type Status = "not_started" | "running" | "paused" | "done";

export const MODES: { id: Mode; label: string }[] = [
  { id: "pomodoro", label: "pomodoro" },
  { id: "short", label: "short break" },
  { id: "long", label: "long break" },
];

// Allowed range for a duration in settings, in whole minutes.
export const MIN_MINUTES = 1;
export const MAX_MINUTES = 180;

// Durations are in seconds.
export const DEFAULT_DURATIONS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
