import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from "@radix-ui/react-dropdown-menu";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import App from "../App";

vi.mock("../BuildInfo", () => ({
  default: () => <div>BuildInfo</div>,
}));

vi.mock("../ServerInfo", () => ({
  default: () => <div>ServerInfo</div>,
}));

vi.mock("../Extensions", () => ({
  default: (props: ExtensionsProps) => (
    <div>
      Extensions
      <button
        type="button"
        onClick={(e) => {
          props.onLinkClick?.(e, {
            key: "websites",
            name: "WebsitesExt",
          });
        }}
      >
        Extension Link
      </button>
    </div>
  ),
}));

vi.mock("../Extension", () => ({
  default: (props: ExtensionProps) => (
    <div>Extension {props.extensionName || ""}</div>
  ),
}));

// Mock DropdownMenu to always render its children
vi.mock("../components/DropdownMenu", () => ({
  DropdownMenu: ({ children }: DropdownMenuProps) => <>{children}</>,
  DropdownMenuTrigger: ({ children }: DropdownMenuTriggerProps) => (
    <>{children}</>
  ),
  DropdownMenuContent: ({ children }: DropdownMenuContentProps) => (
    <>{children}</>
  ),
  DropdownMenuCheckboxItem: ({
    children,
    onSelect,
    ...props
  }: DropdownMenuCheckboxItemProps) => {
    // Workaround for unused `onSelect` prop being the wrong type.
    void onSelect;
    return <div {...props}>{children}</div>;
  },
}));

window.fetch = vi.fn();

const diagnosticsMock: Diagnostics = {
  buildInfo: {
    buildVersion: "TestBuild",
  },
  extensions: {
    paasserverless: { extensionName: "PaasExt" },
    websites: { extensionName: "WebsitesExt" },
  },
  serverInfo: {
    deploymentId: "TestServer",
    extensionSync: {
      totalSyncAllCount: 0,
    },
    hostname: "hostname",
    nodeVersions: "22.x",
    serverId: "serverId",
    uptime: 12345,
  },
};

describe("App", () => {
  beforeEach(() => {
    (window.fetch as Mock).mockResolvedValue({
      json: async () => diagnosticsMock,
    });
  });

  afterEach(() => {
    (window.fetch as Mock).mockClear();
  });

  it("renders nothing while loading diagnostics", async () => {
    (window.fetch as Mock).mockResolvedValueOnce({
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
    expect(
      screen.getByText((content) => content.includes("WebsitesExt"))
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Build Information"));
    expect(screen.getByText("BuildInfo")).toBeInTheDocument();
  });
});
