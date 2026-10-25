import { formatTime, type Status } from "@/lib/timer";

type TimeDisplayProps = {
  timeLeft: number;
  status: Status;
};

export default function TimeDisplay({ timeLeft, status }: TimeDisplayProps) {
  return (
    <p className="relative text-6xl font-semibold tabular-nums">
      {status === "done" ? "Done!" : formatTime(timeLeft)}
    </p>
  );
}
