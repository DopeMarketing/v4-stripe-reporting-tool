import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  created: number;
}

export async function getPaymentIntents(limit: number = 10): Promise<PaymentIntent[]> {
  try {
    const response = await stripe.paymentIntents.list({ limit });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch payment intents: ${error}`);
  }
}

export async function getCustomers(limit: number = 10): Promise<Customer[]> {
  try {
    const response = await stripe.customers.list({ limit });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch customers: ${error}`);
  }
}