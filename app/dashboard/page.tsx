import Link from 'next/link'
import { createServerComponentClient } from '@/lib/supabase'

export default async function DashboardPage() {
  const supabase = await createServerComponentClient()
  // TODO: Fetch user session and role from Supabase auth
  // TODO: Fetch stripe_transactions for revenue chart
  // TODO: Fetch payment_failures for alerts
  // TODO: Fetch cash_flow_reports for summary
  // TODO: Fetch reconciliation_status for status display

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <nav className="flex space-x-4">
              <Link href="/reports" className="text-blue-600 hover:text-blue-500">Reports</Link>
              <Link href="/reconciliation" className="text-blue-600 hover:text-blue-500">Reconciliation</Link>
              <Link href="/settings" className="text-blue-600 hover:text-blue-500">Settings</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Monthly Revenue</h3>
            <p className="text-2xl font-bold text-green-600">$0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Failed Payments</h3>
            <p className="text-2xl font-bold text-red-600">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Cash Flow</h3>
            <p className="text-2xl font-bold text-blue-600">$0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Reconciliation</h3>
            <p className="text-2xl font-bold text-yellow-600">Pending</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/reports/monthly" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
            <p className="text-gray-600">Create monthly revenue reports</p>
          </Link>
          <Link href="/reconciliation" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-900">Reconcile Payments</h3>
            <p className="text-gray-600">Match Stripe with QuickBooks</p>
          </Link>
          <Link href="/alerts" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-gray-900">Payment Alerts</h3>
            <p className="text-gray-600">Manage failure notifications</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
