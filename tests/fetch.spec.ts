import fetch from "../src/index";
import { describe, test, expect } from "@jest/globals";

describe("sum", () => {
  test("must return an object", () => {
    expect(fetch("https://www.google.com")).toEqual({
      assets: [],
      links: [],
    });
  });

  test("must return null", () => {
    expect(fetch()).toEqual(null);
  });
});
