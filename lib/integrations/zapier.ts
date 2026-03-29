import axios from 'axios';

const zapierClient = axios.create({
  baseURL: 'https://hooks.zapier.com/hooks/catch',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ZapTrigger {
  id: string;
  url: string;
  status: string;
  created_at: string;
}

export interface WebhookData {
  [key: string]: any;
}

export async function triggerZap(hookId: string, data: WebhookData): Promise<any> {
  try {
    const response = await zapierClient.post(`/${hookId}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to trigger Zap: ${error}`);
  }
}

export async function getZaps(): Promise<ZapTrigger[]> {
  try {
    const response = await axios.get('https://zapier.com/api/v1/zaps', {
      headers: {
        'Authorization': `Bearer ${process.env.ZAPIER_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Zaps: ${error}`);
  }
}