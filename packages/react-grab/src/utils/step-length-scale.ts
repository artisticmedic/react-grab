// Pure stepping math for the edit panel's arrow keys, kept apart from the
// CSSOM walk that discovers the scales so it can be reasoned about and
// tested without a document.

// Discrete scales (Radix/Chakra spacing, Tailwind `--text-*`, …) snap to the
// neighbouring token. A value outside the scale's range yields null so the
// caller falls back to a raw step; pulling it onto the nearest bound instead
// would move it by the whole distance to the scale on one arrow press, and for
// a near-miss the raw step already lands on the same token anyway.
export const nextValueInScale = (
  scale: readonly number[],
  current: number,
  direction: 1 | -1,
): number | null => {
  if (current < scale[0] || current > scale[scale.length - 1]) return null;
  if (direction === 1) {
    for (const value of scale) {
      if (value > current) return value;
    }
    return null;
  }
  for (let scaleIndex = scale.length - 1; scaleIndex >= 0; scaleIndex--) {
    if (scale[scaleIndex] < current) return scale[scaleIndex];
  }
  return null;
};

// Tailwind exposes spacing/sizing as `calc(var(--spacing) * N)` with a single
// base unit rather than discrete tokens, so the arrows walk that grid.
export const nextValueOnGrid = (
  current: number,
  direction: 1 | -1,
  unitPx: number,
): number | null => {
  const gridIndex =
    direction === 1 ? Math.floor(current / unitPx) + 1 : Math.ceil(current / unitPx) - 1;
  const next = gridIndex * unitPx;
  return next < 0 ? null : next;
};
