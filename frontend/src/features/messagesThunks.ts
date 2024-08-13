import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {IMessage, IMessageForm} from '../types';

export const fetchMessages = createAsyncThunk<IMessage[]>(
  'messages/fetchMessages',
  async () => {
    const {data: messages} = await axiosApi.get<IMessage[]>('/messages');
    return messages;
  }
);

export const fetchMessagesInterval = createAsyncThunk<IMessage[], string | undefined>(
  'messages/fetchMessagesInterval',
  async (lastDate) => {
    if (!lastDate) {
      return [];
    }
    const {data: messages} = await axiosApi.get<IMessage[]>(`/messages?datetime=${lastDate}`);
    return messages;
  }
);


export const sendMessage = createAsyncThunk<void, IMessageForm>(
  'messages/create',
  async (messageMutation) => {
    const messageWithoutId: IMessageForm = {
      ...messageMutation,
    };

    if (messageMutation.message.trim().length > 0 && messageMutation.author.trim().length > 0) {
      await axiosApi.post<IMessageForm>('/messages', messageWithoutId);
    }
  }
);