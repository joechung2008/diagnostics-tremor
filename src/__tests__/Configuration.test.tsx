import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Configuration from "../Configuration";

describe("Configuration", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Configuration config={{ key1: "value1", key2: "value2" }} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
