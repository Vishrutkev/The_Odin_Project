const selectors = Selectors();

function createEmptyBoard(rows, columns) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }
  return board;
}

function GameBoard() {
  const rows = 3;
  const columns = 3;
  const { cells } = Selectors();
  let board = createEmptyBoard(rows, columns);
  let currentPlayer = "X";

  return {
    getBoard: function () {
      return JSON.parse(JSON.stringify(board));
    },
    updateGameBoard: function (value, row, column) {
      board[row - 1][column - 1] = value;
    },
    resetGameBoard: function () {
      board = createEmptyBoard(rows, columns);
    },
    resetFrontEnd: function () {
      cells.forEach((cell) => {
        cell.classList.remove("disabled");
        cell.textContent = "";
        cell.style.color = "black";
        cell.style.fontSize = "2em";
      });
    },
    setEmptyBoard: function () {
      board = createEmptyBoard(rows, columns);
    },
    currentPlayer: currentPlayer,
  };
}

function checkWinner(board) {
  // Check rows
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return [
        [i, 0],
        [i, 1],
        [i, 2],
      ]; // Return winning cell positions
    }
  }

  // Check columns
  for (let j = 0; j < board[0].length; j++) {
    if (
      board[0][j] !== "" &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return [
        [0, j],
        [1, j],
        [2, j],
      ]; // Return winning cell positions
    }
  }

  // Check diagonals
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ]; // Return winning cell positions
  }
  if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 0],
    ]; // Return winning cell positions
  }

  // Check if all cells are filled
  let isBoardFull = true;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        isBoardFull = false;
        break;
      }
    }
    if (!isBoardFull) {
      break;
    }
  }

  if (isBoardFull) {
    return "tie";
  }
  // If no winner is found
  return null;
}

function PrintXO() {
  const { cells } = Selectors();
  const gridSize = 3;
  const gameBoard = GameBoard();

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("disabled")) {
        const row = Math.floor(index / gridSize) + 1;
        const column = (index % gridSize) + 1;
        gameBoard.updateGameBoard(gameBoard.currentPlayer, row, column);
        cell.classList.add(gameBoard.currentPlayer.toLowerCase());
        cell.classList.add("disabled");
        cell.textContent = gameBoard.currentPlayer;
        gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";
      }
      checkWin(gameBoard, gameBoard.getBoard());
    });
  });

  Reload(gameBoard);
}

function checkWin(gameBoard, board) {
  const { cells, whoWon } = Selectors();
  let winningPositions = checkWinner(board);
  if (winningPositions) {
    if (winningPositions === "tie") {
      whoWon.textContent = "It's a Tie";
      return;
    }
    winningPositions.forEach(([row, col]) => {
      const { winCells } = Selectors(row, col);
      winCells.style.color = "purple";
      winCells.style.fontSize = "40px";
    });
    cells.forEach((cell) => {
      cell.classList.add("disabled");
    });
    winningPositions = null;
    whoWon.textContent = `Player ${
      gameBoard.currentPlayer === "X" ? "O" : "X"
    } Won`;
  }
}

function Reload(gameBoard) {
  const { reload, whoWon } = Selectors();
  reload.addEventListener("click", () => {
    gameBoard.resetFrontEnd();
    gameBoard.resetGameBoard();
    gameBoard.currentPlayer = "X";
    whoWon.textContent = "";
  });
}

function Selectors(row, col) {
  const cells = document.querySelectorAll(".cell");
  const reload = document.querySelector(".reload");
  const winCells = document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`
  );
  const whoWon = document.querySelector(".who-won");
  return { cells, reload, winCells, whoWon };
}

PrintXO();
