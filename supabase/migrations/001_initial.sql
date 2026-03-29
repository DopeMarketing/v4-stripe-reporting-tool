BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'accountant', 'analyst')),
  first_name text,
  last_name text,
  phone text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create organizations table
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid NOT NULL REFERENCES users(id),
  name text NOT NULL,
  stripe_account_id text,
  quickbooks_company_id text,
  settings jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create user_organizations table
CREATE TABLE user_organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  role text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Create api_integrations table
CREATE TABLE api_integrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  service_name text NOT NULL CHECK (service_name IN ('stripe', 'quickbooks', 'gmail', 'twilio', 'slack', 'zapier', 'google_sheets', 'xero')),
  credentials jsonb NOT NULL DEFAULT '{}',
  settings jsonb NOT NULL DEFAULT '{}',
  active boolean NOT NULL DEFAULT true,
  last_sync_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, service_name)
);

-- Create stripe_transactions table
CREATE TABLE stripe_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  stripe_id text NOT NULL,
  type text NOT NULL CHECK (type IN ('charge', 'refund', 'dispute', 'payout')),
  amount integer NOT NULL,
  currency text NOT NULL,
  status text NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending', 'disputed')),
  customer_id text,
  description text,
  metadata jsonb NOT NULL DEFAULT '{}',
  quickbooks_synced boolean NOT NULL DEFAULT false,
  quickbooks_transaction_id text,
  transaction_date timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, stripe_id)
);

-- Create quickbooks_transactions table
CREATE TABLE quickbooks_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  quickbooks_id text NOT NULL,
  type text NOT NULL CHECK (type IN ('invoice', 'payment', 'bill', 'expense')),
  amount decimal NOT NULL,
  description text,
  account text,
  customer_vendor text,
  metadata jsonb NOT NULL DEFAULT '{}',
  stripe_matched boolean NOT NULL DEFAULT false,
  stripe_transaction_id uuid REFERENCES stripe_transactions(id),
  transaction_date timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(organization_id, quickbooks_id)
);

-- Create expense_categories table
CREATE TABLE expense_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  name text NOT NULL,
  description text,
  tax_code text,
  auto_classification_rules jsonb NOT NULL DEFAULT '{}',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create reports table
CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL REFERENCES organizations(id),
  generated_by uuid NOT NULL REFERENCES users(id),
  type text NOT NULL CHECK (type IN ('monthly_revenue', 'expense_categorization', 'cash_flow', 'reconciliation')),
  title text NOT NULL,
  date_range_start date NOT NULL,
  date_range_end date NOT NULL,
  parameters jsonb NOT NULL DEFAULT '{}',
  data jsonb NOT NULL DEFAULT '{}',
  file_url text,
  status text NOT NULL CHECK (status IN ('generating', 'completed', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_organizations_owner_id ON organizations(owner_id);
CREATE INDEX idx_organizations_stripe_account_id ON organizations(stripe_account_id);
CREATE INDEX idx_user_organizations_organization_id ON user_organizations(organization_id);
CREATE INDEX idx_api_integrations_active ON api_integrations(active);
CREATE INDEX idx_stripe_transactions_transaction_date ON stripe_transactions(transaction_date);
CREATE INDEX idx_stripe_transactions_status ON stripe_transactions(status);
CREATE INDEX idx_stripe_transactions_quickbooks_synced ON stripe_transactions(quickbooks_synced);
CREATE INDEX idx_quickbooks_transactions_transaction_date ON quickbooks_transactions(transaction_date);
CREATE INDEX idx_quickbooks_transactions_stripe_matched ON quickbooks_transactions(stripe_matched);
CREATE INDEX idx_expense_categories_organization_id ON expense_categories(organization_id);
CREATE INDEX idx_expense_categories_active ON expense_categories(active);
CREATE INDEX idx_reports_organization_id ON reports(organization_id);
CREATE INDEX idx_reports_generated_by ON reports(generated_by);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_created_at ON reports(created_at);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quickbooks_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON organizations FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON user_organizations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON api_integrations FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON stripe_transactions FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON quickbooks_transactions FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON expense_categories FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON reports FOR ALL USING (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id)) WITH CHECK (auth.uid() IN (SELECT owner_id FROM organizations WHERE id = organization_id));
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;