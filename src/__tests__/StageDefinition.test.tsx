import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StageDefinition from "../StageDefinition";

describe("StageDefinition", () => {
  it("should render correctly", () => {
    const { container } = render(
      <StageDefinition
        stageDefinition={{
          stage1: ["step1", "step2"],
          stage2: ["step3"],
        }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
