import { Board, Ship, Player } from "../../utils.js";
import "./style.css";

let ship = new Ship(2, "V", 1, 1);

const BOARD_SIZE = 10;

function createBoard(size) {
  const boardElement = document.getElementById("gameBoard");
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = ""; // Optional: You can add text inside the cell
      boardElement.appendChild(cell);
    }
  }
}

createBoard(BOARD_SIZE);
