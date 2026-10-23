"use server";

import { cookies } from "next/headers";
import { PREFERENCES_COOKIE, parsePreferences, type Preferences } from "@/lib/preferences";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Saves the user's mode and durations. A Server Action is a public endpoint
// that can be called with any data, so the input is validated before storing.
export async function savePreferences(input: Preferences) {
  const preferences = parsePreferences(input);
  const cookieStore = await cookies();
  cookieStore.set(PREFERENCES_COOKIE, JSON.stringify(preferences), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
  });
}
