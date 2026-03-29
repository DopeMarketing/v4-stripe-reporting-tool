export interface User {
  id: string;
  email: string;
  role: 'owner' | 'accountant' | 'analyst';
  first_name?: string;
  last_name?: string;
  phone?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Organization {
  id: string;
  owner_id: string;
  name: string;
  stripe_account_id?: string;
  quickbooks_company_id?: string;
  settings: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface UserOrganization {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface ApiIntegration {
  id: string;
  organization_id: string;
  service_name: 'stripe' | 'quickbooks' | 'gmail' | 'twilio' | 'slack' | 'zapier' | 'google_sheets' | 'xero';
  credentials: Record<string, any>;
  settings: Record<string, any>;
  active: boolean;
  last_sync_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface StripeTransaction {
  id: string;
  organization_id: string;
  stripe_id: string;
  type: 'charge' | 'refund' | 'dispute' | 'payout';
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'disputed';
  customer_id?: string;
  description?: string;
  metadata: Record<string, any>;
  quickbooks_synced: boolean;
  quickbooks_transaction_id?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface QuickbooksTransaction {
  id: string;
  organization_id: string;
  quickbooks_id: string;
  type: 'invoice' | 'payment' | 'bill' | 'expense';
  amount: number;
  description?: string;
  account?: string;
  customer_vendor?: string;
  metadata: Record<string, any>;
  stripe_matched: boolean;
  stripe_transaction_id?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ReconciliationRule {
  id: string;
  organization_id: string;
  name: string;
  stripe_criteria: Record<string, any>;
  quickbooks_criteria: Record<string, any>;
  tolerance_amount: number;
  tolerance_days: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Report {
  id: string;
  organization_id: string;
  generated_by: string;
  type: 'monthly_revenue' | 'expense_categorization' | 'cash_flow' | 'reconciliation';
  title: string;
  date_range_start: string;
  date_range_end: string;
  parameters: Record<string, any>;
  data: Record<string, any>;
  file_url?: string;
  status: 'generating' | 'completed' | 'failed';
  created_at: Date;
  updated_at: Date;
}

export interface ExpenseCategory {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  tax_code?: string;
  auto_classification_rules: Record<string, any>;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionCategorization {
  id: string;
  organization_id: string;
  transaction_id: string;
  transaction_type: 'stripe' | 'quickbooks';
  category_id: string;
  assigned_by?: string;
  confidence_score?: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface AlertConfiguration {
  id: string;
  organization_id: string;
  name: string;
  type: 'payment_failure' | 'dispute' | 'large_transaction' | 'cash_flow_threshold';
  channels: Record<string, any>;
  triggers: Record<string, any>;
  recipients: Record<string, any>;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: string;
  organization_id: string;
  alert_configuration_id?: string;
  type: 'sms' | 'email' | 'slack';
  recipient: string;
  subject?: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  external_id?: string;
  error_message?: string;
  triggered_by_transaction?: string;
  sent_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SlackConfiguration {
  id: string;
  organization_id: string;
  workspace_name: string;
  channel_id: string;
  channel_name: string;
  post_type: 'weekly_cash_flow' | 'monthly_summary' | 'alerts';
  schedule?: string;
  template: string;
  active: boolean;
  last_post_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SyncLog {
  id: string;
  organization_id: string;
  service_name: string;
  sync_type: 'full' | 'incremental' | 'manual';
  status: 'running' | 'completed' | 'failed';
  records_processed: number;
  records_added: number;
  records_updated: number;
  errors: Record<string, any>;
  started_at: Date;
  completed_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: User;
  organizations: Organization;
  user_organizations: UserOrganization;
  api_integrations: ApiIntegration;
  stripe_transactions: StripeTransaction;
  quickbooks_transactions: QuickbooksTransaction;
  reconciliation_rules: ReconciliationRule;
  reports: Report;
  expense_categories: ExpenseCategory;
  transaction_categorizations: TransactionCategorization;
  alert_configurations: AlertConfiguration;
  notifications: Notification;
  slack_configurations: SlackConfiguration;
  sync_logs: SyncLog;
}