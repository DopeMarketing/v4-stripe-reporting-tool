import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export interface Message {
  sid: string;
  body: string;
  from: string;
  to: string;
  status: string;
  dateCreated: Date;
}

export interface Call {
  sid: string;
  from: string;
  to: string;
  status: string;
  duration: string;
  dateCreated: Date;
}

export async function sendMessage(to: string, body: string, from?: string): Promise<Message> {
  try {
    const message = await client.messages.create({
      body,
      to,
      from: from || process.env.TWILIO_PHONE_NUMBER,
    });
    return message;
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
}

export async function getMessages(limit: number = 20): Promise<Message[]> {
  try {
    const messages = await client.messages.list({ limit });
    return messages;
  } catch (error) {
    throw new Error(`Failed to fetch messages: ${error}`);
  }
}