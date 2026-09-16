// Pure stepping math for the edit panel's arrow keys, kept apart from the
// CSSOM walk that discovers the scales so it can be reasoned about and
// tested without a document.

// The arrow keys walk a project's token scale (Radix/Chakra spacing, Tailwind
// `--text-*`, …) so values land on design-system steps. The walk starts only
// from a value already on the scale. Stepping onto the scale from between two
// tokens would move the value by the width of whatever gap it sits in, and one
// family can be arbitrarily sparse — icon sizes and a container width both
// resolve to "size" — so that gap has no upper bound; a 800px max-width
// against a 16/32/1280 scale collapsed to 32 on one press. Off the scale the
// caller nudges instead, which is bounded by construction.
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
