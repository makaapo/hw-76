import React from 'react';
import {Card, CardContent, Typography, CardHeader, Box} from '@mui/material';
import {IMessage} from '../../types';
import dayjs from 'dayjs';

interface Props {
  message: IMessage;
}

const MessageCard: React.FC<Props> = ({message}) => {
  return (
    <Card sx={{
      minWidth: 275,
      mt: 2,
      boxShadow: 10
    }}>
      <CardHeader
        title={
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 1,
              padding: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 2,
            }}
          >
            <Typography
              variant="h6"
              component="div">
              <strong>Author: </strong>
              {message.author}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div">
              {dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}
            </Typography>
          </Box>
        }
        sx={{
          paddingBottom: 0
      }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary">
          <strong>Message: </strong>
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MessageCard;