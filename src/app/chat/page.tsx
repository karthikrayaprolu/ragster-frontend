'use client';

import ChatBox from '../../components/ChatBox';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💬 Chat with Your Data</h1>
          <p className="text-gray-300">Ask questions and get AI-powered answers from your knowledge base</p>
        </div>

        {/* Info Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-lg p-4 border border-purple-500/30">
          <p className="text-sm text-gray-200">
            💡 <strong>How it works:</strong> Your question → Relevant data retrieval from vector DB → LLM generates contextual answer
          </p>
        </div>

        <ChatBox />
      </div>
    </div>
  );
}
