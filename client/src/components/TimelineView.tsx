import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode'; // Keep free-mode styles
import { FreeMode } from 'swiper/modules'; // Keep FreeMode module
import { motion, AnimatePresence } from 'framer-motion';

interface CommitSnapshot {
  date: string;
  added: string[];
  updated: { name: string; from: string; to: string; type?: string }[];
  removed: string[];
  commitMessage: string;
  commitAuthor: string;
  commitSha: string;
}

interface TimelineViewProps {
  snapshots: CommitSnapshot[];
}

// Helper function to format commit messages
const formatCommitMessage = (message: string) => {
  const lines = message.split('\n').map(line => line.trim()).filter(Boolean);
  const mainMessage = lines[0] || '';
  const coAuthors = lines.filter(line => line.startsWith('Co-authored-by:'));
  const body = lines.slice(1).filter(line => !line.startsWith('Co-authored-by:'));

  return {
    mainMessage,
    body: body.join('\n'),
    coAuthors,
  };
};

const TimelineView: React.FC<TimelineViewProps> = ({ snapshots }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSnapshot = snapshots[activeIndex];

  // Reset activeIndex if snapshots change (e.g., new repo/dependency selected)
  useEffect(() => {
    setActiveIndex(0);
  }, [snapshots]);

  const formattedCommit = currentSnapshot ? formatCommitMessage(currentSnapshot.commitMessage) : null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dependency Timeline</h2>

      <div className="mb-8 overflow-x-auto custom-scrollbar">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={10}
          freeMode={true}
          modules={[FreeMode]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="mySwiper"
        >
          {snapshots.map((snapshot, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div
                className={`cursor-pointer p-2 rounded-lg text-center transition-all duration-300
                  ${index === activeIndex ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveIndex(index)} // Explicitly set active index on click
              >
                <p className="font-medium">{snapshot.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence mode="wait">
        {currentSnapshot && formattedCommit && (
          <motion.div
            key={activeIndex} // Key for AnimatePresence to track changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Changes on {currentSnapshot.date}</h3>
            <p className="text-gray-600 text-sm mb-2">Main Commit: {formattedCommit.mainMessage} (by {currentSnapshot.commitAuthor})</p>
            {formattedCommit.body && <p className="text-gray-600 text-sm mb-2 whitespace-pre-wrap">{formattedCommit.body}</p>}
            {formattedCommit.coAuthors.length > 0 && (
              <div className="text-gray-600 text-sm mb-2">
                <p className="font-medium">Co-authored-by:</p>
                <ul className="list-disc list-inside ml-4">
                  {formattedCommit.coAuthors.map((author, i) => (
                    <li key={i}>{author.replace('Co-authored-by: ', '')}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-gray-600 text-sm mb-4">SHA: {currentSnapshot.commitSha.substring(0, 7)}</p>

            {
              currentSnapshot.added.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium text-green-600">Added:</p>
                  <ul className="list-disc list-inside ml-4">
                    {currentSnapshot.added.map((dep, i) => (
                      <li key={i} className="text-green-700">🟢 {dep}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              currentSnapshot.updated.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium text-blue-600">Updated:</p>
                  <ul className="list-disc list-inside ml-4">
                    {currentSnapshot.updated.map((dep, i) => (
                      <li key={i} className="text-blue-700">🔵 {dep.name}@{dep.to} (from {dep.from}) {dep.type ? `(${dep.type})` : ''}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              currentSnapshot.removed.length > 0 && (
                <div className="mb-3">
                  <p className="font-medium text-red-600">Removed:</p>
                  <ul className="list-disc list-inside ml-4">
                    {currentSnapshot.removed.map((dep, i) => (
                      <li key={i} className="text-red-700">🔴 {dep}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            {
              currentSnapshot.added.length === 0 &&
              currentSnapshot.updated.length === 0 &&
              currentSnapshot.removed.length === 0 && (
                <p className="text-gray-500">No dependency changes in this snapshot.</p>
              )
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineView;
