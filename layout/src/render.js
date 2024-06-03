export class Renderer {
  static renderBoard(board, boardElementId) {
    const boardElement = document.getElementById(boardElementId);
    boardElement.innerHTML = ""; // Clear the board element before rendering new content
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (board[row][col] === "S") {
          cell.classList.add("ship");
        } else if (board[row][col] === "X") {
          cell.classList.add("hit");
        } else if (board[row][col] === "O") {
          cell.classList.add("miss");
        }
        boardElement.appendChild(cell);
      }
    }
  }

  static displayMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
  }
}
