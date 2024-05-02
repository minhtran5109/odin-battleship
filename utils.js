let Ship = function (length) {
  this.length = length;
  this.nHits = 0;
  this.sunk = false;
};

Ship.prototype.hit = function () {
  this.nHits += 1;
};

Ship.prototype.isSunk = function () {
  if (this.nHits >= this.length) {
    this.sunk = true;
  }
};

const SHIP = "S"; // Represents a part of a ship
const EMPTY = "E"; // Represents an empty space
const HIT = "X"; // Represents a hit on a ship
const MISS = "O"; // Represents a miss

let Board = function (rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.board = this.initialiseBoard();
};

Board.prototype.initialiseBoard = function () {
  let board = [];
  for (let i = 0; i < this.rows; i++) {
    board[i] = [];
    for (let j = 0; j < this.cols; j++) {
      board[i][j] = EMPTY;
    }
  }
  return board;
};

Board.prototype.placeShip = function (ship) {};
Board.prototype.receiveAttack = function (r, c) {};

// Board.prototype.printBoard = function () {
//   for (let i = 0; i < this.rows; i++) {
//     console.log(this.board[i].join(" "));
//   }
// };

// TODO:
// expand ship to include spanning coordinates, orientation
// adjust hit for different coords?
// then test
// expand board to check if a placed ship is legal
// then test

export { Ship, Board };
