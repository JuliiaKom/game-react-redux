import { createSlice } from '@reduxjs/toolkit';
import { processMove } from '../untils/gameLogic';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  score: { X: 0, O: 0 },
  isFrozen: false,
};


const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action) => {
      const newState = processMove(state, action.payload);
      if (newState) {
        state.board = newState.board;
        state.currentPlayer = newState.currentPlayer;
        state.status = newState.status;
        state.winner = newState.winner;
        state.winningLine = newState.winningLine;
        state.score = newState.score;
        state.isFrozen = newState.isFrozen;
      }
    },

    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.status = 'playing';
      state.winner = null;
      state.isFrozen = false;
      state.winningLine = null;
    },

    fullReset: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.status = 'playing';
      state.winner = null;
      state.score = { X: 0, O: 0 };
      state.isFrozen = false;
      state.winningLine = null;
    },
  },
});


export const { makeMove, resetGame, fullReset } = gameSlice.actions;
export default gameSlice.reducer;