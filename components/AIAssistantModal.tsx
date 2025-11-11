
import React from 'react';
import { ScreeningView } from './ScreeningView';
import { JDGeneratorView } from './JDGeneratorView';
import { InterviewQuestionsView } from './InterviewQuestionsView';
import { ModalType, Candidate } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  onCandidateScreened: (candidate: Candidate) => void;
}

const FeatureCard: React.FC<{ title: string, description: string, onClick: () => void }> = ({ title, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary transition-all duration-200"
  >
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-text-secondary">{description}</p>
  </button>
);


export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, activeModal, setActiveModal, onCandidateScreened }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (activeModal) {
      case ModalType.AI_ASSISTANT_MAIN:
        return (
          <>
            <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
            <p className="text-sm text-text-secondary mt-1 mb-6">Chọn tính năng AI để hỗ trợ công việc của bạn</p>
            <div className="space-y-4">
              <FeatureCard 
                title="AI Screening Ứng viên"
                description="AI đánh giá CV và profile ứng viên tự động"
                onClick={() => setActiveModal(ModalType.SCREENING)}
              />
              <FeatureCard 
                title="Tạo Job Description"
                description="AI viết JD chuyên nghiệp và chi tiết"
                onClick={() => setActiveModal(ModalType.JD_GENERATOR)}
              />
              <FeatureCard 
                title="Câu hỏi Phỏng vấn"
                description="AI đề xuất câu hỏi phỏng vấn phù hợp"
                onClick={() => setActiveModal(ModalType.INTERVIEW_QUESTIONS)}
              />
            </div>
          </>
        );
      case ModalType.SCREENING:
        return <ScreeningView onBack={() => setActiveModal(ModalType.AI_ASSISTANT_MAIN)} onComplete={onCandidateScreened} />;
      case ModalType.JD_GENERATOR:
        return <JDGeneratorView onBack={() => setActiveModal(ModalType.AI_ASSISTANT_MAIN)} />;
      case ModalType.INTERVIEW_QUESTIONS:
        return <InterviewQuestionsView onBack={() => setActiveModal(ModalType.AI_ASSISTANT_MAIN)} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {getModalContent()}
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
