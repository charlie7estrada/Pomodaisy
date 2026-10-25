import { MODES, type Mode } from "@/lib/timer";
import { buttonStyles } from "./buttonStyles";

type ModeButtonsProps = {
  activeMode: Mode;
  onSelectMode: (mode: Mode) => void;
};

export default function ModeButtons({ activeMode, onSelectMode }: ModeButtonsProps) {
  return (
    <div className="flex gap-3">
      {MODES.map(({ id, label }) => {
        const isActive = id === activeMode;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectMode(id)}
            aria-pressed={isActive}
            className={isActive ? buttonStyles.primary : buttonStyles.muted}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
