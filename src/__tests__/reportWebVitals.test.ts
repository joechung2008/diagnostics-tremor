import { describe, it, expect, vi, beforeEach } from "vitest";
import reportWebVitals from "../reportWebVitals";

// Mock web-vitals module
const mockOnCLS = vi.fn();
const mockOnINP = vi.fn();
const mockOnFCP = vi.fn();
const mockOnLCP = vi.fn();
const mockOnTTFB = vi.fn();

vi.mock("web-vitals", () => ({
  onCLS: mockOnCLS,
  onINP: mockOnINP,
  onFCP: mockOnFCP,
  onLCP: mockOnLCP,
  onTTFB: mockOnTTFB,
}));

describe("reportWebVitals", () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not call web-vitals functions when no handler is provided", async () => {
    reportWebVitals();

    // Wait for any potential async operations
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnCLS).not.toHaveBeenCalled();
    expect(mockOnINP).not.toHaveBeenCalled();
    expect(mockOnFCP).not.toHaveBeenCalled();
    expect(mockOnLCP).not.toHaveBeenCalled();
    expect(mockOnTTFB).not.toHaveBeenCalled();
  });

  it("should call all web-vitals functions when handler is provided", async () => {
    reportWebVitals(mockHandler);

    // Wait for the dynamic import to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnCLS).toHaveBeenCalledWith(mockHandler);
    expect(mockOnINP).toHaveBeenCalledWith(mockHandler);
    expect(mockOnFCP).toHaveBeenCalledWith(mockHandler);
    expect(mockOnLCP).toHaveBeenCalledWith(mockHandler);
    expect(mockOnTTFB).toHaveBeenCalledWith(mockHandler);
  });

  it("should work with different handler functions", async () => {
    const customHandler = vi.fn();

    reportWebVitals(customHandler);

    // Wait for the dynamic import to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnCLS).toHaveBeenCalledWith(customHandler);
    expect(mockOnINP).toHaveBeenCalledWith(customHandler);
    expect(mockOnFCP).toHaveBeenCalledWith(customHandler);
    expect(mockOnLCP).toHaveBeenCalledWith(customHandler);
    expect(mockOnTTFB).toHaveBeenCalledWith(customHandler);
  });
});
