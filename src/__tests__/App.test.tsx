import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

vi.mock("../BuildInfo", () => ({
  default: () => <div>BuildInfo</div>,
}));

vi.mock("../ServerInfo", () => ({
  default: () => <div>ServerInfo</div>,
}));

vi.mock("../Extensions", () => ({
  default: (props: any) => (
    <div>
      Extensions
      <button onClick={() => props.onLinkClick?.({}, { key: "websites" })}>
        Extension Link
      </button>
    </div>
  ),
}));

vi.mock("../Extension", () => ({
  default: (props: any) => <div>Extension {props.name || ""}</div>,
}));

vi.mock("../utils", () => ({
  isExtensionInfo: (ext: any) => !!ext,
}));

// Mock DropdownMenu to always render its children
vi.mock("../components/DropdownMenu", () => ({
  DropdownMenu: ({ children }: any) => <>{children}</>,
  DropdownMenuTrigger: ({ children }: any) => <>{children}</>,
  DropdownMenuContent: ({ children }: any) => <>{children}</>,
  DropdownMenuCheckboxItem: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

window.fetch = vi.fn();

const diagnosticsMock = {
  buildInfo: { name: "TestBuild" },
  extensions: {
    websites: { name: "WebsitesExt" },
    paasserverless: { name: "PaasExt" },
  },
  serverInfo: { name: "TestServer" },
};

describe("App", () => {
  beforeEach(() => {
    (window.fetch as any).mockResolvedValue({
      json: async () => diagnosticsMock,
    });
  });

  afterEach(() => {
    (window.fetch as any).mockClear();
  });

  it("renders nothing while loading diagnostics", async () => {
    (window.fetch as any).mockResolvedValueOnce({
      json: async () => diagnosticsMock,
    });
    render(<App />);
    expect(screen.queryByText("BuildInfo")).toBeNull();
    await waitFor(() => screen.getByText("Build Information"));
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByText("BuildInfo")).toBeInTheDocument();
  });

  it("renders BuildInfo when Build Information tab is selected", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Build Information"));
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByText("BuildInfo")).toBeInTheDocument();
  });

  it("switches tabs and renders correct content", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Build Information"));
    const extensionTabs = screen.getAllByText("Extensions");
    fireEvent.click(extensionTabs[0]);
    expect(extensionTabs[1]).toBeInTheDocument();
    fireEvent.click(screen.getByText("Server Information"));
    expect(screen.getByText("ServerInfo")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByText("BuildInfo")).toBeInTheDocument();
  });

  it("shows extension when extension button is clicked", async () => {
    render(<App />);
    await waitFor(() => screen.getByText("Build Information"));
    const extensionTabs = screen.getAllByText("Extensions");
    fireEvent.click(extensionTabs[0]);
    fireEvent.click(screen.getByText("websites"));
    expect(screen.getByText("Extension WebsitesExt")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByText("BuildInfo")).toBeInTheDocument();
  });
});
