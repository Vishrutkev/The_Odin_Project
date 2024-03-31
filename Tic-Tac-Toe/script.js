// function Selectors(row, col) {
//   const cells = document.querySelectorAll(".cell");
//   const reload = document.querySelector(".reload");
//   const winCells = document.querySelector(
//     `.cell[data-row="${row}"][data-col="${col}"]`
//   );
//   const whoWon = document.querySelector(".who-won");
//   const roundCount = document.querySelector(".round-count");
//   const playerxWin = document.querySelector(".player-x");
//   const playeroWin = document.querySelector(".player-o");
//   const nextRoundBtn = document.querySelector(".next-round-btn");
//   const radioButtons = document.querySelectorAll('input[name="gameMode"]');

//   return {
//     cells,
//     reload,
//     winCells,
//     whoWon,
//     roundCount,
//     playerxWin,
//     playeroWin,
//     nextRoundBtn,
//     radioButtons,
//   };
// }

// function createEmptyBoard(rows, columns) {
//   const board = [];
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push("");
//     }
//   }
//   return board;
// }

// function GameBoard() {
//   const rows = 3;
//   const columns = 3;
//   const {
//     cells,
//     whoWon,
//     roundCount,
//     playeroWin,
//     playerxWin,
//     nextRoundBtn,
//     reload,
//     winCells,
//     radioButtons,
//   } = Selectors();
//   let board = createEmptyBoard(rows, columns);
//   let numOfRound = 1;
//   let currentPlayer = "X";
//   let playerXWin = 0;
//   let playerOWin = 0;

//   return {
//     getBoard: function () {
//       return JSON.parse(JSON.stringify(board));
//     },
//     updateGameBoard: function (value, row, column) {
//       board[row - 1][column - 1] = value;
//     },
//     resetFrontEnd: function () {
//       cells.forEach((cell) => {
//         cell.classList.remove("disabled", "animateCell");
//         cell.textContent = "";
//         cell.style.color = "black";
//         cell.style.fontSize = "3em";
//       });
//       whoWon.textContent = "";
//       board = createEmptyBoard(rows, columns);
//       nextRoundBtn.disabled = false;
//       nextRoundBtn.style.cursor = "pointer";
//     },
//     resetEverything: function () {
//       roundCount.textContent = "(1)";
//       playeroWin.textContent = " 0";
//       playerxWin.textContent = " 0";
//     },
//     setEmptyBoard: function () {
//       board = createEmptyBoard(rows, columns);
//     },
//     currentPlayer: currentPlayer,
//     numOfRound: numOfRound,
//     playerOWin: playerOWin,
//     playerXWin: playerXWin,
//     whoWon: whoWon,
//     cells: cells,
//     reload: reload,
//     winCells: winCells,
//     roundCount: roundCount,
//     playerxWin: playerxWin,
//     playeroWin: playeroWin,
//     nextRoundBtn: nextRoundBtn,
//     radioButtons: radioButtons,
//   };
// }

// function getWinnersPosition(board) {
//   // Check rows
//   for (let i = 0; i < board.length; i++) {
//     if (
//       board[i][0] !== "" &&
//       board[i][0] === board[i][1] &&
//       board[i][1] === board[i][2]
//     ) {
//       return [
//         [i, 0],
//         [i, 1],
//         [i, 2],
//       ]; // Return winning cell positions
//     }
//   }

//   // Check columns
//   for (let j = 0; j < board[0].length; j++) {
//     if (
//       board[0][j] !== "" &&
//       board[0][j] === board[1][j] &&
//       board[1][j] === board[2][j]
//     ) {
//       return [
//         [0, j],
//         [1, j],
//         [2, j],
//       ]; // Return winning cell positions
//     }
//   }

//   // Check diagonals
//   if (
//     board[0][0] !== "" &&
//     board[0][0] === board[1][1] &&
//     board[1][1] === board[2][2]
//   ) {
//     return [
//       [0, 0],
//       [1, 1],
//       [2, 2],
//     ]; // Return winning cell positions
//   }
//   if (
//     board[0][2] !== "" &&
//     board[0][2] === board[1][1] &&
//     board[1][1] === board[2][0]
//   ) {
//     return [
//       [0, 2],
//       [1, 1],
//       [2, 0],
//     ]; // Return winning cell positions
//   }

