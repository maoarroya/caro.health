/** Shared scroll lock so overlays can freeze both Lenis and the native scroll. */

type Scroller = { stop: () => void; start: () => void };

let scroller: Scroller | null = null;
let locks = 0;

export function registerScroller(instance: Scroller | null) {
  scroller = instance;
}

export function lockScroll() {
  if (++locks > 1) return;
  scroller?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  scroller?.start();
  document.body.style.overflow = "";
}
