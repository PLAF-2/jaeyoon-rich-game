import React, { useEffect, useState } from 'react';
import { RANDOM_NEWS_ITEMS } from '../data/scenarios';

interface BreakingNewsTickerProps {
  customLatestNews?: string;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  customLatestNews
}) => {
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % RANDOM_NEWS_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentDisplayNews = customLatestNews || RANDOM_NEWS_ITEMS[newsIndex];

  return (
    <div className="w-full bg-slate-900/90 border-y border-amber-500/40 text-amber-300 py-1.5 px-3 flex items-center shadow-inner overflow-hidden text-xs sm:text-sm font-medium">
      <div className="flex items-center gap-1.5 bg-red-600 text-white font-black px-2 py-0.5 rounded text-[11px] sm:text-xs shrink-0 mr-2.5 animate-pulse">
        <span>⚡ 속보</span>
      </div>
      <div className="truncate flex-1 font-bold text-amber-200">
        {currentDisplayNews}
      </div>
      <div className="text-[10px] text-amber-400/70 hidden sm:block shrink-0 ml-2 font-mono">
        JBN NEWS (Jae-yoon Broadcasting)
      </div>
    </div>
  );
};
