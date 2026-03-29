import { google } from 'googleapis';

const gmail = google.gmail({
  version: 'v1',
  auth: process.env.GMAIL_API_KEY,
});

export interface Email {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{ name: string; value: string }>;
  };
}

export interface Thread {
  id: string;
  snippet: string;
  historyId: string;
}

export async function getEmails(userId: string = 'me', maxResults: number = 10): Promise<Email[]> {
  try {
    const response = await gmail.users.messages.list({
      userId,
      maxResults,
    });
    return response.data.messages || [];
  } catch (error) {
    throw new Error(`Failed to fetch emails: ${error}`);
  }
}

export async function getThreads(userId: string = 'me', maxResults: number = 10): Promise<Thread[]> {
  try {
    const response = await gmail.users.threads.list({
      userId,
      maxResults,
    });
    return response.data.threads || [];
  } catch (error) {
    throw new Error(`Failed to fetch threads: ${error}`);
  }
}