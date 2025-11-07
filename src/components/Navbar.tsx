import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              <span className="text-purple-400">RAG</span>ster
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/upload" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Upload
            </Link>
            <Link 
              href="/chat" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Chat
            </Link>
            <Link 
              href="/auth" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
