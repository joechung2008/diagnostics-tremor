import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Extensions from "../Extensions";

describe("Extensions", () => {
  const mockOnLinkClick = vi.fn();

  const sampleExtensions = {
    ext1: {
      extensionName: "Extension A",
      config: { key: "value" },
    },
    ext2: {
      extensionName: "Extension B",
    },
    ext3: {
      lastError: {
        errorMessage: "Error occurred",
        time: "2023-01-01T00:00:00Z",
      },
    },
  };

  it("should render correctly with extensions", () => {
    const { container } = render(
      <Extensions extensions={sampleExtensions} onLinkClick={mockOnLinkClick} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should filter out ExtensionError and only show ExtensionInfo", () => {
    render(
      <Extensions extensions={sampleExtensions} onLinkClick={mockOnLinkClick} />
    );

    expect(screen.getByText("Extension A")).toBeInTheDocument();
    expect(screen.getByText("Extension B")).toBeInTheDocument();
    expect(screen.queryByText("Extension C")).not.toBeInTheDocument();
  });

  it("should sort extensions by key", () => {
    const unsortedExtensions = {
      z: { extensionName: "Z Extension" },
      a: { extensionName: "A Extension" },
      m: { extensionName: "M Extension" },
    };

    render(
      <Extensions
        extensions={unsortedExtensions}
        onLinkClick={mockOnLinkClick}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("A Extension");
    expect(buttons[1]).toHaveTextContent("M Extension");
    expect(buttons[2]).toHaveTextContent("Z Extension");
  });

  it("should call onLinkClick when button is clicked", () => {
    render(
      <Extensions extensions={sampleExtensions} onLinkClick={mockOnLinkClick} />
    );

    const button = screen.getByText("Extension A");
    fireEvent.click(button);

    expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
    expect(mockOnLinkClick).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent
      expect.objectContaining({
        key: "Extension A",
        name: "Extension A",
        url: "",
      })
    );
  });

  it("should render empty when no ExtensionInfo items", () => {
    const errorOnlyExtensions = {
      ext1: {
        lastError: {
          errorMessage: "Error 1",
          time: "2023-01-01T00:00:00Z",
        },
      },
    };

    const { container } = render(
      <Extensions
        extensions={errorOnlyExtensions}
        onLinkClick={mockOnLinkClick}
      />
    );

    expect(container.firstChild).toHaveProperty("children", expect.any(Object));
    expect((container.firstChild as HTMLElement).children).toHaveLength(0);
  });

  it("should handle click without onLinkClick handler", () => {
    render(<Extensions extensions={sampleExtensions} />);

    const button = screen.getByText("Extension A");
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
