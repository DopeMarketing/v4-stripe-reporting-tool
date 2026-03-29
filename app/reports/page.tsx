import Link from 'next/link'
import { createServerComponentClient } from '@/lib/supabase'

export default async function ReportsPage() {
  const supabase = await createServerComponentClient()
  // TODO: Fetch stripe_transactions for report generation
  // TODO: Fetch revenue_reports for report history
  // TODO: Fetch expense_categories for categorization options

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <nav className="flex space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">Dashboard</Link>
              <Link href="/reconciliation" className="text-blue-600 hover:text-blue-500">Reconciliation</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Revenue</h2>
            <p className="text-gray-600 mb-6">Generate detailed monthly revenue reports with transaction breakdowns</p>
            <Link
              href="/reports/monthly"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Generate Monthly Report
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense Categorization</h2>
            <p className="text-gray-600 mb-6">Categorize expenses for tax preparation and compliance</p>
            <Link
              href="/reports/expenses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Categorize Expenses
            </Link>
          </div>
        </div>

        {/* Custom Date Range */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700">
                Generate
              </button>
              {/* TODO: Implement custom date range report generation */}
            </div>
          </div>
        </div>

        {/* Report History */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Monthly Revenue - October 2024</h3>
                  <p className="text-sm text-gray-500">Generated on Nov 1, 2024</p>
                </div>
                <button className="text-blue-600 hover:text-blue-500">Download PDF</button>
              </div>
              <div className="text-center text-gray-500 py-8">
                No recent reports found
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
