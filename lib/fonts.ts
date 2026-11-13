// The site's font choices. A saved preference stores only the id; any CSS
// written for a font comes from this table, never from saved data.
// variable: the CSS variable next/font defines in app/layout.tsx (null = system font).
// timerSize: overrides --timer-size for fonts whose digits are too wide for the ring.
export const FONTS = {
  system: { label: "System default", variable: null, timerSize: null },
  gameboy: { label: "Early GameBoy", variable: "--font-early-gameboy", timerSize: "2.25rem" },
  matcha: { label: "Matcha Style", variable: "--font-matcha-style", timerSize: null },
  komika: { label: "Komika Title", variable: "--font-komika-title", timerSize: null },
} as const;

export type FontId = keyof typeof FONTS;

export const DEFAULT_FONT: FontId = "system";

// Object.hasOwn skips inherited keys, so values like "toString" are rejected.
export function isFontId(value: unknown): value is FontId {
  return typeof value === "string" && Object.hasOwn(FONTS, value);
}

// The CSS rule that applies a font to the whole page. Empty for the system
// font, which is the default in globals.css.
export function fontCss(id: FontId): string {
  const { variable, timerSize } = FONTS[id];
  const declarations: string[] = [];
  if (variable) declarations.push(`--app-font: var(${variable});`);
  if (timerSize) declarations.push(`--timer-size: ${timerSize};`);
  return declarations.length > 0 ? `:root { ${declarations.join(" ")} }` : "";
}
