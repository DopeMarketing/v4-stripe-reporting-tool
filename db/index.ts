import { supabase } from '@/lib/supabase';
import type {
  User,
  Organization,
  UserOrganization,
  StripeTransaction,
  QuickbooksTransaction,
  ExpenseCategory,
  Report,
  ApiIntegration
} from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, first_name, last_name, phone, active, created_at, updated_at');
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role, first_name, last_name, phone, active, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Organizations
export async function getAllOrganizations(): Promise<Organization[]> {
  const { data, error } = await supabase
    .from('organizations')
    .select('id, owner_id, name, stripe_account_id, quickbooks_company_id, settings, created_at, updated_at');
  if (error) throw new Error(`Failed to fetch organizations: ${error.message}`);
  return data;
}

export async function getOrganizationById(id: string): Promise<Organization | null> {
  const { data, error } = await supabase
    .from('organizations')
    .select('id, owner_id, name, stripe_account_id, quickbooks_company_id, settings, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) throw new Error(`Failed to fetch organization: ${error.message}`);
  return data;
}

export async function createOrganization(org: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .insert(org)
    .select()
    .single();
  if (error) throw new Error(`Failed to create organization: ${error.message}`);
  return data;
}

export async function updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization> {
  const { data, error } = await supabase
    .from('organizations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Failed to update organization: ${error.message}`);
  return data;
}

export async function deleteOrganization(id: string): Promise<void> {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete organization: ${error.message}`);
}

// User Organizations
export async function getUserOrganizations(userId: string): Promise<UserOrganization[]> {
  const { data, error } = await supabase
    .from('user_organizations')
    .select('id, user_id, organization_id, role, created_at, updated_at')
    .eq('user_id', userId);
  if (error) throw new Error(`Failed to fetch user organizations: ${error.message}`);
  return data;
}

export async function createUserOrganization(userOrg: Omit<UserOrganization, 'id' | 'created_at' | 'updated_at'>): Promise<UserOrganization> {
  const { data, error } = await supabase
    .from('user_organizations')
    .insert(userOrg)
    .select()
    .single();
  if (error) throw new Error(`Failed to create user organization: ${error.message}`);
  return data;
}

// Stripe Transactions
export async function getStripeTransactionsByOrganization(organizationId: string): Promise<StripeTransaction[]> {
  const { data, error } = await supabase
    .from('stripe_transactions')
    .select('id, organization_id, stripe_id, type, amount, currency, status, customer_id, description, metadata, quickbooks_synced, quickbooks_transaction_id, transaction_date, created_at, updated_at')
    .eq('organization_id', organizationId)
    .order('transaction_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch stripe transactions: ${error.message}`);
  return data;
}

export async function createStripeTransaction(transaction: Omit<StripeTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<StripeTransaction> {
  const { data, error } = await supabase
    .from('stripe_transactions')
    .insert(transaction)
    .select()
    .single();
  if (error) throw new Error(`Failed to create stripe transaction: ${error.message}`);
  return data;
}

// QuickBooks Transactions
export async function getQuickbooksTransactionsByOrganization(organizationId: string): Promise<QuickbooksTransaction[]> {
  const { data, error } = await supabase
    .from('quickbooks_transactions')
    .select('id, organization_id, quickbooks_id, type, amount, description, account, customer_vendor, metadata, stripe_matched, stripe_transaction_id, transaction_date, created_at, updated_at')
    .eq('organization_id', organizationId)
    .order('transaction_date', { ascending: false });
  if (error) throw new Error(`Failed to fetch quickbooks transactions: ${error.message}`);
  return data;
}

export async function createQuickbooksTransaction(transaction: Omit<QuickbooksTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<QuickbooksTransaction> {
  const { data, error } = await supabase
    .from('quickbooks_transactions')
    .insert(transaction)
    .select()
    .single();
  if (error) throw new Error(`Failed to create quickbooks transaction: ${error.message}`);
  return data;
}

// Expense Categories
export async function getExpenseCategoriesByOrganization(organizationId: string): Promise<ExpenseCategory[]> {
  const { data, error } = await supabase
    .from('expense_categories')
    .select('id, organization_id, name, description, tax_code, auto_classification_rules, active, created_at, updated_at')
    .eq('organization_id', organizationId)
    .eq('active', true);
  if (error) throw new Error(`Failed to fetch expense categories: ${error.message}`);
  return data;
}

export async function createExpenseCategory(category: Omit<ExpenseCategory, 'id' | 'created_at' | 'updated_at'>): Promise<ExpenseCategory> {
  const { data, error } = await supabase
    .from('expense_categories')
    .insert(category)
    .select()
    .single();
  if (error) throw new Error(`Failed to create expense category: ${error.message}`);
  return data;
}

// Reports
export async function getReportsByOrganization(organizationId: string): Promise<Report[]> {
  const { data, error } = await supabase
    .from('reports')
    .select('id, organization_id, generated_by, type, title, date_range_start, date_range_end, parameters, data, file_url, status, created_at, updated_at')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch reports: ${error.message}`);
  return data;
}

export async function createReport(report: Omit<Report, 'id' | 'created_at' | 'updated_at'>): Promise<Report> {
  const { data, error } = await supabase
    .from('reports')
    .insert(report)
    .select()
    .single();
  if (error) throw new Error(`Failed to create report: ${error.message}`);
  return data;
}

// API Integrations
export async function getApiIntegrationsByOrganization(organizationId: string): Promise<ApiIntegration[]> {
  const { data, error } = await supabase
    .from('api_integrations')
    .select('id, organization_id, service_name, credentials, settings, active, last_sync_at, created_at, updated_at')
    .eq('organization_id', organizationId);
  if (error) throw new Error(`Failed to fetch api integrations: ${error.message}`);
  return data;
}

export async function createApiIntegration(integration: Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>): Promise<ApiIntegration> {
  const { data, error } = await supabase
    .from('api_integrations')
    .insert(integration)
    .select()
    .single();
  if (error) throw new Error(`Failed to create api integration: ${error.message}`);
  return data;
}