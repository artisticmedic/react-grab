// Stepping onto the scale from between two tokens would move the value by the
// width of whatever gap it sits in, and a family can be arbitrarily sparse.
// The walk therefore starts only from a value already on the scale; off it the
// caller nudges, which is bounded by construction.
export const nextValueInScale = (
  scale: readonly number[],
  current: number,
  direction: 1 | -1,
): number | null => {
  const currentIndex = scale.indexOf(current);
  if (currentIndex === -1) return null;
  return scale[currentIndex + direction] ?? null;
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
