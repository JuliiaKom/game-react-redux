import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {
    sendMessage: (state, action) => {
      state.push({ ...action.payload });
    },
    clearChat: () => {
      return [];
    }
  },
});

export const { sendMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
