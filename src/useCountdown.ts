import { useState, useEffect } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  direction: string;
}

export interface CountdownHook {
  timeLeft: TimeLeft;
  isPaused: boolean;
  togglePause: () => void;
  error: string | null;
}

const useCountdown = (targetDate: string | Date): CountdownHook => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    direction: "",
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const calculateTimeLeft = (): TimeLeft => {
      try {
        const now = Date.now();
        const target = new Date(targetDate);
        if (isNaN(target.getTime())) throw new Error("Invalid target date.");

        const difference = target.getTime() - now;
        const isFuture = difference > 0;
        const absoluteDifference = Math.abs(difference);

        let remaining = absoluteDifference;

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        remaining -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        remaining -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(remaining / (1000 * 60));
        remaining -= minutes * (1000 * 60);

        const seconds = Math.floor(remaining / 1000);

        const direction = isFuture ? "-" : "+";

        return { days, hours, minutes, seconds, direction };
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "An unexpected error occurred"
        );
        return { days: 0, hours: 0, minutes: 0, seconds: 0, direction: "" };
      }
    };

    const updateCountdown = () => setTimeLeft(calculateTimeLeft());
    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [isPaused, targetDate]);

  const togglePause = () => setIsPaused(!isPaused);

  return { timeLeft, isPaused, togglePause, error };
};

export default useCountdown;
