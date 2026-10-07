import { describe, it, expect } from "vitest";
import { getTimeUntil } from "../countdown";

describe("getTimeUntil", () => {
  it("returns correct days/hours/minutes/seconds for a future date", () => {
    const now = new Date("2027-03-18T18:00:00Z");
    const target = new Date("2027-03-19T18:00:00Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("returns zeros when target has passed", () => {
    const now = new Date("2027-03-20T00:00:00Z");
    const target = new Date("2027-03-19T18:00:00Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("handles sub-day diffs correctly", () => {
    const now = new Date("2027-03-19T15:30:45Z");
    const target = new Date("2027-03-19T18:45:50Z");
    expect(getTimeUntil(target, now)).toEqual({
      days: 0,
      hours: 3,
      minutes: 15,
      seconds: 5,
    });
  });
});
