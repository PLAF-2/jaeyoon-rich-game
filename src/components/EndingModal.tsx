import React, { useEffect, useState } from 'react';
import { PlayerAsset } from '../types/game';
import { Trophy, Sparkles, Share2, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { fireGrandJackpotConfetti } from './MoneyParticleManager';

interface EndingModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onContinueEndless: () => void;
  totalMoneyFormatted: string;
  assets: PlayerAsset[];
  choiceHistory: { text: string; gain: string }[];
}

export const EndingModal: React.FC<EndingModalProps> = ({
  isOpen,
  onRestart,
  onContinueEndless,
  totalMoneyFormatted,
  assets,
  choiceHistory
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fireGrandJackpotConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = () => {
    const text = `👑 [임재윤의 무조건 부자되기 대작전] 👑\n최종 달성 자산: ${totalMoneyFormatted}\n칭호: 전 우주 자본주의의 절대신 임재윤\n말도 안 되는 선택만 했는데 무조건 우주 1위 재벌이 되어버렸다!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(250,204,21,0.5)] my-8">
        
        {/* Glow corner decorations */}
        <div className="absolute -top-3 -left-3 text-2xl">✨</div>
        <div className="absolute -top-3 -right-3 text-2xl">✨</div>
        <div className="absolute -bottom-3 -left-3 text-2xl">✨</div>
        <div className="absolute -bottom-3 -right-3 text-2xl">✨</div>

        {/* Header Ribbon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg uppercase tracking-wider mb-2">
            <Trophy size={16} /> 5분 쾌감 엔딩 달성
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 tracking-tight">
            【우주 자본주의의 절대신: 임재윤】
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
            어떤 말도 안 되는 선택을 해도 결국 당신은 우주 최고의 부자가 되었습니다!
          </p>
        </div>

        {/* Certificate Card */}
        <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-5 mb-6 text-center shadow-inner relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 text-8xl opacity-10 pointer-events-none">
            👑
          </div>

          <div className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-1">
            OFFICIAL CERTIFICATE OF WEALTH
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            인류 및 은하계 공인 최고 대부호
          </div>
          <div className="text-3xl sm:text-4xl font-black text-yellow-300 my-3 drop-shadow-[0_2px_10px_rgba(250,204,21,0.6)]">
            {totalMoneyFormatted}
          </div>
          <div className="inline-block bg-slate-900/80 px-4 py-1 rounded-full border border-amber-400/40 text-xs font-bold text-amber-300">
            주인공 성명: <span className="text-white font-black text-sm">임재윤</span> (영구 불변)
          </div>
        </div>

        {/* Hilarious Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
            <div className="text-slate-400 text-[11px]">워렌 버핏의 반응</div>
            <div className="font-bold text-amber-300 mt-1">"임재윤 선생님 제자로 받아주십시오"</div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
            <div className="text-slate-400 text-[11px]">일론 머스크의 상태</div>
            <div className="font-bold text-amber-300 mt-1">임재윤 마당 잔디깎이 12년 차</div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
            <div className="text-slate-400 text-[11px]">소유 행성 개수</div>
            <div className="font-bold text-amber-300 mt-1">달, 화성 및 태양계 전역</div>
          </div>
        </div>

        {/* Key absurd highlights */}
        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6 max-h-36 overflow-y-auto">
          <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            <Sparkles size={14} /> 임재윤이 부자가 된 황당한 순간들
          </div>
          <div className="space-y-1.5">
            {choiceHistory.slice(-4).map((item, idx) => (
              <div key={idx} className="text-xs flex items-center justify-between text-slate-300 bg-slate-800/60 p-2 rounded-lg">
                <span className="truncate pr-2">• {item.text}</span>
                <span className="font-bold text-yellow-400 shrink-0">{item.gain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleShare}
            className="w-full sm:flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl border border-amber-500/40 flex items-center justify-center gap-2 text-sm transition-transform active:scale-95"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
            {copied ? '자랑하기 클립보드 복사 완료!' : '우주 부자 성적표 공유/복사'}
          </button>
          
          <button
            onClick={onContinueEndless}
            className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg transition-transform active:scale-95"
          >
            <ArrowRight size={16} /> 무한 자본 모드로 계속하기
          </button>

          <button
            onClick={onRestart}
            className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm flex items-center justify-center gap-1.5 transition-colors"
            title="처음부터 다시 플레이"
          >
            <RotateCcw size={16} /> 다시 시작
          </button>
        </div>

      </div>
    </div>
  );
};
