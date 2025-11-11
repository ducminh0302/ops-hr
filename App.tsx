
import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { CandidateCard } from './components/CandidateCard';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AIOpsLogo, UserIcon, ClockIcon, ScoreIcon, OfferIcon } from './constants';
import { Candidate, ModalType } from './types';

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);

  const stats = [
    { title: 'Tổng Ứng viên', value: candidates.length, icon: <UserIcon className="w-6 h-6 text-blue-500" /> },
    { title: 'Đang Phỏng vấn', value: 0, icon: <ClockIcon className="w-6 h-6 text-purple-500" /> },
    { title: 'AI Score TB', value: candidates.length > 0 ? Math.round(candidates.reduce((acc, c) => acc + c.aiScore, 0) / candidates.length) : 0, icon: <ScoreIcon className="w-6 h-6 text-indigo-500" /> },
    { title: 'Offer Đã gửi', value: 0, icon: <OfferIcon className="w-6 h-6 text-green-500" /> },
  ];

  const handleAddCandidate = (candidate: Candidate) => {
    setCandidates(prev => [...prev, candidate]);
    setActiveModal(ModalType.NONE);
  };

  return (
    <div className="min-h-screen bg-background text-text-main font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Nhân sự (HR)</h1>
              <p className="text-text-secondary">Quản lý tuyển dụng và ứng viên</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(ModalType.AI_ASSISTANT_MAIN)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-primary-hover transition-colors duration-200"
          >
            <AIOpsLogo className="w-5 h-5 mr-2" />
            AI Assistant
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Danh sách Ứng viên</h2>
          {candidates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Chưa có ứng viên nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <CandidateCard key={index} candidate={candidate} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {activeModal !== ModalType.NONE && (
        <AIAssistantModal
          isOpen={activeModal !== ModalType.NONE}
          onClose={() => setActiveModal(ModalType.NONE)}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          onCandidateScreened={handleAddCandidate}
        />
      )}
    </div>
  );
};

export default App;
