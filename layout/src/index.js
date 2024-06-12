import { Board, Ship, Player, ComputerPlayer } from "../../utils.js";
import { Renderer } from "./render.js";
import "./style.css";

const BOARD_SIZE = 10;

const board1 = new Board(BOARD_SIZE, BOARD_SIZE);
const board2 = new Board(BOARD_SIZE, BOARD_SIZE);

const player = new Player("real", board1);
const comp = new ComputerPlayer(board2);

// Predetermined ship placements for demonstration
const ship1 = new Ship(3, "H", 1, 1);
const ship2 = new Ship(4, "V", 3, 3);
const ship3 = new Ship(2, "H", 5, 5);
comp.gameBoard.placeShip(ship2);
comp.gameBoard.placeShip(ship1);
comp.gameBoard.placeShip(ship3);

Renderer.renderBoard(player.gameBoard.board, "playerBoard");
Renderer.renderBoard(comp.gameBoard.board, "computerBoard", true);

let currentPlayer = player;
let opponentPlayer = comp;
// Renderer.renderBoard(
//   opponentPlayer.gameBoard.board,
//   opponentPlayer === player ? "playerBoard" : "computerBoard"
// );
let gameEnded = false; // Variable to track if the game has ended

function switchTurns() {
  currentPlayer = currentPlayer === player ? comp : player;
  opponentPlayer = opponentPlayer === player ? comp : player;
  // Renderer.renderBoard(
  //   opponentPlayer.gameBoard.board,
  //   opponentPlayer === player ? "playerBoard" : "computerBoard"
  // );
  Renderer.displayMessage(
    `It's ${currentPlayer.type === "real" ? "your" : "computer's"} turn.`
  );
}

function removeEventListener(id) {
  document.getElementById(id).removeEventListener("click", handleAttack);
}

function checkGameOver() {
  if (opponentPlayer.gameBoard.allShipsSunk()) {
    gameEnded = true;
    Renderer.displayMessage(
      `${currentPlayer.type === "real" ? "Player 1" : "Computer"} wins!`
    );
    removeEventListener("computerBoard");
  }
}

function handleAttack(event) {
  if (event.target.classList.contains("cell")) {
    const cellIndex = Array.from(event.target.parentNode.children).indexOf(
      event.target
    );
    const row = Math.floor(cellIndex / BOARD_SIZE);
    const col = cellIndex % BOARD_SIZE;

    const isValidMove = currentPlayer.attack(opponentPlayer, row, col);

    if (isValidMove) {
      console.log(
        `${
          currentPlayer.type === "real" ? "Player 1" : "Computer"
        } attacked position (${row}, ${col})`
      );

      Renderer.renderBoard(
        opponentPlayer.gameBoard.board,
        "computerBoard",
        true
      );
      checkGameOver();

      if (!gameEnded) {
        setTimeout(() => {
          switchTurns();
          if (currentPlayer.type === "computer") {
            setTimeout(() => {
              currentPlayer.makeRandomMove(opponentPlayer);
              Renderer.renderBoard(
                opponentPlayer.gameBoard.board,
                "playerBoard"
              );
              checkGameOver();
              if (!gameEnded) {
                setTimeout(() => switchTurns(), 1000); //
              }
            }, 1000);
          }
        }, 1000);
      }
    } else {
      console.log("Invalid move, try again.");
    }
  }
}

document
  .getElementById("computerBoard")
  .addEventListener("click", handleAttack);

// document.getElementById("playerBoard").addEventListener("click", (event) => {
//   if (currentPlayer === comp) {
//     handleAttack(event, "playerBoard");
//   }
// });

document.getElementById("placeShipButton").addEventListener("click", () => {
  const length = parseInt(document.getElementById("shipLength").value);
  const orientation = document.getElementById("orientation").value;
  const startRow = parseInt(document.getElementById("startRow").value);
  const startCol = parseInt(document.getElementById("startCol").value);

  const newShip = new Ship(length, orientation, startRow, startCol);
  // console.log(newShip);
  const doPlaceShip = player.gameBoard.placeShip(newShip);
  // console.log(player.gameBoard.printBoard());
  if (doPlaceShip) {
    console.log("yes");
    // console.log(player.gameBoard.printBoard());
    Renderer.renderBoard(player.gameBoard.board, "playerBoard");
  } else {
    console.log("no");
    Renderer.displayMessage("Invalid ship placement. Try again.");
  }
});

document
  .getElementById("randomPlacementButton")
  .addEventListener("click", () => {
    player.gameBoard.resetBoard();

    const lengths = [4, 3, 2];
    lengths.forEach((length) => {
      let shipPlaced = false;
      while (!shipPlaced) {
        const orientation = Math.random() < 0.5 ? "H" : "V";
        const startRow = Math.floor(Math.random() * BOARD_SIZE);
        const startCol = Math.floor(Math.random() * BOARD_SIZE);
        const newShip = new Ship(length, orientation, startRow, startCol);
        shipPlaced = player.gameBoard.placeShip(newShip);
      }
    });
    Renderer.renderBoard(player.gameBoard.board, "playerBoard");
  });

// TODO
// random ship placements
// limit number of ships placed
// switch screen play

// Ideally for OO these gameplay logic could be methods from a class itself
// as well
