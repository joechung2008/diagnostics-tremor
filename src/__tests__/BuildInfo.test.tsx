import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BuildInfo from "../BuildInfo";

describe("BuildInfo", () => {
  it("should render correctly", () => {
    const { container } = render(<BuildInfo buildVersion="1.0.0" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
