import { Ship } from "./index";
// import { describe } from "node: test";

let ship1;
let ship2;
beforeAll(() => {
  ship1 = new Ship(1);
  ship2 = new Ship(2);
});

describe("Testing ship interface", () => {
  test("correct ships length", () => {
    expect(ship1.length).toBe(1);
    expect(ship2.length).toBe(2);
  });
  describe("ships getting hit", () => {
    beforeAll(() => {
      ship1.hit();
      ship1.hit();
      ship2.hit();
      ship1.isSunk();
      ship2.isSunk();
    });
    test("number of hits", () => {
      expect(ship1.nHits).toBe(2);
      expect(ship2.nHits).toBe(1);
    });
    test("check if a ship is sunk", () => {
      expect(ship1.sunk).toBeTruthy();
      expect(ship2.sunk).toBeFalsy();

      ship2.hit();
      ship2.isSunk();
      expect(ship2.sunk).toBeTruthy();
    });
  });
});
