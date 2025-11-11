
import React, { useState } from 'react';
import { generateInterviewQuestions } from '../services/geminiService';

interface InterviewQuestionsViewProps {
  onBack: () => void;
}

export const InterviewQuestionsView: React.FC<InterviewQuestionsViewProps> = ({ onBack }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle) {
      setError('Please provide a job title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuestions([]);
    try {
      const generatedQuestions = await generateInterviewQuestions(jobTitle);
      setQuestions(generatedQuestions);
    } catch (err) {
      setError('Failed to generate questions. Please check your API key.');
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
        <h2 className="text-lg font-semibold text-gray-800">Câu hỏi Phỏng vấn</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title (e.g., Data Scientist)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !jobTitle}
          className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold disabled:bg-gray-400 hover:bg-primary-hover transition-colors flex items-center justify-center"
        >
          {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
        {isLoading && <div className="text-center text-gray-500">AI is crafting questions...</div>}
        {questions.length > 0 && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 max-h-60 overflow-y-auto">
            <h3 className="font-semibold mb-2">Suggested Interview Questions:</h3>
            <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              {questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
