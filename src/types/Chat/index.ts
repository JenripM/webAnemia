import { Pagination } from "../pagination";
import { MessageTypes } from "./types";

export enum Role {
    USER = 'user',
    BOT = 'bot'
}

export interface ConversationsHistory extends Pagination{
    data : {
        id: number;
        last_message_content: string
        last_message_role: string;
        last_message_time : string;
        created_at: string;
        updated_at: string;
        type : MessageTypes
    }[]
}

export interface Message {
    id: number
    content: string
    role: Role
    created_at: string
}