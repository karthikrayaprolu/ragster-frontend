'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [userId, setUserId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [dataSources, setDataSources] = useState<Array<{
    name: string;
    type: string;
    status: string;
    date: string;
  }>>([]);
  const [stats, setStats] = useState({
    totalQueries: 0,
    totalDocuments: 0,
    totalEmbeddings: 0,
    lastActivity: null as string | null,
  });

  useEffect(() => {
    // Get user data from localStorage (in production, fetch from API)
    const storedUserId = localStorage.getItem('user_id') || 'usr_demo123456';
    const storedApiKey = localStorage.getItem('api_key') || 'rg_demo_api_key_placeholder';
    const storedEmail = localStorage.getItem('user_email') || 'demo@ragster.com';
    
    setUserId(storedUserId);
    setApiKey(storedApiKey);
    setUserEmail(storedEmail);
    
    // Mock data sources
    setDataSources([
      { name: 'company_docs.pdf', type: 'PDF', status: 'Processed', date: '2025-11-05' },
      { name: 'product_catalog.csv', type: 'CSV', status: 'Processed', date: '2025-11-06' },
      { name: 'PostgreSQL - customers_db', type: 'Database', status: 'Connected', date: '2025-11-07' },
    ]);
    
    // Mock stats
    setStats({
      totalQueries: 156,
      totalDocuments: 12,
      totalEmbeddings: 3420,
      lastActivity: new Date().toISOString(),
    });
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const apiEndpoint = `https://api.ragster.com/ask/${userId}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back, {userEmail}</p>
        </div>

        {/* API Credentials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User ID Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🆔 Your User ID
            </h2>
            <div className="flex items-center gap-4">
              <code className="flex-1 bg-black/30 text-blue-400 px-4 py-3 rounded font-mono text-sm overflow-x-auto">
                {userId}
              </code>
              <button
                onClick={() => copyToClipboard(userId, 'User ID')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {/* API Key Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              🔑 Your API Key
            </h2>
            <div className="flex items-center gap-4">
              <code className="flex-1 bg-black/30 text-green-400 px-4 py-3 rounded font-mono text-sm overflow-x-auto">
                {apiKey}
              </code>
              <button
                onClick={() => copyToClipboard(apiKey, 'API Key')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* API Endpoint Card */}
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            🌐 Your API Endpoint
          </h2>
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <code className="flex-1 bg-black/30 text-yellow-300 px-4 py-3 rounded font-mono text-sm overflow-x-auto">
                {apiEndpoint}
              </code>
              <button
                onClick={() => copyToClipboard(apiEndpoint, 'API Endpoint')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="bg-black/30 rounded p-4 text-sm">
            <p className="text-gray-300 mb-2 font-semibold">Example cURL Request:</p>
            <code className="text-green-300 block overflow-x-auto whitespace-pre">
{`curl -X POST ${apiEndpoint} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "What is our return policy?"}'`}
            </code>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalQueries}</div>
            <div className="text-gray-300 text-sm">Total Queries</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">📄</div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalDocuments}</div>
            <div className="text-gray-300 text-sm">Documents</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">🧠</div>
            <div className="text-3xl font-bold text-white mb-1">{stats.totalEmbeddings}</div>
            <div className="text-gray-300 text-sm">Embeddings</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-lg font-bold text-white mb-1">Active</div>
            <div className="text-gray-300 text-sm">System Status</div>
          </div>
        </div>

        {/* Data Sources Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">📚 Connected Data Sources</h2>
            <Link 
              href="/upload"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors text-sm"
            >
              + Add New
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-gray-300 py-3 px-4">Name</th>
                  <th className="text-left text-gray-300 py-3 px-4">Type</th>
                  <th className="text-left text-gray-300 py-3 px-4">Status</th>
                  <th className="text-left text-gray-300 py-3 px-4">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map((source, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                    <td className="text-white py-3 px-4">{source.name}</td>
                    <td className="text-gray-300 py-3 px-4">{source.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        source.status === 'Processed' || source.status === 'Connected'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {source.status}
                      </span>
                    </td>
                    <td className="text-gray-300 py-3 px-4">{source.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/upload" className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-purple-500 transition-all group">
            <div className="text-4xl mb-3">📤</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400">Upload Data</h3>
            <p className="text-gray-300 text-sm">Add new documents or connect databases</p>
          </Link>

          <Link href="/chat" className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-purple-500 transition-all group">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400">Ask Questions</h3>
            <p className="text-gray-300 text-sm">Chat with your data using AI</p>
          </Link>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-purple-500 transition-all group cursor-pointer">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400">API Documentation</h3>
            <p className="text-gray-300 text-sm">Learn how to integrate the API</p>
          </div>
        </div>
      </div>
    </div>
  );
}
