import express from 'express';
import fileDb from '../fileDb';
import {IMessage, MessageMutation} from '../types';

const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
  if (!req.body.author || !req.body.message) {
    return res.status(400).send({'error': 'Author and message must be present in the request'});
  }
  const message: MessageMutation = {
    message: req.body.message,
    author: req.body.author,
  };

  const savedMessage = await fileDb.addMessage(message);
  return res.send(savedMessage);
});

messageRouter.get('/', async (req, res) => {
  let messages: IMessage[] = [];

  if (req.query.datetime) {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);

    if (isNaN(date.getDate())) {
      return res.status(400).send({'error': 'Datetime is not correct'});
    } else {
      let messagesQuery: IMessage[] = await fileDb.getDatetime(date);
      return res.send(messagesQuery.slice(-30))
    }

  } else {
    messages = await fileDb.getMessages();
  }

  return res.send(messages);
});

export default messageRouter;