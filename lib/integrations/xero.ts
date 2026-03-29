import axios from 'axios';

const xeroClient = axios.create({
  baseURL: 'https://api.xero.com/api.xro/2.0',
  headers: {
    'Authorization': `Bearer ${process.env.XERO_ACCESS_TOKEN}`,
    'Accept': 'application/json',
    'Xero-tenant-id': process.env.XERO_TENANT_ID,
  },
});

export interface Invoice {
  InvoiceID: string;
  InvoiceNumber: string;
  Type: string;
  Status: string;
  Total: number;
  AmountDue: number;
  DueDate: string;
}

export interface Contact {
  ContactID: string;
  Name: string;
  EmailAddress: string;
  IsSupplier: boolean;
  IsCustomer: boolean;
}

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const response = await xeroClient.get('/Invoices');
    return response.data.Invoices || [];
  } catch (error) {
    throw new Error(`Failed to fetch invoices: ${error}`);
  }
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const response = await xeroClient.get('/Contacts');
    return response.data.Contacts || [];
  } catch (error) {
    throw new Error(`Failed to fetch contacts: ${error}`);
  }
}