'use client';

import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {

  const scrollToTop = () => {
    console.log('Scroll to top clicked!');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
        <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
      style={{ 
        borderRadius: '9999px',
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9999,
        backgroundColor: 'rgba(250, 128, 114, 0.9)',
        color: 'white',
        border: '3px solid rgba(180, 218, 247, 0.8)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2))'
      }}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop; 