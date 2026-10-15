"use client";

import { useState } from "react";
import ControlRow from "./ControlRow";
import ModeButtons from "./ModeButtons";
import ProgressRing from "./ProgressRing";
import TimeDisplay from "./TimeDisplay";
import { DEFAULT_DURATIONS, type Mode, type Status } from "@/lib/timer";

export default function TimerCard() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [status, setStatus] = useState<Status>("not_started");

  const duration = DEFAULT_DURATIONS[mode];
  // Calculated until commit 4 decides how elapsed time is stored.
  const timeLeft = duration;

  function handleSelectMode(newMode: Mode) {
    setMode(newMode);
    setStatus("not_started");
  }

  return (
    <section className="flex flex-col items-center gap-8 rounded-3xl bg-white p-10 shadow-lg">
      <ControlRow
        status={status}
        onPlayPause={() => {}}
        onReset={() => {}}
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
