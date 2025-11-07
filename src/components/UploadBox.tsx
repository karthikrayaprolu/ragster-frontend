'use client';

import { useState } from 'react';

interface UploadBoxProps {
  onProcessingStageChange?: (stage: string | null) => void;
}

export default function UploadBox({ onProcessingStageChange }: UploadBoxProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string>('');
  const [dbUrl, setDbUrl] = useState('');
  const [dbType, setDbType] = useState('postgresql');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedFileType(file.type || file.name.split('.').pop() || 'unknown');
    }
  };

  const simulateProcessing = async (fileName: string) => {
    const stages = [
      `📄 Extracting text from ${fileName}...`,
      `✂️ Chunking text into semantic segments...`,
      `🧠 Generating embeddings...`,
      `💾 Storing in vector database...`,
      `✅ Processing complete!`
    ];

    for (const stage of stages) {
      onProcessingStageChange?.(stage);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    onProcessingStageChange?.(null);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    await simulateProcessing(selectedFile.name);
    alert(`File "${selectedFile.name}" processed and added to your knowledge base!`);
    setSelectedFile(null);
    setUploading(false);
  };

  const handleDbConnect = async () => {
    if (!dbUrl) return;
    
    setUploading(true);
    onProcessingStageChange?.(`🔗 Connecting to ${dbType.toUpperCase()} database...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onProcessingStageChange?.(`📊 Analyzing database schema...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onProcessingStageChange?.(`✅ Database connected successfully!`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Connected to ${dbType.toUpperCase()} database successfully!`);
    setDbUrl('');
    setUploading(false);
    onProcessingStageChange?.(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* File Upload Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-semibold text-white mb-4">📄 Upload Documents</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2 font-semibold">Supported Formats</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-black/30 rounded px-3 py-2 text-sm text-gray-300 text-center">📄 PDF</div>
            <div className="bg-black/30 rounded px-3 py-2 text-sm text-gray-300 text-center">📊 CSV</div>
            <div className="bg-black/30 rounded px-3 py-2 text-sm text-gray-300 text-center">📝 TXT</div>
            <div className="bg-black/30 rounded px-3 py-2 text-sm text-gray-300 text-center">🔤 JSON</div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Choose a file</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
            accept=".pdf,.txt,.doc,.docx,.csv,.json"
          />
        </div>

        {selectedFile && (
          <div className="mb-4 p-3 bg-black/30 rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-semibold">{selectedFile.name}</div>
                <div className="text-gray-400 text-sm">{(selectedFile.size / 1024).toFixed(2)} KB</div>
              </div>
              <div className="text-2xl">📄</div>
            </div>
          </div>
        )}

        <button
          onClick={handleFileUpload}
          disabled={!selectedFile || uploading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {uploading ? 'Processing...' : 'Upload & Process'}
        </button>
      </div>

      {/* Database Connection Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-semibold text-white mb-4">🔗 Connect Database</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Database Type</label>
          <select
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
            className="w-full bg-black/30 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Connection URL</label>
          <input
            type="text"
            value={dbUrl}
            onChange={(e) => setDbUrl(e.target.value)}
            placeholder={
              dbType === 'mongodb' 
                ? 'mongodb://user:pass@host:27017/db'
                : 'postgresql://user:pass@host:5432/db'
            }
            className="w-full bg-black/30 border border-white/20 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-sm text-blue-200">
          💡 Your database schema will be analyzed and made searchable via RAG
        </div>

        <button
          onClick={handleDbConnect}
          disabled={!dbUrl || uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {uploading ? 'Connecting...' : 'Connect Database'}
        </button>
      </div>
    </div>
  );
}
