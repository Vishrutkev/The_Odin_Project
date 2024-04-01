const TicTacToeGame = (function () {
  // Function to select DOM elements
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
    const radioButtons = document.querySelectorAll('input[name="gameMode"]');

    return {
      cells,
      reload,
      winCells,
      whoWon,
      roundCount,
      playerxWin,
      playeroWin,
      nextRoundBtn,
      radioButtons,
    };
  }

  // Function to create an empty game board
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

  // Function to check winning combinations
  function getWinnersPosition(board) {
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
        ];
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
        ];
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
      ];
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
      ];
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

  function checkWinner(board) {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] !== "" &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let j = 0; j < board[0].length; j++) {
      if (
        board[0][j] !== "" &&
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j]
      ) {
        return board[0][j];
      }
    }

    // Check diagonals
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[1][1];
    }
    if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[1][1];
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

  // Function to check for a win or tie
  function checkWin(gameBoard, board) {
    let winningPositions = getWinnersPosition(board);
    if (winningPositions) {
      if (winningPositions === "tie") {
        gameBoard.whoWon.textContent = "It's a Tie";
        return;
      }
      winningPositions.forEach(([row, col]) => {
        const { winCells } = Selectors(row, col);
        winCells.style.color = "darkgreen";
      });
      gameBoard.cells.forEach((cell) => {
        cell.classList.add("disabled");
      });
      winningPositions = null;
      renderWins(gameBoard);
    }
  }

  // Function to handle game reload
  function Reload(gameBoard, target) {
    target.addEventListener("click", () => {
      gameBoard.resetFrontEnd();
      gameBoard.resetEverything();
      gameBoard.currentPlayer = "X";
      gameBoard.numOfRound = 1;
      gameBoard.playerOWin = 0;
      gameBoard.playerXWin = 0;
    });
  }

  // Function to render win status
  function renderWins(gameBoard) {
    let currentWinner = gameBoard.currentPlayer === "X" ? "O" : "X";
    if (currentWinner === "X") {
      gameBoard.playerXWin += 1;
      gameBoard.playerxWin.textContent = " " + gameBoard.playerXWin;
    } else {
      gameBoard.playerOWin += 1;
      gameBoard.playeroWin.textContent = " " + gameBoard.playerOWin;
    }
    if (gameBoard.numOfRound < 5) {
      gameBoard.whoWon.textContent = `Player ${currentWinner} Won this Round`;
    } else {
      gameBoard.whoWon.textContent =
        gameBoard.playerXWin > gameBoard.playerOWin
          ? `Player X Won the Game (${gameBoard.playerXWin} out of 5)`
          : gameBoard.playerXWin < gameBoard.playerOWin
          ? `Player O Won the Game (${gameBoard.playerOWin} out of 5)`
          : gameBoard.playerXWin === gameBoard.playerOWin
          ? `Game is a Tie`
          : "";
      gameBoard.nextRoundBtn.disabled = true;
      gameBoard.nextRoundBtn.style.cursor = "not-allowed";
    }
  }

  // Main game function
  return function () {
    const gridSize = 3;
    const rows = 3;
    const columns = 3;
    const {
      cells,
      reload,
      whoWon,
      roundCount,
      playerxWin,
      playeroWin,
      nextRoundBtn,
      radioButtons,
    } = Selectors();

    const gameBoard = {
      cells,
      reload,
      whoWon,
      roundCount,
      playerxWin,
      playeroWin,
      nextRoundBtn,
      radioButtons,
      board: createEmptyBoard(rows, columns),
      numOfRound: 1,
      currentPlayer: "X",
      playerXWin: 0,
      playerOWin: 0,
      getBoard: function () {
        return JSON.parse(JSON.stringify(this.board));
      },
      updateGameBoard: function (value, row, column) {
        this.board[row - 1][column - 1] = value;
      },
      // Two reset functions because next Round only reset the frontEnd and Reload resets both
      resetFrontEnd: function () {
        this.cells.forEach((cell) => {
          cell.classList.remove("disabled", "animateCell");
          cell.textContent = "";
          cell.style.color = "black";
          cell.style.fontSize = "3em";
        });
        this.whoWon.textContent = "";
        this.board = createEmptyBoard(rows, columns);
        this.nextRoundBtn.disabled = false;
        this.nextRoundBtn.style.cursor = "pointer";
      },
      resetEverything: function () {
        this.roundCount.textContent = "(1)";
        this.playeroWin.textContent = " 0";
        this.playerxWin.textContent = " 0";
      },
      // Function to let the bot make its move
      easyBotMove: function () {
        const emptyCells = [...this.cells].filter(
          (cell) => !cell.classList.contains("disabled")
        );

        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          const randomCell = emptyCells[randomIndex];
          const row = parseInt(randomCell.dataset.row);
          const col = parseInt(randomCell.dataset.col);

          // Update the board with the bot's move
          const board = this.getBoard();
          board[row][col] = this.currentPlayer;

          // Trigger a click on the selected cell
          randomCell.click();
        } else {
          console.log("No empty cells available for bot move!");
        }
      },

      hardBotMove: function () {
        const emptyCells = [...this.cells].filter(
          (cell) => !cell.classList.contains("disabled")
        );
        if (emptyCells.length > 0) {
          let bestScore = -Infinity;
          let move;
          const board = this.getBoard();
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == "") {
                board[i][j] = "O"; // Simulate the bot's move
                let score = this.minimax(board, 0, false);
                board[i][j] = ""; // Undo the move
                if (score > bestScore) {
                  bestScore = score;
                  move = { i, j };
                }
              }
            }
          }
          board[move.i][move.j] = this.currentPlayer;
          let idx = 0;
          if (move.i == 1) {
            idx = move.i + move.j + 2;
          } else if (move.i == 2) {
            idx = move.i + move.j + 4;
          } else {
            idx = move.j;
          }
          this.cells[idx].click();
        } else {
          console.log("No empty cells available for bot move!");
        }
      },

      minimax: function (board, depth, isMaximizing) {
        let result = checkWinner(board);
        if (result !== null) {
          if (result === "X") {
            return -10 + depth;
          } else if (result === "O") {
            return 10 - depth;
          } else {
            return 0;
          }
        }

        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == "") {
                board[i][j] = "O";
                let score = this.minimax(board, depth + 1, false);
                board[i][j] = "";
                if (score > bestScore) {
                  bestScore = score;
                }
              }
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] == "") {
                board[i][j] = "X";
                let score = this.minimax(board, depth + 1, true);
                board[i][j] = "";
                if (score < bestScore) {
                  bestScore = score;
                }
              }
            }
          }
          return bestScore;
        }
      },
    };

    let selectedGameMode = "playerVsPlayer";

    gameBoard.radioButtons.forEach(function (radioButton) {
      Reload(gameBoard, radioButton);
      radioButton.addEventListener("change", function () {
        if (this.checked) {
          selectedGameMode = this.value;
        }
      });
    });

    gameBoard.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!cell.classList.contains("disabled")) {
          const row = Math.floor(index / gridSize) + 1;
          const column = (index % gridSize) + 1;
          gameBoard.updateGameBoard(gameBoard.currentPlayer, row, column);
          cell.classList.add(gameBoard.currentPlayer.toLowerCase());
          cell.textContent = gameBoard.currentPlayer;
          cell.classList.add("animateCell");
          cell.classList.add("disabled");
          if (gameBoard.currentPlayer === "X") {
            cell.style.color = "rgb(239, 79, 58)";
            if (selectedGameMode === "playerVsBot") {
              setTimeout(() => {
                gameBoard.hardBotMove();
              }, 200);
            }
            gameBoard.currentPlayer = "O";
          } else {
            cell.style.color = "rgb(115, 0, 255)";
            gameBoard.currentPlayer = "X";
          }
        }
        checkWin(gameBoard, gameBoard.getBoard());
      });
    });

    Reload(gameBoard, gameBoard.reload);
    gameBoard.nextRoundBtn.addEventListener("click", () => {
      gameBoard.resetFrontEnd();
      gameBoard.currentPlayer = "X";
      gameBoard.numOfRound += 1;
      gameBoard.roundCount.textContent = `(${gameBoard.numOfRound})`;
    });
  };
})();

// Start the game
TicTacToeGame();
