// Background settings: how fast the blobs drift and how saturated the colors
// are.

export type BackgroundSettings = {
  speed: number; // multiplier: 0 pauses, 1 is normal, 5 is fastest
  saturation: number; // percent: 0 is grey, 100 is normal, 200 is vivid
};

export const DEFAULT_BACKGROUND: BackgroundSettings = { speed: 1, saturation: 100 };

export const MIN_SPEED = 0;
export const MAX_SPEED = 5;
export const MIN_SATURATION = 0;
export const MAX_SATURATION = 200;

// Applies settings to the live page. Saturation is a CSS variable the
// background reads. Speed changes the playback rate of the running blob
// animations, which avoids the jump that changing their duration would cause.
// With reduced motion on there are no running animations.
export function applyBackground({ speed, saturation }: BackgroundSettings): void {
  document.documentElement.style.setProperty("--bg-saturation", `${saturation}%`);

  const background = document.getElementById("background");
  for (const animation of background?.getAnimations({ subtree: true }) ?? []) {
    animation.updatePlaybackRate(speed);
  }
}
