
import React, { useState } from 'react';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="font-semibold text-gray-600 mb-2">{title}</h4>
        <div className="text-sm text-gray-700 space-y-2">{children}</div>
    </div>
);


export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex-1">
                    <h3 className="font-bold text-primary">{candidate.name}</h3>
                    <p className="text-sm text-text-secondary">{candidate.experience[0]?.role || 'N/A'}</p>
                    <p className="text-xs text-gray-500 mt-1">{candidate.email}</p>
                    <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                        Applied for: {candidate.jobTitle}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-center">
                        <p className="text-xs text-gray-500">AI Score</p>
                        <p className={`text-xl font-bold ${candidate.aiScore >= 75 ? 'text-green-600' : candidate.aiScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{candidate.aiScore}</p>
                    </div>
                    <button className="text-gray-500">
                        <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-fade-in">
                    <DetailSection title="Summary">
                        <p>{candidate.summary}</p>
                    </DetailSection>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailSection title="Strengths">
                            <p className="text-green-700 bg-green-50 p-2 rounded-md">{candidate.strengths}</p>
                        </DetailSection>
                        <DetailSection title="Weaknesses">
                             <p className="text-red-700 bg-red-50 p-2 rounded-md">{candidate.weaknesses}</p>
                        </DetailSection>
                    </div>
                     <DetailSection title="Recommendation">
                        <p className="font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-md">{candidate.recommendation}</p>
                    </DetailSection>
                    <DetailSection title="Skills">
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map(skill => <span key={skill} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">{skill}</span>)}
                        </div>
                    </DetailSection>
                </div>
            )}
             <style>{`
                @keyframes fade-in {
                0% { opacity: 0; max-height: 0; }
                100% { opacity: 1; max-height: 1000px; }
                }
                .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
                overflow: hidden;
                }
            `}</style>
        </div>
    );
};
