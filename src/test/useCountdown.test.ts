import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useCountdown from "../useCountdown";

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should handle invalid date string", () => {
    const { result } = renderHook(() => useCountdown("invalid-date"));

    expect(result.current.error).toBe("Invalid target date.");
    expect(result.current.timeLeft.days).toBe(0);
    expect(result.current.timeLeft.hours).toBe(0);
    expect(result.current.timeLeft.minutes).toBe(0);
    expect(result.current.timeLeft.seconds).toBe(0);
    expect(result.current.timeLeft.direction).toBe("");
  });

  it("should handle pause and resume functionality", () => {
    const futureDate = new Date(Date.now() + 10000); // 10 seconds from now
    const { result } = renderHook(() => useCountdown(futureDate));

    expect(result.current.isPaused).toBe(false);

    // Pause the countdown
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(true);

    // Resume the countdown
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(false);
  });

  it("should return valid time structure", () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 day from now
    const { result } = renderHook(() => useCountdown(futureDate));

    expect(result.current.timeLeft).toHaveProperty("days");
    expect(result.current.timeLeft).toHaveProperty("hours");
    expect(result.current.timeLeft).toHaveProperty("minutes");
    expect(result.current.timeLeft).toHaveProperty("seconds");
    expect(result.current.timeLeft).toHaveProperty("direction");
    expect(result.current).toHaveProperty("isPaused");
    expect(result.current).toHaveProperty("togglePause");
    expect(result.current).toHaveProperty("error");
  });

  it("should handle string date input", () => {
    const futureDateString = new Date(
      Date.now() + 1000 * 60 * 60
    ).toISOString();
    const { result } = renderHook(() => useCountdown(futureDateString));

    expect(result.current.error).toBe(null);
    expect(typeof result.current.timeLeft.days).toBe("number");
    expect(typeof result.current.timeLeft.hours).toBe("number");
    expect(typeof result.current.timeLeft.minutes).toBe("number");
    expect(typeof result.current.timeLeft.seconds).toBe("number");
    expect(typeof result.current.timeLeft.direction).toBe("string");
  });

  it("should handle Date object input", () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const { result } = renderHook(() => useCountdown(futureDate));

    expect(result.current.error).toBe(null);
    expect(typeof result.current.timeLeft.days).toBe("number");
    expect(typeof result.current.timeLeft.hours).toBe("number");
    expect(typeof result.current.timeLeft.minutes).toBe("number");
    expect(typeof result.current.timeLeft.seconds).toBe("number");
    expect(typeof result.current.timeLeft.direction).toBe("string");
  });

  it("should handle past dates", () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
    const { result } = renderHook(() => useCountdown(pastDate));

    expect(result.current.error).toBe(null);
    expect(typeof result.current.timeLeft.days).toBe("number");
    expect(typeof result.current.timeLeft.hours).toBe("number");
    expect(typeof result.current.timeLeft.minutes).toBe("number");
    expect(typeof result.current.timeLeft.seconds).toBe("number");
    expect(typeof result.current.timeLeft.direction).toBe("string");
  });

  it("should handle current date", () => {
    const now = new Date();
    const { result } = renderHook(() => useCountdown(now));

    expect(result.current.error).toBe(null);
    expect(typeof result.current.timeLeft.days).toBe("number");
    expect(typeof result.current.timeLeft.hours).toBe("number");
    expect(typeof result.current.timeLeft.minutes).toBe("number");
    expect(typeof result.current.timeLeft.seconds).toBe("number");
    expect(typeof result.current.timeLeft.direction).toBe("string");
  });
});
