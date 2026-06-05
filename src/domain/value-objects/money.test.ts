import { describe, it, expect } from "vitest";
import { Money } from "./money.js";

describe("Money", () => {
  it("should create Money with positive amount", () => {
    const money = new Money(29.99);

    expect(money.amount).toBe(29.99);
  });

  it("should create Money with zero amount", () => {
    const money = new Money(0);

    expect(money.amount).toBe(0);
  });

  it("should throw error for negative amount", () => {
    expect(() => new Money(-1)).toThrow("Amount cannot be negative");
  });

  it("should format with 2 decimal places", () => {
    const money = new Money(29.9);

    expect(money.format()).toBe("29.90");
  });

  it("should compare two Money values with lessThan", () => {
    const small = new Money(10);
    const large = new Money(20);

    expect(small.lessThan(large)).toBe(true);
    expect(large.lessThan(small)).toBe(false);
  });

  it("should compare two Money values with greaterThan", () => {
    const small = new Money(10);
    const large = new Money(20);

    expect(large.greaterThan(small)).toBe(true);
    expect(small.greaterThan(large)).toBe(false);
  });

  it("should check equality with equals", () => {
    const money1 = new Money(15.5);
    const money2 = new Money(15.5);
    const money3 = new Money(20);

    expect(money1.equals(money2)).toBe(true);
    expect(money1.equals(money3)).toBe(false);
  });
});
