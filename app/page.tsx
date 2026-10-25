import { Suspense } from "react";
import { cookies } from "next/headers";
import TimerCard from "@/components/TimerCard";
import { PREFERENCES_COOKIE, parsePreferencesCookie } from "@/lib/preferences";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      {/* Cache Components require a Suspense boundary around cookie reads. */}
      <Suspense fallback={null}>
        <SavedTimerCard />
      </Suspense>
    </main>
  );
}

// Reads saved preferences from the request's cookie, on the server.
async function SavedTimerCard() {
  const cookieStore = await cookies();
  const preferences = parsePreferencesCookie(cookieStore.get(PREFERENCES_COOKIE)?.value);

  return (
    <TimerCard initialMode={preferences.mode} initialDurations={preferences.durations} />
  );
}
