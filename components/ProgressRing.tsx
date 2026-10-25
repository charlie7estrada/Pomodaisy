type ProgressRingProps = {
  timeLeft: number;
  duration: number;
};

const SIZE = 256;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressRing({ timeLeft, duration }: ProgressRingProps) {
  const fraction = duration > 0 ? Math.min(1, timeLeft / duration) : 0;
  const offset = CIRCUMFERENCE * (1 - fraction);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="absolute inset-0 -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        className="stroke-taupe/40"
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        className="stroke-daisy"
      />
    </svg>
  );
}
