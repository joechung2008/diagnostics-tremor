import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ServerInfo from "../ServerInfo";

describe("ServerInfo", () => {
  it("should render correctly", () => {
    const { container } = render(
      <ServerInfo
        deploymentId="dep-123"
        extensionSync={{ totalSyncAllCount: 5 }}
        hostname="localhost"
        nodeVersions="v18.0.0"
        serverId="srv-456"
        uptime={3600}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
