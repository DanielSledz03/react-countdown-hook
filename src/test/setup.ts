import { vi } from "vitest";

// Mock timers for testing
vi.useFakeTimers();

// Setup global test environment
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Ensure all timer functions are available and properly mocked
if (!global.setInterval) {
  // @ts-ignore
  global.setInterval = vi.fn((cb, ms) => setTimeout(cb, ms));
}
if (!global.clearInterval) {
  // @ts-ignore
  global.clearInterval = vi.fn((id) => clearTimeout(id));
}
