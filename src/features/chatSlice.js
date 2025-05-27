import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: [],
  reducers: {
    sendMessage: (state, { payload }) => {
      state.push({ payload });
    },

    clearChat: () => [],
  },
});

export const { sendMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
