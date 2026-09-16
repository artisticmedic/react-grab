import { describe, expect, it } from "vite-plus/test";
import { nextValueInScale } from "../src/utils/collect-design-tokens.js";

const TEXT_SCALE = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128];

describe("nextValueInScale", () => {
  it("walks the neighbouring token inside the scale", () => {
    expect(nextValueInScale(TEXT_SCALE, 16, 1)).toBe(18);
    expect(nextValueInScale(TEXT_SCALE, 16, -1)).toBe(14);
    expect(nextValueInScale(TEXT_SCALE, 15, 1)).toBe(16);
    expect(nextValueInScale(TEXT_SCALE, 15, -1)).toBe(14);
  });

  it("snaps an off-scale value that sits near a bound", () => {
    expect(nextValueInScale(TEXT_SCALE, 150, -1)).toBe(128);
    expect(nextValueInScale(TEXT_SCALE, 11, 1)).toBe(12);
  });

  it("falls back to a raw step rather than teleporting onto a distant bound", () => {
    expect(nextValueInScale([4, 8], 800, -1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 800, -1)).toBeNull();
    expect(nextValueInScale([600, 800], 4, 1)).toBeNull();
  });

  it("reaches a lone token only from within its own magnitude", () => {
    expect(nextValueInScale([8], 12, -1)).toBe(8);
    expect(nextValueInScale([8], 800, -1)).toBeNull();
  });

  it("yields null when stepping away from the scale", () => {
    expect(nextValueInScale(TEXT_SCALE, 128, 1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 12, -1)).toBeNull();
  });
});
