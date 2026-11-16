// Pure session clock: elapsed time is accumulated only while visible and running.
export function advanceSession(elapsed, delta, duration) {
  return Math.min(duration, Math.max(0, elapsed + Math.max(0, delta)));
}
export function breathingPhase(elapsed) {
  const phase = elapsed % 10000;
  return phase < 4000 ? { label: 'Breathe in gently', scale: .82 + .18 * phase / 4000 }
    : { label: 'Breathe out gently', scale: 1 - .18 * (phase - 4000) / 6000 };
}
