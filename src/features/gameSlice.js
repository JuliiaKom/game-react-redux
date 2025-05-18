import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  status: 'playing', 
  winner: null,
  score: { X: 0, O: 0 },
  freeze: false,
};


const checkWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
};


const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action) => {
      const index = action.payload;
      if (state.board[index] || state.status !== 'playing' || state.freeze) return;
      state.board[index] = state.currentPlayer;
      const result = checkWinner(state.board);
     
      if (result) {
        state.status = 'won';
        state.winner = result.winner;
        state.winningLine = result.line; 
        state.score[result.winner] += 1;
        state.freeze = true;
      } else if (!state.board.includes(null)) {
        state.status = 'draw';
        state.freeze = true;
      } else {
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.status = 'playing';
      state.winner = null;
      state.freeze = false;
      state.winningLine = null;  
    },
    fullReset: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.status = 'playing';
      state.winner = null;
      state.score = { X: 0, O: 0 };
      state.freeze = false;
      state.winningLine = null; 
    },
  },
});

export const { makeMove, resetGame, fullReset } = gameSlice.actions;
export default gameSlice.reducer;