// Shared button looks: raised "chunky" buttons with a darker bottom edge that
// presses down when clicked. Change a variant here to restyle every button.
const base =
  "rounded-xl border-b-4 px-4 py-2 font-medium transition active:translate-y-0.5 active:border-b-2 disabled:pointer-events-none disabled:opacity-40";

export const buttonStyles = {
  primary: `${base} border-daisy-deep bg-daisy text-ink hover:brightness-105`,
  secondary: `${base} border-ink bg-bark text-cream hover:brightness-110`,
  muted: `${base} border-taupe bg-taupe/50 text-ink hover:bg-taupe/70`,
};
