"use client";

import { useEffect, useState } from "react";
import ControlRow from "./ControlRow";
import ModeButtons from "./ModeButtons";
import ProgressRing from "./ProgressRing";
import TimeDisplay from "./TimeDisplay";
import { playAlarm, unlockAudio } from "@/lib/alarm";
import { DEFAULT_DURATIONS, type Mode, type Status } from "@/lib/timer";

// How often the screen refreshes while running. Time is read from the clock,
// so this only controls how quickly the display catches up.
const TICK_MS = 250;

export default function TimerCard() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [status, setStatus] = useState<Status>("not_started");
  // Times below are in milliseconds.
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [pausedRemaining, setPausedRemaining] = useState(0);
  const [now, setNow] = useState(0);

  const duration = DEFAULT_DURATIONS[mode];
  const durationMs = duration * 1000;

  let timeLeftMs = durationMs;
  if (status === "running" && endsAt !== null) {
    timeLeftMs = Math.max(0, endsAt - now);
  } else if (status === "paused") {
    timeLeftMs = pausedRemaining;
  } else if (status === "done") {
    timeLeftMs = 0;
  }
  const timeLeft = Math.ceil(timeLeftMs / 1000);

  useEffect(() => {
    if (status !== "running" || endsAt === null) return;

    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= endsAt) {
        setStatus("done");
      }
    }, TICK_MS);

    return () => clearInterval(id);
  }, [status, endsAt]);

  useEffect(() => {
    if (status === "done") {
      playAlarm();
    }
  }, [status]);

  function startRun(remainingMs: number) {
    unlockAudio();
    const current = Date.now();
    setNow(current);
    setEndsAt(current + remainingMs);
    setStatus("running");
  }

  function handlePlayPause() {
    if (status === "running" && endsAt !== null) {
      setPausedRemaining(Math.max(0, endsAt - Date.now()));
      setStatus("paused");
    } else if (status === "paused") {
      startRun(pausedRemaining);
    } else {
      // not_started or done: run the mode's full duration.
      startRun(durationMs);
    }
  }

  function handleSelectMode(newMode: Mode) {
    setMode(newMode);
    setStatus("not_started");
  }

  function handleReset() {
    setStatus("not_started");
  }

  return (
    <section className="flex flex-col items-center gap-8 rounded-3xl bg-white p-10 shadow-lg">
      <ControlRow
        status={status}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onOpenSettings={() => {}}
      />
      <div className="relative grid size-64 place-items-center">
        <ProgressRing timeLeft={timeLeft} duration={duration} />
        <TimeDisplay timeLeft={timeLeft} status={status} />
      </div>
      <ModeButtons activeMode={mode} onSelectMode={handleSelectMode} />
    </section>
  );
}
