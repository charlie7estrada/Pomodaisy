import { DEFAULT_DURATIONS, MAX_MINUTES, MIN_MINUTES, MODES, type Mode } from "@/lib/timer";

export type Preferences = {
  mode: Mode;
  durations: Record<Mode, number>; // seconds
};

export const PREFERENCES_COOKIE = "pomodaisy-prefs";

export const DEFAULT_PREFERENCES: Preferences = {
  mode: "pomodoro",
  durations: DEFAULT_DURATIONS,
};

function isMode(value: unknown): value is Mode {
  return MODES.some(({ id }) => id === value);
}

// Durations are stored in seconds and must be whole minutes in range.
function isValidDuration(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value / 60) &&
    value >= MIN_MINUTES * 60 &&
    value <= MAX_MINUTES * 60
  );
}

function asObject(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

// Turns untrusted data (a parsed cookie, or a Server Action argument) into
// valid preferences. Each bad or missing value falls back to its own default.
export function parsePreferences(input: unknown): Preferences {
  const data = asObject(input);
  const savedDurations = asObject(data.durations);

  const durations = { ...DEFAULT_DURATIONS };
  for (const { id } of MODES) {
    const value = savedDurations[id];
    if (isValidDuration(value)) durations[id] = value;
  }

  return {
    mode: isMode(data.mode) ? data.mode : DEFAULT_PREFERENCES.mode,
    durations,
  };
}

// Reads the cookie's text. A missing cookie or malformed JSON gives the defaults.
export function parsePreferencesCookie(raw: string | undefined): Preferences {
  if (!raw) return DEFAULT_PREFERENCES;
  try {
    return parsePreferences(JSON.parse(raw));
  } catch {
    return DEFAULT_PREFERENCES;
  }
}
