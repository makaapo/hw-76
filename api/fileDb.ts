import {promises as fs} from 'fs';
import crypto from 'crypto';
import {IMessage, MessageMutation} from './types';

const filename = './db.json';
let data: IMessage[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getMessages() {
    return data;
  },

  async addMessage(message: MessageMutation) {
    const id = crypto.randomUUID();
    const datetime = new Date().toISOString();
    const newMessage = {id, ...message, datetime};
    data.push(newMessage);
    await this.save();
    return newMessage;
  },

  async getDatetime(datetime: Date) {
    let lastMessages: IMessage[] = [];

    data.forEach(message => {
      if (new Date(message.datetime) > datetime) {
        lastMessages.push(message);
      }
    });

    return lastMessages;
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};

export default fileDb;