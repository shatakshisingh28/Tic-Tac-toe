document.addEventListener('DOMContentLoaded', function() {
  const squares = document.querySelectorAll('.square');
  const resetButton = document.getElementById('reset-button');

  let currentPlayer = 'X';
  let gameState = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }

    return null;
  };

  const handleSquareClick = (index) => {
    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    squares[index].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameActive = false;
      alert(`Player ${winner} wins!`);
      return;
    }

    if (!gameState.includes('')) {
      gameActive = false;
      alert('It\'s a draw!');
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  const handleResetButtonClick = () => {
    squares.forEach(square => {
      square.textContent = '';
    });
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
  };

  squares.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
  });

  resetButton.addEventListener('click', handleResetButtonClick);
});
