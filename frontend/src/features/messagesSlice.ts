import {createSlice} from '@reduxjs/toolkit';
import {IMessage} from '../types';
import {fetchMessages, fetchMessagesInterval, sendMessage} from './messagesThunks';


export interface MessagesState {
  messages: IMessage[];
  loading: boolean;
  createLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  createLoading: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, {payload:messages}) => {
        state.messages = messages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      })
    builder
      .addCase(fetchMessagesInterval.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesInterval.fulfilled, (state, {payload: messages}) => {
        state.messages = messages;
        state.loading = false;
      })
      .addCase(fetchMessagesInterval.rejected, (state) => {
        state.loading = false;
      })
    builder
      .addCase(sendMessage.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectLoadingCreate: (state) => state.createLoading,
    selectMessages: (state) => state.messages,
  }
});

export const messagesReducer = messagesSlice.reducer;

export const {
  selectLoading,
  selectLoadingCreate,
  selectMessages
} = messagesSlice.selectors;
