import { Ship } from "./index";
// import { describe } from "node: test";

let ship1;
beforeAll(() => {
  ship1 = new Ship(1);
});

describe("Testing ship interface", () => {
  test("correct ship length", () => {
    expect(ship1.length).toBe(1);
  });
});
