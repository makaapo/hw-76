import React, {useEffect, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';
import {IMessageForm} from '../../types';
import {fetchMessages, fetchMessagesInterval, sendMessage} from '../messagesThunks';
import MessageCard from '../../components/MessageCard/MessageCard';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoading, selectMessages} from '../messagesSlice';
import {toast} from 'react-toastify';
import MessageForm from '../../components/MessageForm/MessageForm';

const Home = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const loading = useAppSelector(selectLoading);
  const [lastDate, setLastDate] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const result = await dispatch(fetchMessages()).unwrap();
        if (result.length > 0) {
          setLastDate(result[result.length - 1].datetime);
        }
      } catch (e) {
        toast.error('Error fetching messages');
      }
    };

    void getMessages();

    const interval = setInterval(async () => {
      try {
        await dispatch(fetchMessagesInterval(lastDate || undefined)).unwrap();
      } catch (e) {
        toast.error('Failed to fetch messages');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch, lastDate]);

  const addNewMessageRequest = async (e: React.FormEvent, message: IMessageForm) => {
    e.preventDefault();
    try {
      toast.success("Message send successfully.");
      await dispatch(sendMessage(message)).unwrap();
    } catch (e) {
      toast.error('Error sending message');
    }
  };

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box sx={{
        width: 350,
        padding: 2,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <MessageForm addNewMessageRequest={addNewMessageRequest} />
      </Box>
      <Box sx={{
        flex: 1,
        padding: 2,
        overflowY: 'auto'
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {messages.length === 0 ? (
              <h1>No messages yet</h1>
            ) : (
              messages.slice().reverse().map((message) => (
                <MessageCard key={`${message.id}`} message={message} />
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;