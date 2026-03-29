# V4 - Stripe Reporting Tool

A financial reporting dashboard that connects Stripe and QuickBooks to automate bookkeeping and generate comprehensive financial reports.

## What this does

V4 replaces your bookkeeper and financial analyst team by automatically syncing Stripe transactions with QuickBooks, generating monthly revenue reports, detecting payment failures, and posting cash flow updates to Slack. Built for business owners who want to maintain financial oversight without manual data entry.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Integrations**: Stripe, QuickBooks, Gmail, Twilio, Slack, Zapier, Google Sheets, Xero
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI
- Git
- Accounts with Stripe, QuickBooks, and other integrations

## Local Development Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v4-stripe-reporting
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   

4. **Start Supabase**
   bash
   supabase start
   

5. **Run development server**
   bash
   npm run dev
   

Visit http://localhost:3000 to see the application.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook endpoint secret | Yes |
| `QUICKBOOKS_CLIENT_ID` | QuickBooks app client ID | Yes |
| `QUICKBOOKS_CLIENT_SECRET` | QuickBooks app client secret | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token | Yes |
| `SLACK_BOT_TOKEN` | Slack bot token | Yes |
| `GMAIL_CLIENT_ID` | Gmail API client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail API client secret | Yes |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL | No |
| `GOOGLE_SHEETS_API_KEY` | Google Sheets API key | No |
| `XERO_CLIENT_ID` | Xero API client ID | No |
| `XERO_CLIENT_SECRET` | Xero API client secret | No |

## Database Setup

The database schema is automatically applied when you run `supabase start`. The schema includes:

- User management with role-based access (Owner, Accountant, Analyst)
- Integration configurations for all supported services
- Transaction storage and reconciliation rules
- Report generation and alert configurations
- Comprehensive audit logging

Run migrations:
bash
supabase db reset


## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npm i -g vercel
   vercel
   

2. **Set environment variables in Vercel dashboard**
   - Copy all variables from `.env.local`
   - Add them in your Vercel project settings

3. **Deploy**
   bash
   vercel --prod
   

## Project Structure


/
├── app/                 # Next.js 15 app directory
│   ├── (auth)/         # Authentication routes
│   ├── (dashboard)/    # Protected dashboard routes
│   └── api/           # API endpoints
├── components/         # Reusable UI components
├── lib/               # Business logic and utilities
├── db/                # Database queries and schemas
├── actions/           # Server actions
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
├── supabase/          # Supabase migrations and config
└── public/            # Static assets


## Key Features

- **Automated Sync**: Stripe transactions automatically sync to QuickBooks
- **Smart Reconciliation**: Duplicate detection and intelligent matching
- **Instant Reports**: One-click monthly revenue reports with PDF export
- **Real-time Alerts**: SMS notifications for payment failures and disputes
- **Team Communication**: Automated cash flow updates to Slack channels
- **Role-based Access**: Owner, Accountant, and Analyst permission levels

## License

Private - Internal use only