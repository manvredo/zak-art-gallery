"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const SHOW_AFTER_PX = 500;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Nach oben scrollen"
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full border border-gray-900 bg-[#f6f6f6] text-gray-900 hover:bg-gray-900 hover:text-[#ececec] shadow-md transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
