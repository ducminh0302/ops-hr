
import React, { useState } from 'react';
import { generateJobDescription } from '../services/geminiService';

interface JDGeneratorViewProps {
  onBack: () => void;
}

export const JDGeneratorView: React.FC<JDGeneratorViewProps> = ({ onBack }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [generatedJD, setGeneratedJD] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle) {
      setError('Please provide a job title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedJD('');
    try {
      const jd = await generateJobDescription(jobTitle, requirements);
      setGeneratedJD(jd);
    } catch (err) {
      setError('Failed to generate Job Description. Please check your API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 mr-3">
          &larr;
        </button>
        <h2 className="text-lg font-semibold text-gray-800">Tạo Job Description</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title (e.g., Product Manager)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Key requirements or notes (optional)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !jobTitle}
          className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold disabled:bg-gray-400 hover:bg-primary-hover transition-colors flex items-center justify-center"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
        {isLoading && <div className="text-center text-gray-500">AI is thinking...</div>}
        {generatedJD && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">Generated Job Description:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{generatedJD}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
