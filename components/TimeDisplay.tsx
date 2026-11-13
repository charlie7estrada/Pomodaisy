import { formatTime, type Status } from "@/lib/timer";

type TimeDisplayProps = {
  timeLeft: number;
  status: Status;
};

export default function TimeDisplay({ timeLeft, status }: TimeDisplayProps) {
  const time = formatTime(timeLeft);

  return (
    <p className="relative text-(length:--timer-size) leading-none font-semibold tabular-nums">
      {status === "done" ? (
        "Done!"
      ) : (
        <>
          {/* Screen readers get the time as one string. */}
          <span className="sr-only">{time}</span>
          {/* Each digit sits in a fixed-width slot so the time doesn't shift
              when a font's digits have different widths. */}
          <span aria-hidden="true">
            {time.split("").map((char, i) =>
              char === ":" ? (
                char
              ) : (
                <span key={i} className="inline-block w-(--digit-width) text-center">
                  {char}
                </span>
              ),
            )}
          </span>
        </>
      )}
    </p>
  );
}
