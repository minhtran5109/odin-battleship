import { Board, Ship, Player } from "../../utils.js";
import { Renderer } from "./render.js";
import "./style.css";

const BOARD_SIZE = 10;

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

let currentPlayer = player;
let opponentPlayer = comp;

function switchTurns() {
  currentPlayer = currentPlayer === player ? comp : player;
  opponentPlayer = opponentPlayer === player ? comp : player;
}

function handleAttack(event, boardElementId) {
  if (event.target.classList.contains("cell")) {
    const cellIndex = Array.from(event.target.parentNode.children).indexOf(
      event.target
    );
    const row = Math.floor(cellIndex / BOARD_SIZE);
    const col = cellIndex % BOARD_SIZE;
    // console.log(row, col);

    const isValidMove = currentPlayer.attack(opponentPlayer, row, col);

    if (isValidMove) {
      console.log(
        `${
          currentPlayer.type === "real" ? "Player 1" : "Computer"
        } attacked position (${row}, ${col})`
      );
    } else {
      console.log("Invalid move, try again.");
    }
  }
}

document.getElementById("computerBoard").addEventListener("click", (event) => {
  if (currentPlayer === player) {
    handleAttack(event, "computerBoard");
  }
});