//   // Check if all cells are filled
//   let isBoardFull = true;
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       if (board[i][j] === "") {
//         isBoardFull = false;
//         break;
//       }
//     }
//     if (!isBoardFull) {
//       break;
//     }
//   }

//   if (isBoardFull) {
//     return "tie";
//   }
//   // If no winner is found
//   return null;
// }

// function checkWin(gameBoard, board) {
//   let winningPositions = getWinnersPosition(board);
//   if (winningPositions) {
//     if (winningPositions === "tie") {
//       gameBoard.whoWon.textContent = "It's a Tie";
//       return;
//     }
//     winningPositions.forEach(([row, col]) => {
//       const { winCells } = Selectors(row, col);
//       winCells.style.color = "darkgreen";
//     });
//     gameBoard.cells.forEach((cell) => {
//       cell.classList.add("disabled");
//     });
//     winningPositions = null;
//     renderWins(gameBoard);
//   }
// }

// function Reload(gameBoard, target) {
//   target.addEventListener("click", () => {
//     gameBoard.resetFrontEnd();
//     gameBoard.resetEverything();
//     gameBoard.currentPlayer = "X";
//     gameBoard.numOfRound = 1;
//     gameBoard.playerOWin = 0;
//     gameBoard.playerXWin = 0;
//   });
// }

// function renderWins(gameBoard) {
//   let currentWinner = gameBoard.currentPlayer === "X" ? "O" : "X";
//   if (currentWinner === "X") {
//     gameBoard.playerXWin += 1;
//     gameBoard.playerxWin.textContent = " " + gameBoard.playerXWin;
//   } else {
//     gameBoard.playerOWin += 1;
//     gameBoard.playeroWin.textContent = " " + gameBoard.playerOWin;
//   }
//   if (gameBoard.numOfRound < 5) {
//     gameBoard.whoWon.textContent = `Player ${currentWinner} Won this Round`;
//   } else {
//     gameBoard.whoWon.textContent =
//       gameBoard.playerXWin > gameBoard.playerOWin
//         ? `Player X Won the Game (${gameBoard.playerXWin} out of 5)`
//         : gameBoard.playerXWin < gameBoard.playerOWin
//         ? `Player O Won the Game (${gameBoard.playerOWin} out of 5)`
//         : gameBoard.playerXWin === gameBoard.playerOWin
//         ? `Game is a Tie`
//         : "";
//     gameBoard.nextRoundBtn.disabled = true;
//     gameBoard.nextRoundBtn.style.cursor = "not-allowed";
//   }
// }

// (function renderXO() {
//   const gridSize = 3;
//   const gameBoard = GameBoard();
//   let selectedGameMode = "playerVsPlayer";

//   gameBoard.radioButtons.forEach(function (radioButton) {
//     Reload(gameBoard, radioButton);
//     radioButton.addEventListener("change", function () {
//       if (this.checked) {
//         selectedGameMode = this.value;
//         if (this.value === "playerVsBot") {
//         }
//       }
//     });
//   });

//   gameBoard.cells.forEach((cell, index) => {
//     cell.addEventListener("click", () => {
//       if (!cell.classList.contains("disabled")) {
//         const row = Math.floor(index / gridSize) + 1;
//         const column = (index % gridSize) + 1;
//         gameBoard.updateGameBoard(gameBoard.currentPlayer, row, column);
//         cell.classList.add(gameBoard.currentPlayer.toLowerCase());
//         cell.textContent = gameBoard.currentPlayer;
//         cell.classList.add("animateCell");
//         cell.classList.add("disabled");
//         if (gameBoard.currentPlayer === "X") {
//           cell.style.color = "rgb(239, 79, 58)";
//           if (selectedGameMode === "playerVsBot") {
//             // Call function to let the bot make its move after a short delay
//             setTimeout(() => {
//               botMove(gameBoard);
//             }, 200);
//           }
//           gameBoard.currentPlayer = "O";
//         } else {
//           cell.style.color = "rgb(115, 0, 255)";
//           gameBoard.currentPlayer = "X";
//         }
//       }
//       checkWin(gameBoard, gameBoard.getBoard());
//     });
//   });

//   Reload(gameBoard, gameBoard.reload);
//   gameBoard.nextRoundBtn.addEventListener("click", () => {
//     gameBoard.resetFrontEnd();
//     gameBoard.currentPlayer = "X";
//     gameBoard.numOfRound += 1;
//     gameBoard.roundCount.textContent = `(${gameBoard.numOfRound})`;
//   });

//   // Function to let the bot make its move
//   function botMove(gameBoard) {
//     // For a simple example, let's choose a random empty cell
//     const emptyCells = [...gameBoard.cells].filter(
//       (cell) => !cell.classList.contains("disabled")
//     );

//     if (emptyCells.length > 0) {
//       const randomIndex = Math.floor(Math.random() * emptyCells.length);
//       const randomCell = emptyCells[randomIndex];
//       randomCell.click(); // Simulate a click on the randomly chosen cell
//     } else {
//       // Handle the case when there are no empty cells available
//       console.log("No empty cells available for bot move!");
//     }
//   }
// })();

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
    };

    let selectedGameMode = "playerVsPlayer";

    gameBoard.radioButtons.forEach(function (radioButton) {
      Reload(gameBoard, radioButton);
      radioButton.addEventListener("change", function () {
        if (this.checked) {
          selectedGameMode = this.value;
          if (this.value === "playerVsBot") {
          }
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
                botMove(gameBoard);
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

    // Function to let the bot make its move
    function botMove(gameBoard) {
      const emptyCells = [...gameBoard.cells].filter(
        (cell) => !cell.classList.contains("disabled")
      );

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        randomCell.click();
      } else {
        console.log("No empty cells available for bot move!");
      }
    }
  };
})();

// Start the game
TicTacToeGame();
