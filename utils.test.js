import { Board, Ship } from "./utils";
// import { describe } from "node: test";

let ship1;
let ship2;
let ship3;
let gameBoard;
const rows = 6;
const cols = 6;

beforeEach(() => {
  ship1 = new Ship(1, "V", 1, 1);
  ship2 = new Ship(2, "H", 2, 2);
  ship3 = new Ship(3, "V", 3, 5);
});

describe("Testing ship interface", () => {
  test("correct ships length", () => {
    expect(ship1.length).toBe(1);
    expect(ship2.length).toBe(2);
    expect(ship3.length).toBe(3);
  });
  test("ship having correct coordinates", () => {
    // ship 1 is only of length 1 so it should not span any additional coordinates
    expect(ship1.coordinates[0]).toEqual({ row: 1, col: 1 });
    expect(ship1.coordinates[1]).toBeUndefined();

    // ship 2 is placed horizontally, and span 2 coords
    expect(ship2.coordinates.length).toBe(2);
    expect(ship2.coordinates[0]).toEqual({ row: 2, col: 2 });
    expect(ship2.coordinates[1]).toEqual({ row: 2, col: 3 });
    expect(ship1.coordinates[2]).toBeUndefined();

    //ship 3 span 3 coords vertically
    expect(ship3.coordinates.length).toBe(3);
    expect(ship3.coordinates[0]).toEqual({ row: 3, col: 5 });
    expect(ship3.coordinates[1]).toEqual({ row: 4, col: 5 });
    expect(ship3.coordinates[2]).toEqual({ row: 5, col: 5 });
    expect(ship1.coordinates[3]).toBeUndefined();
  });

  describe("ships getting hit", () => {
    beforeEach(() => {
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

// const SHIP = "S"; // Represents a part of a ship
// const EMPTY = "E"; // Represents an empty space
// const HIT = "X"; // Represents a hit on a ship
// const MISS = "O"; // Represents a miss
describe("Testing gameboard", () => {
  gameBoard = new Board(rows, cols);
  test("board initialisation", () => {
    // console.log(gameBoard.board[0][0]);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        expect(gameBoard.board[i][j]).toEqual("E");
      }
    }
  });

  describe("board behaviors with ships", () => {
    beforeAll(() => {
      gameBoard = new Board(rows, cols);
      gameBoard.placeShip(ship1);
      gameBoard.placeShip(ship2);
    });
    test("placing ships", () => {
      // gameBoard.placeShip(ship1);
      // gameBoard.placeShip(ship2);
      expect(gameBoard.ships).toContainEqual(ship1);
      expect(gameBoard.ships).toContainEqual(ship2);
      expect(gameBoard.board[1][1]).toEqual("S");
      expect(gameBoard.board[2][2]).toEqual("S");
      expect(gameBoard.board[2][3]).toEqual("S");
    });

    test("receiving attacks", () => {
      // gameBoard.placeShip(ship1);
      // gameBoard.placeShip(ship2);

      //attacks missing
      gameBoard.receiveAttack(0, 0);
      gameBoard.receiveAttack(4, 4);
      expect(gameBoard.board[0][0]).toEqual("O");
      expect(gameBoard.board[4][4]).toEqual("O");

      //attacks hitting
      gameBoard.receiveAttack(1, 1);
      gameBoard.receiveAttack(2, 3);
      expect(gameBoard.board[1][1]).toEqual("X");
      expect(gameBoard.board[2][3]).toEqual("X");
      // console.log(ship2);
      expect(gameBoard.ships[0].nHits).toBe(1);
      expect(gameBoard.ships[1].nHits).toBe(1);
    });

    test("are all ships sunk", () => {
      gameBoard.printBoard();
      // console.log(gameBoard.ships[1]);

      // ship2 expect one more hit to be sunk, so not all ships are sunk
      expect(gameBoard.ships[0].sunk).toBeTruthy();
      expect(gameBoard.ships[1].sunk).toBeFalsy();
      expect(gameBoard.allShipsSunk()).toBeFalsy();

      // ship2 take one more hit, now all ships are sunk
      gameBoard.receiveAttack(2, 2);
      expect(gameBoard.ships[1].sunk).toBeTruthy();
      expect(gameBoard.allShipsSunk()).toBeTruthy();

      gameBoard.printBoard();
    });
  });
});
