import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.svg" 
              alt="RAGster Logo" 
              width={120} 
              height={120}
              priority
            />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-purple-400">RAG</span>ster
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Your Custom RAG Platform. Upload documents, connect databases, 
            and get AI-powered answers with your own API endpoint.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/auth"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/auth"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="mb-16 bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">🧠 How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">🧍‍♂️ Register / Login</h3>
                <p className="text-gray-300">Get your unique <code className="bg-black/30 px-2 py-1 rounded text-purple-300">user_id</code> and <code className="bg-black/30 px-2 py-1 rounded text-green-300">api_key</code></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">📤 Upload Data or Connect Database</h3>
                <p className="text-gray-300">Upload files (PDF, CSV, TXT, JSON) or connect SQL/NoSQL databases</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">⚙️ Automatic Processing</h3>
                <p className="text-gray-300">Text extracted → chunked → embedded → stored in vector database (per user)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">4</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">💬 Ask Questions on Dashboard</h3>
                <p className="text-gray-300">Type questions → system retrieves relevant data → LLM answers contextually</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">5</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">🌐 Use Your API Endpoint</h3>
                <p className="text-gray-300">Call <code className="bg-black/30 px-2 py-1 rounded text-blue-300">/api/ask/&lt;user_id&gt;</code> from your app/chatbot using your API key</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:border-purple-500 transition-all">
            <div className="text-5xl mb-4">�</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Multi-Format Support</h3>
            <p className="text-gray-300">
              PDF, CSV, TXT, JSON files and PostgreSQL, MySQL, MongoDB databases
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:border-purple-500 transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered RAG</h3>
            <p className="text-gray-300">
              Advanced embeddings & vector search for accurate context retrieval
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:border-purple-500 transition-all">
            <div className="text-5xl mb-4">🔌</div>
            <h3 className="text-2xl font-semibold text-white mb-4">API Integration</h3>
            <p className="text-gray-300">
              REST API endpoint for seamless integration with your applications
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
