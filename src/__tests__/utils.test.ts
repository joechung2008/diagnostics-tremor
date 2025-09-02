import { describe, expect, it } from "vitest";
import { byKey, isExtensionInfo, toNavLink } from "../utils";

describe("utils", () => {
  describe("isExtensionInfo", () => {
    it("should return true for ExtensionInfo", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
        config: { key: "value" },
      };
      expect(isExtensionInfo(extensionInfo)).toBe(true);
    });

    it("should return false for ExtensionError", () => {
      const extensionError: ExtensionError = {
        lastError: {
          errorMessage: "Test error",
          time: "2023-01-01T00:00:00Z",
        },
      };
      expect(isExtensionInfo(extensionError)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe("byKey", () => {
    it("should return -1 when a.key < b.key", () => {
      const a: KeyedNavLink = { key: "a", name: "A" };
      const b: KeyedNavLink = { key: "b", name: "B" };
      expect(byKey(a, b)).toBe(-1);
    });

    it("should return 1 when a.key > b.key", () => {
      const a: KeyedNavLink = { key: "b", name: "B" };
      const b: KeyedNavLink = { key: "a", name: "A" };
      expect(byKey(a, b)).toBe(1);
    });

    it("should return 0 when a.key === b.key", () => {
      const a: KeyedNavLink = { key: "a", name: "A" };
      const b: KeyedNavLink = { key: "a", name: "A" };
      expect(byKey(a, b)).toBe(0);
    });
  });

  describe("toNavLink", () => {
    it("should convert ExtensionInfo to KeyedNavLink", () => {
      const extensionInfo: ExtensionInfo = {
        extensionName: "test-extension",
      };
      const expected: KeyedNavLink = {
        key: "test-extension",
        name: "test-extension",
        url: "",
      };
      expect(toNavLink(extensionInfo)).toEqual(expected);
    });
  });
});
