import type { Status } from "@/lib/timer";

type ControlRowProps = {
  status: Status;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
};

const buttonClass =
  "rounded-lg bg-zinc-800 px-4 py-2 font-medium text-white hover:bg-zinc-700";

export default function ControlRow({
  status,
  onPlayPause,
  onReset,
  onOpenSettings,
}: ControlRowProps) {
  return (
    <div className="flex gap-3">
      <button type="button" onClick={onPlayPause} className={buttonClass}>
        {status === "running" ? "Pause" : "Play"}
      </button>
      <button type="button" onClick={onReset} className={buttonClass}>
        Reset
      </button>
      <button type="button" onClick={onOpenSettings} className={buttonClass}>
        Settings
      </button>
    </div>
  );
}
