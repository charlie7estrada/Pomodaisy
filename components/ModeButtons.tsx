import { MODES, type Mode } from "@/lib/timer";

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
            className={`rounded-lg px-4 py-2 font-medium ${
              isActive
                ? "bg-orange-500 text-white"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
