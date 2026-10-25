import type { Status } from "@/lib/timer";
import { buttonStyles } from "./buttonStyles";

type ControlRowProps = {
  status: Status;
  onPlayPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
};

export default function ControlRow({
  status,
  onPlayPause,
  onReset,
  onOpenSettings,
}: ControlRowProps) {
  return (
    <div className="flex gap-3">
      <button type="button" onClick={onPlayPause} className={buttonStyles.primary}>
        {status === "running" ? "Pause" : "Play"}
      </button>
      <button type="button" onClick={onReset} className={buttonStyles.secondary}>
        Reset
      </button>
      <button type="button" onClick={onOpenSettings} className={buttonStyles.secondary}>
        Settings
      </button>
    </div>
  );
}
