import { checkWinner } from './checkWinner';

export function processMove(state, index) {
  if (state.board[index] || state.status !== 'playing' || state.isFrozen) {
    return state; 
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const result = checkWinner(newBoard);

  if (result) {
    return {
      ...state,
      board: newBoard,
      status: 'won',
      winner: result.winner,
      winningLine: result.line,
      score: {
        ...state.score,
        [result.winner]: state.score[result.winner] + 1,
      },
      isFrozen: true,
    };
  }

  if (!newBoard.includes(null)) {
    return {
      ...state,
      board: newBoard,
      status: 'draw',
      isFrozen: true,
    };
  }

  // Міняємо гравця
  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
  };
}