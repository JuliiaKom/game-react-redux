import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/gameSlice';
import chatReducer from './features/chatSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    chat: chatReducer,
  },
});

export default store;