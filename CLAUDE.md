# V4 - Stripe Reporting Tool — AI Development Guide

## Project Overview
A financial reporting dashboard that automates bookkeeping by connecting Stripe and QuickBooks, generating comprehensive reports, and sending real-time alerts. This replaces manual bookkeeping and financial analysis for small business owners.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Integrations**: Stripe, QuickBooks, Gmail, Twilio, Slack, Zapier, Google Sheets, Xero
- **Deployment**: Vercel

## Folder Structure

app/
├── (auth)/              # Public auth pages (signup, login)
├── (dashboard)/         # Protected dashboard routes
│   ├── dashboard/       # Main dashboard
│   ├── reports/         # Report generation and viewing
│   ├── reconciliation/  # Transaction matching interface
│   ├── alerts/          # Alert configuration
│   ├── cash-flow/       # Cash flow analysis
│   ├── integrations/    # API integration management
│   └── settings/        # User and org settings
└── api/                 # API routes and webhooks
    ├── stripe/          # Stripe webhook handlers
    ├── quickbooks/      # QuickBooks sync endpoints
    └── reports/         # Report generation APIs

components/
├── ui/                  # Shadcn/ui base components
├── auth/                # Authentication components
├── dashboard/           # Dashboard-specific components
├── reports/             # Report display components
├── integrations/        # Integration setup components
└── shared/              # Shared utility components

lib/
├── stripe.ts            # Stripe SDK configuration
├── quickbooks.ts        # QuickBooks API client
├── twilio.ts            # SMS notification service
├── slack.ts             # Slack integration
├── gmail.ts             # Email service
├── reports/             # Report generation logic
├── reconciliation.ts    # Transaction matching logic
└── utils.ts             # General utilities

db/
├── queries/             # Database query functions
├── types.ts             # Database type definitions
└── index.ts             # Database client setup

actions/
├── auth.ts              # Authentication server actions
├── integrations.ts      # Integration management actions
├── reports.ts           # Report generation actions
├── reconciliation.ts    # Transaction sync actions
└── alerts.ts            # Alert configuration actions


## Coding Conventions

### TypeScript
- Strict mode enabled
- Explicit return types for all functions
- Use proper type imports: `import type { User } from '@/types'`
- No `any` types without explicit justification

### React/Next.js
- Server Components by default
- Client Components only when necessary (`'use client'`)
- Use Server Actions for data mutations
- Proper loading and error states

### Data Access
- Database queries ONLY in `/db` directory
- Business logic ONLY in `/lib` and `/actions`
- No database secrets in client components
- Use Supabase RLS policies for security

### Styling
- Tailwind CSS for all styling
- Shadcn/ui components as base
- Responsive design (mobile-first)
- Dark/light mode support

## Current State

This is a fresh scaffold with:
- ✅ Complete database schema (14 tables)
- ✅ Authentication setup with role-based access
- ✅ Route structure for all major features
- ✅ Integration stubs for all external APIs
- ✅ Basic UI components and layout
- ❌ No business logic implemented yet
- ❌ No actual integrations connected
- ❌ No report generation functionality

## What to Build Next (v1 Features)

1. **Automated Stripe-to-QuickBooks sync** with duplicate detection and reconciliation dashboard
2. **One-click monthly revenue reports** with customizable date ranges and PDF export
3. **Real-time payment failure alerts** via Twilio SMS with transaction details
4. **Automated weekly cash flow summaries** to Slack channels with trend analysis

## Never Touch Rules

- **Environment files**: Never commit `.env*` files or expose secrets
- **Migration files**: Don't modify existing migrations without explicit instruction
- **RLS policies**: Don't change Row Level Security policies without security review
- **Database schema**: Changes require migration files, never direct schema edits

## How to Work on This Project

### Before Starting
1. Always read this CLAUDE.md file first
2. Check TECHNICAL_DEBT.md for known issues
3. Review the current changelog

### Development Process
1. Run `npm run build` before committing to catch TypeScript errors
2. Commit small, focused changes
3. Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `refactor:` for code restructuring
   - `test:` for adding tests

### Code Quality
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Handle errors gracefully with proper user feedback
- Log errors properly for debugging
- Test edge cases and error scenarios

### Documentation
- Update TECHNICAL_DEBT.md when taking shortcuts
- Update CHANGELOG.md for all user-facing changes
- Keep README.md environment variables table current
- Document API endpoints and integration patterns

## Integration Patterns

- Use environment variables for all API keys
- Implement proper error handling and retries
- Store integration state in `api_integrations` table
- Log all sync operations in `sync_logs` table
- Use webhooks where possible for real-time updates

## Security Notes

- All financial data must respect compliance requirements
- Use Supabase RLS for data isolation between organizations
- Encrypt sensitive integration tokens
- Validate all external API responses
- Implement rate limiting for API endpoints