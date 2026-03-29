import axios from 'axios';

const quickbooksClient = axios.create({
  baseURL: 'https://sandbox-quickbooks.api.intuit.com',
  headers: {
    'Authorization': `Bearer ${process.env.QUICKBOOKS_ACCESS_TOKEN}`,
    'Accept': 'application/json',
  },
});

export interface Invoice {
  Id: string;
  DocNumber: string;
  TotalAmt: number;
  DueDate: string;
  CustomerRef: { value: string };
}

export interface Customer {
  Id: string;
  Name: string;
  CompanyName: string;
  Active: boolean;
}

export async function getInvoices(companyId: string): Promise<Invoice[]> {
  try {
    const response = await quickbooksClient.get(`/v3/company/${companyId}/query`, {
      params: { query: "SELECT * FROM Invoice" }
    });
    return response.data.QueryResponse.Invoice || [];
  } catch (error) {
    throw new Error(`Failed to fetch invoices: ${error}`);
  }
}

export async function getCustomers(companyId: string): Promise<Customer[]> {
  try {
    const response = await quickbooksClient.get(`/v3/company/${companyId}/query`, {
      params: { query: "SELECT * FROM Customer" }
    });
    return response.data.QueryResponse.Customer || [];
  } catch (error) {
    throw new Error(`Failed to fetch customers: ${error}`);
  }
}