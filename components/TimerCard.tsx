"use client";

import ControlRow from "./ControlRow";
import ModeButtons from "./ModeButtons";
import ProgressRing from "./ProgressRing";
import TimeDisplay from "./TimeDisplay";
import { DEFAULT_DURATIONS, type Mode, type Status } from "@/lib/timer";

export default function TimerCard() {
  // Hardcoded until commit 3 turns these into state.
  const mode: Mode = "pomodoro";
  const status: Status = "not_started";
  const duration = DEFAULT_DURATIONS[mode];
  const timeLeft = duration;

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
      <ModeButtons activeMode={mode} onSelectMode={() => {}} />
    </section>
  );
}
