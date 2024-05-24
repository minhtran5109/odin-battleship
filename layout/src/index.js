import { Board, Ship, Player } from "../../utils.js";
import { Renderer } from "./render.js";
import "./style.css";

const BOARD_SIZE = 10;

// function createBoard(size) {
//   const boardElement = document.getElementById("gameBoard");
//   for (let row = 0; row < size; row++) {
//     for (let col = 0; col < size; col++) {
//       const cell = document.createElement("div");
//       cell.classList.add("cell");
//       cell.dataset.row = row;
//       cell.dataset.col = col;
//       cell.textContent = ""; // Optional: You can add text inside the cell
//       boardElement.appendChild(cell);
//     }
//   }
// }

// createBoard(BOARD_SIZE);

const board1 = new Board(BOARD_SIZE, BOARD_SIZE);
const board2 = new Board(BOARD_SIZE, BOARD_SIZE);

const player = new Player("real", board1);
const comp = new Player("computer", board2);

// Predetermined ship placements for demonstration
const ship1 = new Ship(3, "H", 1, 1);
const ship2 = new Ship(4, "V", 3, 3);
const ship3 = new Ship(2, "H", 5, 5);
player.gameBoard.placeShip(ship2);
player.gameBoard.placeShip(ship1);
comp.gameBoard.placeShip(ship3);

Renderer.renderBoard(player.gameBoard.board, "playerBoard");
Renderer.renderBoard(comp.gameBoard.board, "computerBoard");
