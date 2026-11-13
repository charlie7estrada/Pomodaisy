"use client";

import { useEffect, useState } from "react";
import ControlRow from "./ControlRow";
import ModeButtons from "./ModeButtons";
import ProgressRing from "./ProgressRing";
import SettingsDialog, { type SavedSettings } from "./SettingsDialog";
import TimeDisplay from "./TimeDisplay";
import { savePreferences } from "@/app/actions";
import { playAlarm, unlockAudio } from "@/lib/alarm";
import type { Mode, Status } from "@/lib/timer";
import { applyBackground, type BackgroundSettings } from "@/lib/background";
import type { FontId } from "@/lib/fonts";


// How often the screen refreshes while running. Time is read from the clock,
// so this only controls how quickly the display catches up.
const TICK_MS = 250;

type TimerCardProps = {
  initialMode: Mode;
  initialDurations: Record<Mode, number>; // seconds
  initialBackground: BackgroundSettings;
  initialFont: FontId;
};

export default function TimerCard({ 
  initialMode, 
  initialDurations,
  initialBackground,
  initialFont,
 }: TimerCardProps) {
  const [mode, setMode] = useState(initialMode);
  const [status, setStatus] = useState<Status>("not_started");
  // Times below are in milliseconds.
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [pausedRemaining, setPausedRemaining] = useState(0);
  const [now, setNow] = useState(0);
  // Durations are in seconds.
  const [durations, setDurations] = useState(initialDurations);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const duration = durations[mode];
  const durationMs = duration * 1000;
    // Saved background settings. The settings dialog will update these.
  const [background, setBackground] = useState(initialBackground);
  const [font] = useState(initialFont);

  let timeLeftMs = durationMs;
  if (status === "running" && endsAt !== null) {
    timeLeftMs = Math.max(0, endsAt - now);
  } else if (status === "paused") {
    timeLeftMs = pausedRemaining;
  } else if (status === "done") {
    timeLeftMs = 0;
  }
  const timeLeft = Math.ceil(timeLeftMs / 1000);

  // Background lives outside this component, so saved settings are applied to
  // the page directly, after hydration and whenever they change.
  useEffect(() => {
    applyBackground(background);
  }, [background]);

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
    // Not awaited: the UI updates immediately; a failed save is just not remembered.
    savePreferences({ mode: newMode, durations, background, font }).catch(() => {});
  }

  function handleReset() {
    setStatus("not_started");
  }

  function handleSaveSettings({ durations: newDurations, background: newBackground }: SavedSettings) {
    setDurations(newDurations);
    setBackground(newBackground);
    setIsSettingsOpen(false);
    savePreferences({ mode, durations: newDurations, background: newBackground, font }).catch(() => {});
  }

  // Closing without saving (X or Escape) undoes any slider preview.
  function handleCloseSettings() {
    applyBackground(background);
    setIsSettingsOpen(false);
  }

  return (
    <section className="flex flex-col items-center gap-8 rounded-3xl bg-cream/80 p-10 shadow-lg backdrop-blur">
      <ControlRow
        status={status}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="relative grid size-64 place-items-center">
        <ProgressRing timeLeft={timeLeft} duration={duration} />
        <TimeDisplay timeLeft={timeLeft} status={status} />
      </div>
      <ModeButtons activeMode={mode} onSelectMode={handleSelectMode} />
      {isSettingsOpen && (
        <SettingsDialog
          durations={durations}
          background={background}
          onSave={handleSaveSettings}
          onClose={handleCloseSettings}
        />
      )}
    </section>
  );
}
