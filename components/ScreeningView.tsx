import React, { useState } from 'react';
import { screenCandidateCv } from '../services/geminiService';
import { Candidate } from '../types';
import { UploadIcon } from '../constants';

// Make TypeScript aware of the pdfjsLib global variable from the script tag
declare const pdfjsLib: any;

interface ScreeningViewProps {
  onBack: () => void;
  onComplete: (candidate: Candidate) => void;
}

const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  const numPages = pdf.numPages;
  let fullText = '';
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    // In some cases, `item.str` is undefined, filter those out.
    const pageText = textContent.items.map((item: any) => item.str || '').join(' ');
    fullText += pageText + '\n';
  }
  return fullText;
};


export const ScreeningView: React.FC<ScreeningViewProps> = ({ onBack, onComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      const invalidFiles = selectedFiles.filter((file: File) => file.type !== 'application/pdf');
      
      if (invalidFiles.length > 0) {
        setError('Please upload valid PDF files only.');
        return;
      }
      
      setError(null);
      setFiles(selectedFiles);
    }
  };

  const handleScreen = async () => {
    if (files.length === 0 || !jobTitle) {
      setError('Please upload at least one CV and specify a job title.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Process all files
      for (const file of files) {
        const cvText = await extractTextFromPdf(file);
        if (!cvText.trim()) {
          setError(`Could not extract text from ${file.name}. The file might be empty or image-based.`);
          continue;
        }
        
        const candidateData = await screenCandidateCv(cvText, jobTitle, specialRequirements);
        onComplete(candidateData);
      }
    } catch (err: any) {
      console.error('Screening error:', err);
      
      // Provide more detailed error messages
      if (err.message?.includes('API_KEY')) {
        setError('⚠️ API Key not configured. Please set the API_KEY environment variable.');
      } else if (err.message?.includes('quota') || err.message?.includes('rate limit')) {
        setError('⚠️ API rate limit exceeded. Please try again later.');
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        setError('⚠️ Network error. Please check your internet connection.');
      } else if (err.message?.includes('JSON')) {
        setError('⚠️ Failed to parse AI response. Please try again.');
      } else {
        setError(`⚠️ Failed to screen candidate(s): ${err.message || 'Unknown error'}. Please try again.`);
      }
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
        <h2 className="text-lg font-semibold text-gray-800">AI Screening Ứng viên</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="e.g., Senior Frontend Developer"
          />
        </div>

        <div>
          <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
            Yêu cầu đặc biệt <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            id="specialRequirements"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            placeholder="Nhập các yêu cầu bổ sung cho vị trí này..."
            rows={3}
          />
        </div>

        <div>
            <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-1">Upload CV (PDF)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                            <span>Upload a file</span>
                            <input id="cv-upload" name="cv-upload" type="file" accept=".pdf" multiple className="sr-only" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        {files.length > 0 ? `${files.length} file(s) selected: ${files.map(f => f.name).join(', ')}` : 'PDF up to 10MB (multiple files allowed)'}
                    </p>
                </div>
            </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleScreen}
          disabled={isLoading || files.length === 0 || !jobTitle}
          className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold disabled:bg-gray-400 hover:bg-primary-hover transition-colors flex items-center justify-center"
        >
          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
          {isLoading ? 'Screening...' : 'Start Screening'}
        </button>
      </div>
    </div>
  );
};