function Selectors(row, col) {
  const cells = document.querySelectorAll(".cell");
  const reload = document.querySelector(".reload");
  const winCells = document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`
  );
  const whoWon = document.querySelector(".who-won");
  const roundCount = document.querySelector(".round-count");
  const playerxWin = document.querySelector(".player-x");
  const playeroWin = document.querySelector(".player-o");
  const nextRoundBtn = document.querySelector(".next-round-btn");
  return {
    cells,
    reload,
    winCells,
    whoWon,
    roundCount,
    playerxWin,
    playeroWin,
    nextRoundBtn,
  };
}

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
  const { cells, whoWon, roundCount, playeroWin, playerxWin, nextRoundBtn } =
    Selectors();
  let board = createEmptyBoard(rows, columns);
  let numOfRound = 1;
  let currentPlayer = "X";
  let playerXWin = 0;
  let playerOWin = 0;

  return {
    getBoard: function () {
      return JSON.parse(JSON.stringify(board));
    },
    updateGameBoard: function (value, row, column) {
      board[row - 1][column - 1] = value;
    },
    resetFrontEnd: function () {
      cells.forEach((cell) => {
        cell.classList.remove("disabled");
        cell.textContent = "";
        cell.style.color = "black";
        cell.style.fontSize = "3em";
      });
      whoWon.textContent = "";
      board = createEmptyBoard(rows, columns);
      nextRoundBtn.disabled = false;
      nextRoundBtn.style.cursor = "cursor";
    },
    resetEverything: function () {
      roundCount.textContent = "(1)";
      playeroWin.textContent = " 0";
      playerxWin.textContent = " 0";
    },
    setEmptyBoard: function () {
      board = createEmptyBoard(rows, columns);
    },
    currentPlayer: currentPlayer,
    numOfRound: numOfRound,
    playerOWin: playerOWin,
    playerXWin: playerXWin,
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
      winCells.style.color = "darkgreen";
      winCells.style.fontSize = "3.5rem";
    });
    cells.forEach((cell) => {
      cell.classList.add("disabled");
    });
    winningPositions = null;
    renderWins(gameBoard);
  }
}

function Reload(gameBoard) {
  const { reload } = Selectors();
  reload.addEventListener("click", () => {
    gameBoard.resetFrontEnd();
    gameBoard.resetEverything();
    gameBoard.currentPlayer = "X";
    gameBoard.numOfRound = 0;
    gameBoard.playerOWin = 0;
    gameBoard.playerXWin = 0;
  });
}

function renderWins(gameBoard) {
  const { whoWon, roundCount, playeroWin, playerxWin, nextRoundBtn } =
    Selectors();
  let currentWinner = gameBoard.currentPlayer === "X" ? "O" : "X";
  if (currentWinner === "X") {
    gameBoard.playerXWin += 1;
    playerxWin.textContent = " " + gameBoard.playerXWin;
  } else {
    gameBoard.playerOWin += 1;
    playeroWin.textContent = " " + gameBoard.playerOWin;
  }
  if (gameBoard.numOfRound < 5) {
    whoWon.textContent = `Player ${currentWinner} Won this Round`;
  } else {
    console.log("X = " + gameBoard.playerXWin);
    console.log("O = " + gameBoard.playerOWin);
    whoWon.textContent =
      gameBoard.playerXWin > gameBoard.playerOWin
        ? `Player X Won the Game (${gameBoard.playerXWin} out of 5)`
        : gameBoard.playerXWin < gameBoard.playerOWin
        ? `Player O Won the Game (${gameBoard.playerOWin} out of 5)`
        : gameBoard.playerXWin === gameBoard.playerOWin
        ? `Game is a Tie`
        : "";
    nextRoundBtn.disabled = true;
    nextRoundBtn.style.cursor = "not-allowed";
  }
}

(function renderXO() {
  const { cells, nextRoundBtn, roundCount } = Selectors();
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
        if (gameBoard.currentPlayer === "X") {
          cell.style.color = "rgb(239, 79, 58)";
          gameBoard.currentPlayer = "O";
        } else {
          cell.style.color = "rgb(115, 0, 255)";
          gameBoard.currentPlayer = "X";
        }
      }
      checkWin(gameBoard, gameBoard.getBoard());
    });
  });
  Reload(gameBoard);
  nextRoundBtn.addEventListener("click", () => {
    gameBoard.resetFrontEnd();
    gameBoard.currentPlayer = "X";
    gameBoard.numOfRound += 1;
    roundCount.textContent = `(${gameBoard.numOfRound})`;
  });
})();
