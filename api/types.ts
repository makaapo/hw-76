export interface IMessage {
    datetime: string;
    id: string;
    message: string;
    author: string;
}

export interface MessageMutation {
    message: string;
    author: string;
}