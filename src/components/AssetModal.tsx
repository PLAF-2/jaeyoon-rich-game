import React from 'react';
import { PlayerAsset } from '../types/game';
import { X, Award, Sparkles, Building, Car, Plane, DollarSign } from 'lucide-react';

interface AssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: PlayerAsset[];
  totalMoney: number;
  formattedMoney: string;
}

export const AssetModal: React.FC<AssetModalProps> = ({
  isOpen,
  onClose,
  assets,
  formattedMoney
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border-4 border-amber-500 rounded-2xl shadow-2xl p-5 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <h2 className="text-lg font-black text-amber-400">
                임재윤의 공식 재산 보관함
              </h2>
              <p className="text-xs text-slate-400">
                국세청도 감히 열어보지 못하는 비밀 자산 포트폴리오
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Total Wealth Summary banner */}
        <div className="my-3 p-3 bg-gradient-to-r from-amber-950 via-slate-800 to-amber-950 rounded-xl border border-amber-500/50 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-amber-300 font-bold">총 평가 자산</div>
            <div className="text-base sm:text-xl font-black text-yellow-300">
              {formattedMoney}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">보유 특별 자산</div>
            <div className="text-sm font-bold text-amber-400">
              {assets.length}개 보유 중
            </div>
          </div>
        </div>

        {/* Asset Grid List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-2.5">
          {assets.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              아직 획득한 자산이 없습니다. 선택지를 골라 부를 축적하세요!
            </div>
          ) : (
            assets.map((asset, idx) => (
              <div
                key={asset.id + idx}
                className="flex items-center gap-3 p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
                  {asset.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-amber-300 truncate">
                      {asset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                      {asset.acquiredAtTurn}턴 획득
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                    {asset.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-amber-500/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm transition-transform active:scale-95 shadow-md"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
