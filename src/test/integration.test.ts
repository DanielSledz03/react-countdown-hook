import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import useCountdown from "../useCountdown";

describe("useCountdown Integration Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should handle multiple countdown instances", () => {
    const date1 = new Date(Date.now() + 1000 * 5);
    const date2 = new Date(Date.now() + 1000 * 10);

    const { result: result1 } = renderHook(() => useCountdown(date1));
    const { result: result2 } = renderHook(() => useCountdown(date2));

    expect(result1.current.error).toBe(null);
    expect(result2.current.error).toBe(null);
    expect(typeof result1.current.timeLeft.seconds).toBe("number");
    expect(typeof result2.current.timeLeft.seconds).toBe("number");
  });

  it("should handle date changes", () => {
    const initialDate = new Date(Date.now() + 1000 * 60);
    const { result, rerender } = renderHook(({ date }) => useCountdown(date), {
      initialProps: { date: initialDate },
    });

    expect(result.current.error).toBe(null);

    const newDate = new Date(Date.now() + 1000 * 60 * 2);
    rerender({ date: newDate });

    expect(result.current.error).toBe(null);
  });

  it("should handle pause state correctly", () => {
    const futureDate = new Date(Date.now() + 1000 * 10);
    const { result } = renderHook(() => useCountdown(futureDate));

    // Initial state should not be paused
    expect(result.current.isPaused).toBe(false);

    // Toggle pause
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(true);

    // Toggle pause again
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isPaused).toBe(false);
  });

  it("should handle different date formats", () => {
    const dateString = new Date(Date.now() + 1000 * 60 * 60).toISOString();
    const dateObject = new Date(Date.now() + 1000 * 60 * 60);

    const { result: result1 } = renderHook(() => useCountdown(dateString));
    const { result: result2 } = renderHook(() => useCountdown(dateObject));

    expect(result1.current.error).toBe(null);
    expect(result2.current.error).toBe(null);
    expect(typeof result1.current.timeLeft.direction).toBe("string");
    expect(typeof result2.current.timeLeft.direction).toBe("string");
  });

  it("should handle edge cases", () => {
    // Test with current time
    const now = new Date();
    const { result: result1 } = renderHook(() => useCountdown(now));

    // Test with far future
    const farFuture = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365); // 1 year
    const { result: result2 } = renderHook(() => useCountdown(farFuture));

    // Test with far past
    const farPast = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365); // 1 year ago
    const { result: result3 } = renderHook(() => useCountdown(farPast));

    expect(result1.current.error).toBe(null);
    expect(result2.current.error).toBe(null);
    expect(result3.current.error).toBe(null);
  });
});
