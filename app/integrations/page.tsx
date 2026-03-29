import Link from 'next/link'
import { createServerComponentClient } from '@/lib/supabase'

export default async function IntegrationsPage() {
  const supabase = await createServerComponentClient()
  // TODO: Fetch integration_settings for connection status
  // TODO: Fetch api_keys for encrypted key management
  // TODO: Fetch sync_logs for last sync status display

  const integrations = [
    { name: 'Stripe', status: 'Connected', description: 'Payment processing and transaction data' },
    { name: 'QuickBooks', status: 'Disconnected', description: 'Accounting software integration' },
    { name: 'Gmail', status: 'Connected', description: 'Email notifications and reports' },
    { name: 'Twilio', status: 'Disconnected', description: 'SMS alerts for payment failures' },
    { name: 'Slack', status: 'Connected', description: 'Weekly cash flow reports' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
            <nav className="flex space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">Dashboard</Link>
              <Link href="/reconciliation" className="text-blue-600 hover:text-blue-500">Reconciliation</Link>
              <Link href="/alerts" className="text-blue-600 hover:text-blue-500">Alerts</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {integrations.map((integration) => (
            <div key={integration.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  integration.status === 'Connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {integration.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{integration.description}</p>
              <button className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                integration.status === 'Connected'
                  ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  : 'border border-transparent text-white bg-blue-600 hover:bg-blue-700'
              }`}>
                {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                {/* TODO: Implement connection/disconnection logic */}
              </button>
            </div>
          ))}
        </div>

        {/* API Key Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">API Key Management</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Stripe API Key</h3>
                  <p className="text-sm text-gray-500">Last updated: Oct 15, 2024</p>
                </div>
                <button className="text-blue-600 hover:text-blue-500">Update</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">QuickBooks OAuth Token</h3>
                  <p className="text-sm text-gray-500">Expires: Dec 1, 2024</p>
                </div>
                <button className="text-blue-600 hover:text-blue-500">Refresh</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Sync Schedule</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Sync Frequency</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">QuickBooks Sync Frequency</label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Daily</option>
                  <option>Every 6 hours</option>
                  <option>Twice daily</option>
                  <option>Manual only</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Save Schedule
              {/* TODO: Implement sync schedule updates */}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
