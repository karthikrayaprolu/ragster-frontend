'use client';

import { useState } from 'react';
import UploadBox from '../../components/UploadBox';

export default function UploadPage() {
  const [processingStage, setProcessingStage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📤 Upload & Connect</h1>
          <p className="text-gray-300">Add data sources to your RAG knowledge base</p>
        </div>

        {/* Processing Pipeline Info */}
        <div className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-lg p-6 border border-blue-500/30">
          <h2 className="text-xl font-semibold text-white mb-4">⚙️ Automatic Processing Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-sm font-semibold text-white mb-1">1. Extract</div>
              <div className="text-xs text-gray-300">Text extraction from files</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✂️</div>
              <div className="text-sm font-semibold text-white mb-1">2. Chunk</div>
              <div className="text-xs text-gray-300">Split into semantic chunks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-sm font-semibold text-white mb-1">3. Embed</div>
              <div className="text-xs text-gray-300">Convert to vector embeddings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💾</div>
              <div className="text-sm font-semibold text-white mb-1">4. Store</div>
              <div className="text-xs text-gray-300">Save in vector database</div>
            </div>
          </div>
        </div>

        <UploadBox onProcessingStageChange={setProcessingStage} />

        {/* Processing Status */}
        {processingStage && (
          <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">Processing Status</h3>
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              <span className="text-gray-300">{processingStage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
