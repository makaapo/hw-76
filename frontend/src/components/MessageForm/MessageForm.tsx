import React, {FormEvent, useState} from 'react';
import {Button, CircularProgress, TextField, Box, Typography} from '@mui/material';
import {IMessageForm} from '../../types';
import {useAppSelector} from '../../app/hooks';
import {selectLoadingCreate} from '../../features/messagesSlice';

interface Props {
  addNewMessageRequest: (e: FormEvent, message: IMessageForm) => void;
}

const MessageForm: React.FC<Props> = ({addNewMessageRequest}) => {
  const createLoading = useAppSelector(selectLoadingCreate);
  const [message, setMessage] = useState<IMessageForm>({
    author: '',
    message: ''
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewMessageRequest(e, message);
    setMessage({author: '', message: ''});
  };

  return (
    <Box
      sx={{
        width: 300,
        minWidth: '200px',
        padding: 2,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'relative',
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <Typography variant="h6" sx={{mb: 2}}>Send a Message</Typography>
      <form
        onSubmit={onFormSubmit}
        style={{display: 'flex', flexDirection: 'column', gap: 2}}
      >
        <TextField
          label="Author"
          variant="outlined"
          name="author"
          value={message.author}
          onChange={changeForm}
          fullWidth
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            marginBottom: 1,
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiInputBase-input': {
              padding: '6px',
            },
          }}
        />
        <TextField
          label="Message"
          variant="outlined"
          name="message"
          value={message.message}
          onChange={changeForm}
          fullWidth
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            marginBottom: 1,
            '& .MuiOutlinedInput-root': {
              padding: '8px',
            },
            '& .MuiInputBase-input': {
              padding: '6px',
            },
          }}
        />
        <Button
          disabled={createLoading || message.message.trim().length === 0 || message.author.trim().length === 0}
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            borderRadius: 1,
            height: 40,
            textTransform: 'none',
            fontSize: '16px',
            padding: '8px 16px',
          }}
        >
          {createLoading ? <CircularProgress size={24}/> : 'Send'}
        </Button>
      </form>
    </Box>
  );
};

export default MessageForm;