import { useEffect, useRef, useState, type FormEvent } from "react";
import { buttonStyles } from "./buttonStyles";
import { MAX_MINUTES, MIN_MINUTES, MODES, type Mode } from "@/lib/timer";

type SettingsDialogProps = {
  durations: Record<Mode, number>; // seconds
  onSave: (durations: Record<Mode, number>) => void;
  onClose: () => void;
};

// Returns whole minutes in range, or null if the text isn't valid.
function parseMinutes(text: string): number | null {
  if (!/^\d+$/.test(text)) return null;
  const minutes = Number(text);
  return minutes >= MIN_MINUTES && minutes <= MAX_MINUTES ? minutes : null;
}

export default function SettingsDialog({ durations, onSave, onClose }: SettingsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Unsaved edits, kept as typed. Discarded when the dialog closes.
  const [draft, setDraft] = useState<Record<Mode, string>>(() => ({
    pomodoro: String(durations.pomodoro / 60),
    short: String(durations.short / 60),
    long: String(durations.long / 60),
  }));

  // The dialog only exists while open, so open it as a modal on mount.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const isValid = MODES.every(({ id }) => parseMinutes(draft[id]) !== null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const saved = { ...durations };
    for (const { id } of MODES) {
      const minutes = parseMinutes(draft[id]);
      if (minutes === null) return;
      saved[id] = minutes * 60;
    }
    onSave(saved);
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto w-80 rounded-2xl bg-cream p-6 text-ink shadow-xl backdrop:bg-ink/40"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="rounded px-2 text-xl leading-none text-bark hover:text-ink"
          >
            ×
          </button>
        </div>

        {MODES.map(({ id, label }) => (
          <label key={id} className="flex items-center justify-between gap-4">
            <span>{label}</span>
            <input
              type="number"
              inputMode="numeric"
              min={MIN_MINUTES}
              max={MAX_MINUTES}
              step={1}
              value={draft[id]}
              onChange={(event) => {
                const { value } = event.target;
                setDraft((prev) => ({ ...prev, [id]: value }));
              }}
              className="w-20 rounded-lg border-2 border-taupe bg-white/70 px-2 py-1 text-right focus:border-daisy-deep focus:outline-none"
            />
          </label>
        ))}

        {!isValid && (
          <p className="text-sm text-red-700">
            Use whole minutes from {MIN_MINUTES} to {MAX_MINUTES}.
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={buttonStyles.primary}
        >
          Save
        </button>
      </form>
    </dialog>
  );
}
