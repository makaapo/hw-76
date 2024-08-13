import React from 'react';
import {Box} from '@mui/material';
import {IMessageForm} from '../../types';
import {sendMessage} from '../messagesThunks';
import MessageSendForm from '../../components/MessageForm/MessageForm';
import {useAppDispatch} from '../../app/hooks';
import {toast} from 'react-toastify';
import MessageCard from '../../components/MessageCard/MessageCard';

const Home = () => {
  const dispatch = useAppDispatch();

  const addNewMessageRequest = async (e: React.FormEvent, message: IMessageForm) => {
    e.preventDefault();
    toast.success("message send successfully.");
    await dispatch(sendMessage(message));
  };

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <Box sx={{ width: 350, padding: 2, borderRight: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MessageSendForm addNewMessageRequest={addNewMessageRequest} />
      </Box>
      <Box sx={{ flex: 1, padding: 2, overflowY: 'auto' }}>
        <MessageCard/>
      </Box>
    </Box>
  );
};

export default Home;