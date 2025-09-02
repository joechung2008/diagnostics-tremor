import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Extension from "../Extension";

describe("Extension", () => {
  it("should render correctly with all props", () => {
    const { container } = render(
      <Extension
        extensionName="Test Extension"
        config={{ key1: "value1", key2: "value2" }}
        stageDefinition={{
          stage1: ["step1", "step2"],
          stage2: ["step3"],
        }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly without config", () => {
    const { container } = render(
      <Extension
        extensionName="Test Extension"
        stageDefinition={{
          stage1: ["step1", "step2"],
        }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly without stageDefinition", () => {
    const { container } = render(
      <Extension extensionName="Test Extension" config={{ key1: "value1" }} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render correctly with minimal props", () => {
    const { container } = render(<Extension extensionName="Test Extension" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
