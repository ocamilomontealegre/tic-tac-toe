// Scripts

// Factory function for creating Players as objects
const Player = (value) => {

  this.value = value;


  return { value }
}

// Global variables
// Create array from gameboard elements
const gameBoxes = Array.from(document.querySelectorAll('.game-box'));

// Save player-turn element
const playerTurn = document.querySelector('#player-turn');

// Init game
const init = (() => {

  // Create Players
  const createPlayers = () => {

    // createPlayers
    const player1 = Player('X');
    const player2 = Player('O');

    return { player1, player2 };
  }

  // Reset Board
  const resetBoard = () => {
    gameBoxes.forEach(gameBox => {
      gameBox.classList.remove('game-mark');
      gameBox.textContent = '';
    });
  }

  // Check win 
  const checkWin = (value) => {
    let winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    return winCombos.some(combo => {
      return combo.every(element => gameBoxes[element].textContent === value);
    })
  }

  // Board Full
  const boardFull = () => {
    return gameBoxes.every(element => element.textContent !== '');
  }



  return { createPlayers, resetBoard, checkWin, boardFull };

})();

// Register game events
const registerGameEvents = (() => {

  // Make Marks
  const makeMarks = () => {

    // Invoke createPlayers function
    const players = init.createPlayers();
    // Save player1 value
    let currentPlayer = players.player1.value;

    // Add event listener to all gameboard elements
    gameBoxes.forEach(gameBox => {
      gameBox.addEventListener('click', () => {
        if (gameBox.textContent === '') {
          gameBox.classList.toggle('game-mark');
          gameBox.textContent = currentPlayer;
          if (init.checkWin(currentPlayer)) {
            playerTurn.textContent = `Player ${currentPlayer} wins!`
            setTimeout(() => {
              init.resetBoard();
              playerTurn.textContent = `Player X Turn`;              
            }, 1000)
          } else if (init.boardFull()) {
            playerTurn.textContent = `It's a draw!`
            setTimeout(() => {
              init.resetBoard();
              playerTurn.textContent = `Player X Turn`;              
            }, 1000)
          } else {
            (currentPlayer === 'X')
              ? currentPlayer = players.player2.value
              : currentPlayer = players.player1.value;
            playerTurn.textContent = `Player ${currentPlayer} Turn`;
          }
        };
      })
    })
  }

  return { makeMarks }


})();

// Save refresh button
const btnRefresh = document.querySelector('.btn-refresh');
btnRefresh.addEventListener('click', init.resetBoard);

registerGameEvents.makeMarks();

