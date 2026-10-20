// Alarm sound. TimerCard only calls these two functions, so the sound can be
// swapped later (for example, for a Daisy bark) without touching the timer.

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  audioContext ??= new AudioContext();
  return audioContext;
}

// Browsers keep audio paused until the user interacts with the page.
// Call this from a click so the alarm is allowed to play later.
export function unlockAudio(): void {
  const context = getContext();
  if (context?.state === "suspended") {
    context.resume().catch(() => {});
  }
}

const BEEP_COUNT = 3;
const BEEP_SECONDS = 0.15;
const GAP_SECONDS = 0.1;
const FREQUENCY_HZ = 880;
const VOLUME = 0.2;

// Plays three short beeps. Does nothing if audio was never unlocked.
export function playAlarm(): void {
  const context = getContext();
  if (!context || context.state !== "running") return;

  for (let i = 0; i < BEEP_COUNT; i++) {
    const start = context.currentTime + i * (BEEP_SECONDS + GAP_SECONDS);
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = FREQUENCY_HZ;
    // Fade in and out so each beep doesn't click.
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(VOLUME, start + 0.01);
    gain.gain.linearRampToValueAtTime(0, start + BEEP_SECONDS);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + BEEP_SECONDS);
  }
}
