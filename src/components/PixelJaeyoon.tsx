import React from 'react';
import { WealthTier } from '../types/game';

interface PixelJaeyoonProps {
  tier: WealthTier;
  turn: number;
  onCharacterClick?: () => void;
  isCelebrating?: boolean;
}

export const PixelJaeyoon: React.FC<PixelJaeyoonProps> = ({
  tier,
  turn,
  onCharacterClick,
  isCelebrating = false,
}) => {
  // Determine unlocked accessories based on tier and turn
  const hasSunglasses = tier !== 'tier0';
  const hasGoldNecklace = tier !== 'tier0';
  const hasWatches = ['tier2', 'tier3', 'tier4', 'tier5', 'tier6'].includes(tier);
  const hasTuxedo = ['tier2', 'tier3', 'tier4', 'tier5', 'tier6'].includes(tier);
  const hasSupercar = ['tier3', 'tier4', 'tier5', 'tier6'].includes(tier);
  const hasButler = ['tier3', 'tier4', 'tier5', 'tier6'].includes(tier);
  const hasCrown = ['tier4', 'tier5', 'tier6'].includes(tier);
  const hasPetTiger = ['tier4', 'tier5', 'tier6'].includes(tier);
  const hasJet = ['tier4', 'tier5', 'tier6'].includes(tier);
  const hasThrone = ['tier5', 'tier6'].includes(tier);
  const hasCosmicGodAura = tier === 'tier6';

  // Money stack heights
  const moneyStackCount = tier === 'tier0' ? 0 : tier === 'tier1' ? 3 : tier === 'tier2' ? 6 : tier === 'tier3' ? 12 : tier === 'tier4' ? 20 : 30;

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-4 border-amber-500/40 shadow-2xl flex flex-col justify-end items-center select-none cursor-pointer group"
      onClick={onCharacterClick}
      title="임재윤을 클릭하면 돈을 뿌립니다!"
    >
      {/* Scanline & pixel overlay */}
      <div className="absolute inset-0 retro-scanlines pointer-events-none opacity-40 z-30" />

      {/* Cosmic / Godly background effects if high tier */}
      {hasCosmicGodAura && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-blue-500/30 blur-xl animate-pulse" />
          <div className="absolute top-12 right-12 w-24 h-24 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
          {/* Pixel planets */}
          <div className="absolute top-6 left-12 flex items-center space-x-1 animate-bounce duration-1000">
            <span className="text-3xl">🪐</span>
            <span className="text-xs bg-amber-400 text-slate-950 font-bold px-1 rounded">JY-화성</span>
          </div>
          <div className="absolute top-10 right-20 flex items-center space-x-1">
            <span className="text-3xl">🌕</span>
            <span className="text-xs bg-amber-400 text-slate-950 font-bold px-1 rounded">임재윤 달(Moon)</span>
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs font-bold text-amber-300 tracking-widest uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/50">
              🌌 THE GOD OF WEALTH: LIM JAE-YOON
            </span>
          </div>
        </div>
      )}

      {/* Jet in sky if tier 4+ */}
      {hasJet && (
        <div className="absolute top-4 left-4 z-10 animate-pulse flex items-center space-x-2 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
          <span className="text-2xl">✈️</span>
          <div className="text-[10px] leading-tight">
            <div className="text-amber-400 font-bold">JY AIR 001</div>
            <div className="text-slate-400">순금 개인 전용기</div>
          </div>
        </div>
      )}

      {/* Floating Status Badge */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/60 shadow-lg">
        <span className="animate-spin text-amber-400">🪙</span>
        <span className="text-xs font-bold text-amber-300">
          {tier === 'tier0' && '레벨 0: 흙수저 임재윤'}
          {tier === 'tier1' && '레벨 1: 벼락부자 임재윤 (선글라스 장착)'}
          {tier === 'tier2' && '레벨 2: 영앤리치 정장 임재윤 (롤렉스 2개)'}
          {tier === 'tier3' && '레벨 3: 슈퍼카 오너 임재윤 (황금 람보르기니)'}
          {tier === 'tier4' && '레벨 4: 국가 예산급 재벌 임재윤 (순금 왕관)'}
          {tier === 'tier5' && '레벨 5: 전설의 대재벌 임재윤 (황금 옥좌)'}
          {tier === 'tier6' && '레벨 6: 우주 자본주의의 절대신 임재윤'}
        </span>
      </div>

      {/* Click tip on hover */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-lg pointer-events-none">
        👆 클릭하면 5만원권 돈다발 발사!
      </div>

      {/* STAGE ENVIRONMENT */}
      <div className="relative w-full max-w-2xl h-[320px] flex items-end justify-center px-4 z-10">

        {/* LEFT SIDE: Supercar or Butler or Safe */}
        <div className="absolute left-2 sm:left-6 bottom-10 z-10 flex flex-col items-center">
          {hasSupercar ? (
            <div className="relative flex flex-col items-center">
              {/* Golden Supercar SVG */}
              <div className="relative transform hover:scale-105 transition-transform">
                <svg width="150" height="75" viewBox="0 0 160 80" className="drop-shadow-[0_10px_10px_rgba(245,158,11,0.5)]">
                  {/* Spoiler */}
                  <rect x="5" y="25" width="12" height="18" fill="#b45309" />
                  <rect x="3" y="22" width="22" height="6" fill="#f59e0b" />
                  
                  {/* Car Body Streamlined */}
                  <path d="M 20 45 L 45 28 L 105 28 L 145 45 L 155 58 L 10 58 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
                  <path d="M 30 43 L 50 32 L 95 32 L 115 43 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
                  
                  {/* Windows / Cockpit */}
                  <polygon points="52,33 92,33 110,42 38,42" fill="#38bdf8" opacity="0.8" />
                  
                  {/* Gold Stripes */}
                  <rect x="25" y="48" width="120" height="4" fill="#fef08a" />
                  <rect x="35" y="52" width="100" height="2" fill="#d97706" />

                  {/* Headlights (Glowing Neon) */}
                  <polygon points="142,48 155,50 148,54" fill="#38bdf8" className="animate-pulse" />
                  <circle cx="150" cy="50" r="4" fill="#ffffff" />
                  
                  {/* Wheels with Gold Rims */}
                  <circle cx="42" cy="58" r="14" fill="#0f172a" stroke="#d97706" strokeWidth="3" />
                  <circle cx="42" cy="58" r="6" fill="#fbbf24" />
                  <circle cx="125" cy="58" r="14" fill="#0f172a" stroke="#d97706" strokeWidth="3" />
                  <circle cx="125" cy="58" r="6" fill="#fbbf24" />
                  
                  {/* License Plate: JY-001 */}
                  <rect x="135" y="55" width="18" height="7" fill="#ffffff" rx="1" />
                  <text x="136" y="61" fontSize="5" fontWeight="bold" fill="#000">JY-1</text>
                </svg>
                {/* Headlight beam */}
                <div className="absolute top-10 right-[-30px] w-16 h-8 bg-gradient-to-r from-cyan-300/40 to-transparent transform -skew-y-6 pointer-events-none" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded border border-amber-500/40 mt-1">
                황금 람보르기니 (번호판: JY-1)
              </span>
            </div>
          ) : hasButler ? (
            <div className="flex flex-col items-center">
              <span className="text-4xl animate-bounce">🤵</span>
              <span className="text-[10px] font-bold text-slate-300 bg-black/60 px-1.5 rounded">집사 세바스찬</span>
            </div>
          ) : tier !== 'tier0' ? (
            <div className="flex flex-col items-center">
              <span className="text-3xl animate-bounce">🐷🪙</span>
              <span className="text-[10px] font-bold text-amber-400 bg-black/60 px-1.5 rounded">황금 돼지저금통</span>
            </div>
          ) : null}
        </div>

        {/* RIGHT SIDE: Pet Tiger or Golden Vault or Butler */}
        <div className="absolute right-2 sm:right-6 bottom-10 z-10 flex flex-col items-center">
          {hasPetTiger ? (
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="text-4xl transform scale-x-[-1] inline-block animate-pulse">🐅</span>
                <span className="absolute -top-2 -right-1 text-xs">👑</span>
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-1.5 rounded border border-amber-500/40 mt-1">
                애완 순금 백호랑이
              </span>
            </div>
          ) : hasButler && !hasSupercar ? (
            <div className="flex flex-col items-center">
              <span className="text-3xl">🍸</span>
              <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-1.5 rounded">골드 샴페인</span>
            </div>
          ) : tier !== 'tier0' ? (
            <div className="flex flex-col items-center">
              <span className="text-3xl">🗄️💎</span>
              <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-1.5 rounded">스위스 비밀 금고</span>
            </div>
          ) : null}
        </div>

        {/* CENTER: JAE-YOON CHARACTER & THRONE */}
        <div className="relative flex flex-col items-center z-20">
          
          {/* Golden Throne behind Jae-yoon if tier 5+ */}
          {hasThrone && (
            <div className="absolute -top-16 z-0 flex flex-col items-center opacity-90 scale-125">
              <div className="w-28 h-40 bg-gradient-to-t from-amber-700 via-yellow-500 to-amber-300 rounded-t-3xl border-4 border-yellow-200 shadow-[0_0_30px_rgba(251,191,36,0.8)] flex flex-col items-center pt-3">
                <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-yellow-100 shadow-md animate-pulse" />
                <div className="mt-2 text-[10px] font-black text-amber-950 tracking-tighter">IM JAE YOON</div>
                <div className="mt-1 flex gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          )}

          {/* Godly Aura / Halo */}
          {hasCosmicGodAura && (
            <div className="absolute -top-14 w-36 h-36 rounded-full border-4 border-amber-300/80 bg-amber-400/20 blur-sm animate-spin duration-3000 pointer-events-none" />
          )}

          {/* Golden Crown */}
          {hasCrown && (
            <div className="relative -mb-1 z-30 animate-bounce duration-700">
              <div className="flex items-center justify-center">
                <svg width="44" height="26" viewBox="0 0 44 26">
                  <polygon points="2,24 6,8 14,18 22,2 30,18 38,8 42,24" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
                  <circle cx="22" cy="4" r="3" fill="#ef4444" />
                  <circle cx="6" cy="9" r="2.5" fill="#3b82f6" />
                  <circle cx="38" cy="9" r="2.5" fill="#10b981" />
                  <rect x="5" y="21" width="34" height="3" fill="#d97706" />
                </svg>
              </div>
            </div>
          )}

          {/* PIXEL CHARACTER JAE-YOON (SVG PIXEL ART) */}
          <div className="relative animate-jaeyoon-idle hover:scale-105 transition-transform duration-150">
            <svg width="120" height="170" viewBox="0 0 24 34" className="drop-shadow-[0_12px_12px_rgba(0,0,0,0.6)]">
              {/* HAIR: Stylish Black Pixel Bangs */}
              <rect x="7" y="2" width="10" height="3" fill="#1e1b18" />
              <rect x="6" y="3" width="12" height="3" fill="#1e1b18" />
              <rect x="5" y="5" width="3" height="4" fill="#1e1b18" />
              <rect x="16" y="5" width="3" height="4" fill="#1e1b18" />
              <rect x="7" y="4" width="3" height="2" fill="#2d2822" />

              {/* FACE (Skin tone) */}
              <rect x="7" y="5" width="10" height="8" fill="#ffd1a4" />
              
              {/* EYES OR SUNGLASSES */}
              {hasSunglasses ? (
                /* Pixel Thug Life / Deal With It Golden or Black Sunglasses */
                <g className="animate-pulse">
                  <rect x="6" y="7" width="5" height="3" fill="#0f172a" />
                  <rect x="13" y="7" width="5" height="3" fill="#0f172a" />
                  <rect x="11" y="8" width="2" height="1" fill="#0f172a" />
                  {/* Gold frame highlight */}
                  <rect x="6" y="7" width="5" height="1" fill="#f59e0b" />
                  <rect x="13" y="7" width="5" height="1" fill="#f59e0b" />
                  {/* White pixel glint */}
                  <rect x="7" y="8" width="1" height="1" fill="#ffffff" />
                  <rect x="14" y="8" width="1" height="1" fill="#ffffff" />
                </g>
              ) : (
                /* Normal Eyes (Smiling / Friendly) */
                <g>
                  <rect x="8" y="7" width="2" height="2" fill="#1e293b" />
                  <rect x="14" y="7" width="2" height="2" fill="#1e293b" />
                  <rect x="9" y="7" width="1" height="1" fill="#ffffff" />
                  <rect x="15" y="7" width="1" height="1" fill="#ffffff" />
                </g>
              )}

              {/* MOUTH / SMILE */}
              <rect x="10" y="11" width="4" height="1" fill="#b91c1c" />
              {tier !== 'tier0' && (
                <rect x="10" y="10" width="1" height="1" fill="#ffffff" /> /* Confident smirk */
              )}

              {/* CHEEKS */}
              <rect x="7" y="10" width="1" height="1" fill="#fca5a5" />
              <rect x="16" y="10" width="1" height="1" fill="#fca5a5" />

              {/* NECK */}
              <rect x="10" y="13" width="4" height="1" fill="#fbb686" />

              {/* GOLD CHAIN NECKLACE */}
              {hasGoldNecklace && (
                <g>
                  <rect x="9" y="13" width="6" height="1" fill="#f59e0b" />
                  <rect x="10" y="14" width="4" height="1" fill="#fbbf24" />
                  <rect x="11" y="15" width="2" height="2" fill="#fef08a" />
                  <rect x="11" y="15" width="2" height="1" fill="#d97706" />
                </g>
              )}

              {/* BODY / CLOTHING */}
              {hasTuxedo ? (
                /* Luxury Billionaire Tuxedo with Gold Bowtie / Lapel */
                <g>
                  <rect x="6" y="14" width="12" height="10" fill="#090d16" />
                  {/* White shirt inner */}
                  <polygon points="10,14 14,14 12,20" fill="#f8fafc" />
                  {/* Gold tie */}
                  <polygon points="11,15 13,15 12,18" fill="#f59e0b" />
                  {/* Gold Pocket Square */}
                  <rect x="7" y="16" width="2" height="1" fill="#facc15" />
                  {/* Luxury Gold Buttons */}
                  <rect x="11.5" y="19" width="1" height="1" fill="#fbbf24" />
                  <rect x="11.5" y="21" width="1" height="1" fill="#fbbf24" />
                </g>
              ) : (
                /* Casual Grey/Teal Hoodie */
                <g>
                  <rect x="6" y="14" width="12" height="10" fill="#334155" />
                  <rect x="10" y="14" width="4" height="3" fill="#475569" />
                  {/* Hoodie Pocket */}
                  <rect x="8" y="20" width="8" height="3" fill="#1e293b" />
                </g>
              )}

              {/* ARMS & WATCHES */}
              {/* Left Arm */}
              <rect x="4" y="14" width="2" height="8" fill={hasTuxedo ? "#090d16" : "#334155"} />
              <rect x="4" y="22" width="2" height="2" fill="#ffd1a4" />
              {/* Right Arm */}
              <rect x="18" y="14" width="2" height="8" fill={hasTuxedo ? "#090d16" : "#334155"} />
              <rect x="18" y="22" width="2" height="2" fill="#ffd1a4" />

              {/* ROLEX GOLD WATCHES ON BOTH WRISTS */}
              {hasWatches && (
                <g className="animate-pulse">
                  <rect x="4" y="21" width="2" height="1" fill="#facc15" />
                  <rect x="18" y="21" width="2" height="1" fill="#facc15" />
                  <rect x="5" y="21" width="1" height="1" fill="#10b981" /> /* Green Submariner dial */
                  <rect x="18" y="21" width="1" height="1" fill="#3b82f6" /> /* Blue Daytona dial */
                </g>
              )}

              {/* Diamond Rings */}
              {hasWatches && (
                <rect x="19" y="23" width="1" height="1" fill="#67e8f9" />
              )}

              {/* PANTS */}
              <rect x="7" y="24" width="10" height="6" fill={hasTuxedo ? "#090d16" : "#1e293b"} />
              {/* Leg separation */}
              <rect x="11" y="26" width="2" height="4" fill="#020617" opacity="0.4" />

              {/* SHOES */}
              <rect x="6" y="30" width="4" height="2" fill={hasTuxedo ? "#b45309" : "#64748b"} />
              <rect x="14" y="30" width="4" height="2" fill={hasTuxedo ? "#b45309" : "#64748b"} />
              {hasTuxedo && (
                /* Gold buckles on shoes */
                <g>
                  <rect x="7" y="30" width="2" height="1" fill="#fbbf24" />
                  <rect x="15" y="30" width="2" height="1" fill="#fbbf24" />
                </g>
              )}
            </svg>
          </div>

          {/* NAME PLATE */}
          <div className="mt-1 px-3 py-1 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full border-2 border-yellow-200 shadow-md flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-950 tracking-wider">
              주인공: 임재윤
            </span>
            <span className="text-xs">💰</span>
          </div>

        </div>

        {/* CASH STACKS ON GROUND & BILLS */}
        <div className="absolute inset-x-0 bottom-0 h-10 flex justify-center items-end pointer-events-none z-10">
          {moneyStackCount > 0 && (
            <div className="flex items-end justify-center gap-1 sm:gap-2 flex-wrap max-w-lg mb-1">
              {Array.from({ length: Math.min(moneyStackCount, 16) }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-coin-float"
                  style={{ animationDelay: `${(i % 5) * 0.2}s` }}
                >
                  <div className="text-base sm:text-lg leading-none">
                    {i % 3 === 0 ? '💵' : i % 3 === 1 ? '💰' : '🪙'}
                  </div>
                  <div className="w-5 sm:w-7 h-2 bg-emerald-600 rounded-xs border border-emerald-300 text-[6px] text-white text-center font-bold">
                    50000
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* FLOOR / GROUND */}
      <div className="w-full h-8 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-t-2 border-amber-500/50 flex items-center justify-between px-6 z-20">
        <span className="text-[10px] text-amber-400 font-bold tracking-wider">
          💎 JAE-YOON WEALTH STAGE
        </span>
        <span className="text-[10px] text-amber-200/80">
          터치/클릭: 머니레인 발동 💸
        </span>
      </div>
    </div>
  );
};
