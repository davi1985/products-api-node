import { describe, it, expect } from "vitest";
import { SortOptions } from "./sort-options.js";

describe("SortOptions", () => {
  it("should create SortOptions with valid field and order", () => {
    const options = SortOptions.create("name", "asc");

    expect(options.field).toBe("name");
    expect(options.order).toBe("asc");
    expect(options.isSorting()).toBe(true);
  });

  it("should default to ascending order when not specified", () => {
    const options = SortOptions.create("price", undefined);

    expect(options.field).toBe("price");
    expect(options.order).toBe("asc");
  });

  it("should return empty options when field is not provided", () => {
    const options = SortOptions.create(undefined, undefined);

    expect(options.field).toBeUndefined();
    expect(options.isSorting()).toBe(false);
  });

  it("should ignore invalid sort fields", () => {
    const options = SortOptions.create("invalid", "asc");

    expect(options.field).toBeUndefined();
    expect(options.isSorting()).toBe(false);
  });

  it("should ignore invalid sort orders", () => {
    const options = SortOptions.create("name", "invalid");

    expect(options.order).toBe("asc");
  });

  it("should get direction multiplier for ascending", () => {
    const options = SortOptions.create("name", "asc");

    expect(options.getDirection()).toBe(1);
  });

  it("should get direction multiplier for descending", () => {
    const options = SortOptions.create("price", "desc");

    expect(options.getDirection()).toBe(-1);
  });
});
