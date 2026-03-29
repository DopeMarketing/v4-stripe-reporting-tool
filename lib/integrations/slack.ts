import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export interface Channel {
  id: string;
  name: string;
  is_private: boolean;
  is_member: boolean;
  num_members: number;
}

export interface Message {
  type: string;
  user: string;
  text: string;
  ts: string;
  channel: string;
}

export async function getChannels(): Promise<Channel[]> {
  try {
    const response = await slack.conversations.list({
      types: 'public_channel,private_channel',
    });
    return response.channels as Channel[];
  } catch (error) {
    throw new Error(`Failed to fetch channels: ${error}`);
  }
}

export async function sendMessage(channel: string, text: string): Promise<Message> {
  try {
    const response = await slack.chat.postMessage({
      channel,
      text,
    });
    return response.message as Message;
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
}