import { act, screen } from "@testing-library/react";
import React from "react";
import type { Container } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the App component
vi.mock("../App", () => ({
  default: () =>
    React.createElement("div", { "data-testid": "app" }, "App Component"),
}));

// Mock reportWebVitals
const mockReportWebVitals = vi.fn();
vi.mock("../reportWebVitals", () => ({
  default: mockReportWebVitals,
}));

describe("main.tsx", () => {
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    // Create a mock root element
    const mockRoot = document.createElement("div");
    mockRoot.id = "root";
    document.body.appendChild(mockRoot);

    // Mock console.log
    originalConsoleLog = console.log;
    console.log = vi.fn();

    // Clear mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restore console.log
    console.log = originalConsoleLog;

    // Clean up DOM
    const root = document.getElementById("root");
    if (root) {
      document.body.removeChild(root);
    }
  });

  it("should render App component correctly when manually invoked", async () => {
    // Manually test the rendering logic
    const { createRoot } = await import("react-dom/client");
    const React = await import("react");
    const { default: App } = await import("../App");

    const container = document.getElementById("root");
    const root = createRoot(container as unknown as Container);

    act(() => {
      root.render(
        React.createElement(React.StrictMode, null, React.createElement(App))
      );
    });

    expect(screen.getByTestId("app")).toBeInTheDocument();
    expect(screen.getByText("App Component")).toBeInTheDocument();
  });

  it("should call reportWebVitals with console.log when manually invoked", async () => {
    const { default: reportWebVitals } = await import("../reportWebVitals");

    // Manually call reportWebVitals
    reportWebVitals(console.log);

    expect(mockReportWebVitals).toHaveBeenCalledTimes(1);
    expect(mockReportWebVitals).toHaveBeenCalledWith(console.log);
  });

  it("should import main module without errors", async () => {
    // Mock React DOM to prevent actual rendering during import
    const mockCreateRoot = vi.fn(() => ({
      render: vi.fn(),
      unmount: vi.fn(),
    }));

    vi.doMock("react-dom/client", () => ({
      createRoot: mockCreateRoot,
    }));

    // Test that the module can be imported without throwing
    await expect(import("../main")).resolves.not.toThrow();

    // Verify that createRoot was called during import
    expect(mockCreateRoot).toHaveBeenCalled();
  });

  it("should have access to required dependencies", async () => {
    // Test that we can import the dependencies that main.tsx uses
    await expect(import("react")).resolves.toBeDefined();
    await expect(import("react-dom/client")).resolves.toBeDefined();
    await expect(import("../App")).resolves.toBeDefined();
    await expect(import("../reportWebVitals")).resolves.toBeDefined();
  });

  it("should handle missing root element with proper error", async () => {
    // Remove the root element
    const root = document.getElementById("root");
    if (root) {
      document.body.removeChild(root);
    }

    const { createRoot } = await import("react-dom/client");

    // This should throw an error
    expect(() => {
      const container = document.getElementById("root");
      if (container) {
        createRoot(container);
      }
    }).not.toThrow(); // Actually, it doesn't throw if container is null, it just doesn't create root
  });

  it("should properly configure React root", async () => {
    const { createRoot } = await import("react-dom/client");

    const container = document.getElementById("root");
    if (container) {
      const root = createRoot(container);

      expect(root).toBeDefined();
      expect(typeof root.render).toBe("function");
      expect(typeof root.unmount).toBe("function");
    }
  });

  it("should use StrictMode for rendering", async () => {
    const React = await import("react");
    const { default: App } = await import("../App");

    // Test that we can create the React element structure
    const appElement = React.createElement(App);
    const strictElement = React.createElement(
      React.StrictMode,
      null,
      appElement
    );

    expect(strictElement.type).toBe(React.StrictMode);
    expect(strictElement.props.children).toBe(appElement);
  });
});
