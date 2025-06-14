# 🕒 @danielsledz/react-countdown-hook

A simple React hook for creating countdown timers to any target date or time.

[![npm version](https://badge.fury.io/js/%40danielsledz%2Freact-countdown-hook.svg)](https://badge.fury.io/js/%40danielsledz%2Freact-countdown-hook)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Installation

```bash
npm install @danielsledz/react-countdown-hook
# or
yarn add @danielsledz/react-countdown-hook
# or
pnpm add @danielsledz/react-countdown-hook
```

---

## 🧠 Usage

### Basic Example

```tsx
import { useCountdown } from "@danielsledz/react-countdown-hook";

const MyComponent = () => {
  const { timeLeft, isPaused, togglePause, error } = useCountdown(
    "2025-12-31T23:59:59"
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>
        {timeLeft.direction} {timeLeft.days}d {timeLeft.hours}h{" "}
        {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
      <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
    </div>
  );
};
```

### Advanced Example with Date Object

```tsx
import { useCountdown } from "@danielsledz/react-countdown-hook";

const MyComponent = () => {
  const targetDate = new Date("2025-12-31T23:59:59");
  const { timeLeft, isPaused, togglePause, error } = useCountdown(targetDate);

  if (error) return <p>Error: {error}</p>;

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div>
      <h2>Countdown to New Year 2026</h2>
      <div style={{ fontSize: "2rem", fontFamily: "monospace" }}>
        {timeLeft.direction === "-" ? "Time remaining:" : "Time since:"}
        <br />
        {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:
        {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
      <button onClick={togglePause}>
        {isPaused ? "▶️ Resume" : "⏸️ Pause"}
      </button>
    </div>
  );
};
```

### Event Countdown Example

```tsx
import { useCountdown } from "@danielsledz/react-countdown-hook";

const EventCountdown = () => {
  const { timeLeft, isPaused, togglePause, error } = useCountdown(
    "2025-06-15T18:00:00"
  );

  if (error) return <p>Error: {error}</p>;

  const isEventPassed = timeLeft.direction === "+";

  return (
    <div>
      <h3>Summer Conference 2025</h3>
      {isEventPassed ? (
        <p>Event has passed! It's been {timeLeft.days} days since the event.</p>
      ) : (
        <div>
          <p>Event starts in:</p>
          <div>
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes}{" "}
            minutes, {timeLeft.seconds} seconds
          </div>
          <button onClick={togglePause}>
            {isPaused ? "Resume Countdown" : "Pause Countdown"}
          </button>
        </div>
      )}
    </div>
  );
};
```

---

## 📦 API

### `useCountdown(targetDate: string | Date): CountdownHook`

#### Parameters:

- `targetDate`: The date and time to count down to (string or Date object).

#### Returns:

| Name          | Type                                           | Description                                                       |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| `timeLeft`    | `{ days, hours, minutes, seconds, direction }` | Remaining time and countdown direction (`-` = future, `+` = past) |
| `isPaused`    | `boolean`                                      | Whether the countdown is paused                                   |
| `togglePause` | `() => void`                                   | Function to toggle pause/resume                                   |
| `error`       | `string \| null`                               | Error message if invalid input                                    |

### Types

```typescript
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  direction: string; // "-" for future, "+" for past
}

interface CountdownHook {
  timeLeft: TimeLeft;
  isPaused: boolean;
  togglePause: () => void;
  error: string | null;
}
```

---

## ⚠️ Error Handling

If the target date is invalid (e.g., `useCountdown("invalid-date")`), the `error` field will contain an appropriate message.

```tsx
const { error } = useCountdown("invalid-date");
if (error) {
  console.log(error); // "Invalid target date."
}
```

---

## 🧪 Testing

The package includes comprehensive unit and integration tests using Vitest and React Testing Library.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The test suite covers:

- ✅ Basic countdown functionality
- ✅ Pause/resume functionality
- ✅ Error handling for invalid dates
- ✅ Time calculations accuracy
- ✅ Edge cases and boundary conditions
- ✅ Integration scenarios
- ✅ Memory leak prevention

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Build the package (CommonJS + ESM)
npm run build

# Build TypeScript declarations
npm run build:types

# Watch for changes during development
npm run dev

# Clean build directory
npm run clean

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Build Output

The build process generates:

- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript declarations

---

## 📄 License

MIT © 2025 [Daniel Śledź](https://github.com/danielsledz)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Make your changes
5. Add tests for new functionality
6. Run tests: `npm test`
7. Build the package: `npm run build`
8. Submit a pull request

---
