import { describe, expect, it } from "vite-plus/test";
import { nextValueInScale, nextValueOnGrid } from "../src/utils/step-length-scale.js";

const TEXT_SCALE = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128];

describe("nextValueInScale", () => {
  it("walks to the neighbouring token from on the scale", () => {
    expect(nextValueInScale(TEXT_SCALE, 16, 1)).toBe(18);
    expect(nextValueInScale(TEXT_SCALE, 16, -1)).toBe(14);
  });

  it("walks from between two tokens", () => {
    expect(nextValueInScale(TEXT_SCALE, 15, 1)).toBe(16);
    expect(nextValueInScale(TEXT_SCALE, 15, -1)).toBe(14);
  });

  it("steps off the end of the scale rather than wrapping", () => {
    expect(nextValueInScale(TEXT_SCALE, 128, 1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 12, -1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 128, -1)).toBe(96);
    expect(nextValueInScale(TEXT_SCALE, 12, 1)).toBe(14);
  });

  it("yields null above the scale so the caller nudges instead of collapsing", () => {
    expect(nextValueInScale([4, 8], 800, -1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 150, -1)).toBeNull();
    expect(nextValueInScale([16, 32, 1280], 2000, -1)).toBeNull();
  });

  it("yields null below the scale in the same way", () => {
    expect(nextValueInScale([600, 800], 4, 1)).toBeNull();
    expect(nextValueInScale(TEXT_SCALE, 11, 1)).toBeNull();
  });

  it("never steps off a lone token, in either direction", () => {
    expect(nextValueInScale([8], 8, 1)).toBeNull();
    expect(nextValueInScale([8], 8, -1)).toBeNull();
    expect(nextValueInScale([8], 800, -1)).toBeNull();
    expect(nextValueInScale([8], 2, 1)).toBeNull();
  });
});

describe("nextValueOnGrid", () => {
  it("steps to the adjacent grid cell at any magnitude", () => {
    expect(nextValueOnGrid(800, 1, 4)).toBe(804);
    expect(nextValueOnGrid(800, -1, 4)).toBe(796);
  });

  it("snaps a value between cells onto the grid", () => {
    expect(nextValueOnGrid(801, 1, 4)).toBe(804);
    expect(nextValueOnGrid(801, -1, 4)).toBe(800);
  });

  it("stops at zero rather than going negative", () => {
    expect(nextValueOnGrid(4, -1, 4)).toBe(0);
    expect(nextValueOnGrid(0, -1, 4)).toBeNull();
  });
});
