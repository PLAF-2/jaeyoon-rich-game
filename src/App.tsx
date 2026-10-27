/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { SCENARIO_TURNS, formatKoreanMoney, RANDOM_NEWS_ITEMS } from './data/scenarios';
import { Choice, PlayerAsset, WealthTier, ScenarioTurn } from './types/game';
import { PixelJaeyoon } from './components/PixelJaeyoon';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { AssetModal } from './components/AssetModal';
import { EndingModal } from './components/EndingModal';
import { MoneyParticleManager, fireMoneyConfetti } from './components/MoneyParticleManager';
import { sound } from './utils/sound';
import { 
  Volume2, 
  VolumeX, 
  Briefcase, 
  Sparkles, 
  RotateCcw, 
  Flame, 
  Coins, 
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Crown
} from 'lucide-react';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export default function App() {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [assets, setAssets] = useState<PlayerAsset[]>([]);
  const [choiceHistory, setChoiceHistory] = useState<{ text: string; gain: string }[]>([]);
  const [latestHeadline, setLatestHeadline] = useState<string>('');
  
  // Modals & Panels
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isEndingOpen, setIsEndingOpen] = useState(false);
  const [isEndlessMode, setIsEndlessMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Outcome showcase after choosing
  const [recentOutcome, setRecentOutcome] = useState<{
    choice: Choice;
    turnNumber: number;
  } | null>(null);

  // Floating text particles
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Sound sync
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playCoin();
  };

  // Determine Wealth Tier from totalMoney
  const currentTier: WealthTier = useMemo(() => {
    if (totalMoney === 0) return 'tier0';
    if (totalMoney < 100_000_000_000) return 'tier1'; // < 1000억
    if (totalMoney < 1_000_000_000_000) return 'tier2'; // < 1조
    if (totalMoney < 10_000_000_000_000) return 'tier3'; // < 10조 (슈퍼카)
    if (totalMoney < 100_000_000_000_000) return 'tier4'; // < 100조 (왕관, 전용기)
    if (totalMoney < 10_000_000_000_000_000) return 'tier5'; // < 1경 (황금옥좌)
    return 'tier6'; // 우주 절대신
  }, [totalMoney]);

  // Title based on wealth
  const wealthTitle = useMemo(() => {
    if (totalMoney === 0) return '통장 잔고 0원 백수';
    if (totalMoney < 100_000_000_000) return '벼락부자 영앤리치';
    if (totalMoney < 1_000_000_000_000) return '강남 일대 건물주';
    if (totalMoney < 10_000_000_000_000) return '황금 슈퍼카 오너 재벌';
    if (totalMoney < 100_000_000_000_000) return '국가 예산 초월 총수';
    if (totalMoney < 10_000_000_000_000_000) return '지구 및 달(Moon) 소유주';
    return '전 우주 자본주의의 절대신';
  }, [totalMoney]);

  // Current turn scenario data
  const currentScenario: ScenarioTurn = useMemo(() => {
    if (currentTurnIndex < SCENARIO_TURNS.length) {
      return SCENARIO_TURNS[currentTurnIndex];
    }
    // Procedural infinite turns for endless mode!
    const endlessTurn = currentTurnIndex + 1;
    return {
      turn: endlessTurn,
      stageName: `은하계 제패 무한 모드 (${endlessTurn}턴)`,
      prompt: `전 우주가 임재윤의 발아래에 있다. 다음으로 어떤 기상천외한 일을 벌일까?`,
      situation: `외계 황제들과 글로벌 정상들이 임재윤의 눈치를 살피고 있다.`,
      choices: [
        {
          id: `endless_${endlessTurn}_1`,
          text: `블랙홀 앞에서 '야호' 외치고 메아리 듣기`,
          flavor: `🌌 우주급 물리학 파괴`,
          gainAmount: 100_000_000_000_000_000,
          formattedGain: `+10경 원`,
          headline: `[우주 기적] 임재윤의 목소리에 감동한 블랙홀, 순금으로 결정화되어 쏟아짐!`,
          story: `소리의 진동이 사건의 지평선을 붕괴시켜 10경 원 상당의 순금 원소들이 임재윤의 앞마당으로 쏟아져 내렸다!`,
          acquiredAsset: {
            name: `블랙홀 황금 결정`,
            icon: `🕳️`,
            description: `중력마저 금빛으로 빛나는 우주적 보물`
          }
        },
        {
          id: `endless_${endlessTurn}_2`,
          text: `화성 분화구에 양은냄비 올리고 김치찌개 끓이기`,
          flavor: `🍲 우주 최초 K-푸드`,
          gainAmount: 150_000_000_000_000_000,
          formattedGain: `+15경 원`,
          headline: `[은하계 미슐랭] 임재윤의 화성 김치찌개, 우주 미슐랭 100스타 만점 획득!`,
          story: `안드로메다 미식가 연맹이 눈물을 쏟으며 '우주 역사상 가장 완벽한 감칠맛'이라며 15경 원의 상금을 헌정했다!`,
          acquiredAsset: {
            name: `화성 화산 가스레인지`,
            icon: `🌋`,
            description: `지열로 끓여내는 우주 최강의 요리 도구`
          }
        },
        {
          id: `endless_${endlessTurn}_3`,
          text: `달(Moon) 표면에 임재윤 얼굴을 픽셀 아트로 조각하기`,
          flavor: `🎨 행성급 조각 예술`,
          gainAmount: 200_000_000_000_000_000,
          formattedGain: `+20경 원`,
          headline: `[예술의 정점] 지구인 80억 명, 매일 밤 임재윤 얼굴 보며 행복 지수 1,000% 상승!`,
          story: `전 세계 정부가 정신 건강 증진 기금과 관람료 명목으로 20경 원을 만장일치로 송금했다!`,
          acquiredAsset: {
            name: `달 표면 임재윤 기념탑`,
            icon: `🗿`,
            description: `지구 어디에서나 밤하늘을 올려다보면 보이는 순금 기념탑`
          }
        }
      ]
    };
  }, [currentTurnIndex]);

  // Handle player selecting a choice
  const handleSelectChoice = (choice: Choice) => {
    // 1. Play sound
    sound.playChaChing();
    setTimeout(() => {
      sound.playCoin();
    }, 150);

    // 2. Play car rev if supercar stage
    if (choice.acquiredAsset?.name.includes('슈퍼카') || choice.acquiredAsset?.name.includes('람보르기니')) {
      setTimeout(() => sound.playCarRev(), 250);
    } else {
      setTimeout(() => sound.playLevelUp(), 300);
    }

    // 3. Visual Confetti
    fireMoneyConfetti(0.5, 0.45);

    // 4. Update Money
    setTotalMoney((prev) => prev + choice.gainAmount);

    // 5. Add Asset if present
    if (choice.acquiredAsset) {
      const newAsset: PlayerAsset = {
        id: `${choice.id}_asset_${Date.now()}`,
        name: choice.acquiredAsset.name,
        icon: choice.acquiredAsset.icon,
        description: choice.acquiredAsset.description,
        acquiredAtTurn: currentTurnIndex + 1
      };
      setAssets((prev) => [newAsset, ...prev]);
    }

    // 6. Record history
    setChoiceHistory((prev) => [
      ...prev,
      { text: choice.text, gain: choice.formattedGain }
    ]);

    // 7. Update headline
    setLatestHeadline(choice.headline);

    // 8. Add floating text
    const newText: FloatingText = {
      id: Date.now() + Math.random(),
      text: choice.formattedGain,
      x: window.innerWidth / 2 - 60 + (Math.random() * 40 - 20),
      y: 220 + (Math.random() * 30 - 15),
      color: '#fbbf24'
    };
    setFloatingTexts((prev) => [...prev, newText]);

    // 9. Show outcome modal/card
    setRecentOutcome({
      choice,
      turnNumber: currentTurnIndex + 1
    });
  };

  // Proceed to next turn
  const handleNextTurn = () => {
    setRecentOutcome(null);
    const nextIdx = currentTurnIndex + 1;
    setCurrentTurnIndex(nextIdx);

    // If completed 10 turns and not already in endless mode, trigger Ending!
    if (nextIdx >= SCENARIO_TURNS.length && !isEndlessMode) {
      sound.playGrandVictory();
      setIsEndingOpen(true);
    }
  };

  // Interactive money clicker (click on Jae-yoon or button)
  const handleMoneyThrowClick = (e?: React.MouseEvent) => {
    sound.playCoin();
    const clickX = e ? e.clientX : window.innerWidth / 2;
    const clickY = e ? e.clientY : 300;

    const bonus = 10_000_000 * Math.max(1, currentTurnIndex * 2);
    setTotalMoney((prev) => prev + bonus);

    fireMoneyConfetti(clickX / window.innerWidth, clickY / window.innerHeight);

    const newText: FloatingText = {
      id: Date.now() + Math.random(),
      text: `+${formatKoreanMoney(bonus)} 💸`,
      x: Math.max(20, Math.min(window.innerWidth - 120, clickX - 40)),
      y: Math.max(50, clickY - 50),
      color: '#34d399'
    };
    setFloatingTexts((prev) => [...prev, newText]);
  };

  // Restart game
  const handleRestart = () => {
    setCurrentTurnIndex(0);
    setTotalMoney(0);
    setAssets([]);
    setChoiceHistory([]);
    setLatestHeadline('');
    setRecentOutcome(null);
    setIsEndingOpen(false);
    setIsEndlessMode(false);
    sound.playLevelUp();
  };

  // Continue endless
  const handleContinueEndless = () => {
    setIsEndingOpen(false);
    setIsEndlessMode(true);
  };

  const removeFloatingText = (id: number) => {
    setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
  };

  // Progress percentage (10 stages = 100%)
  const progressPercent = Math.min(100, Math.round(((currentTurnIndex) / 10) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Floating particles & confetti engine */}
      <MoneyParticleManager 
        floatingTexts={floatingTexts} 
        onRemoveText={removeFloatingText} 
      />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b-2 border-amber-500/50 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          
          {/* Brand & Protagonist Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-md border border-yellow-200 text-lg">
              👑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base text-yellow-300 tracking-tight">
                  임재윤의 무조건 부자되기 대작전
                </span>
                <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded uppercase">
                  무조건 100% 성공
                </span>
              </div>
              <div className="text-[11px] text-amber-200/70 hidden sm:block">
                어떤 말도 안 되는 선택을 골라도 무조건 억만장자가 되는 5분 게임
              </div>
            </div>
          </div>

          {/* Controls: Assets, Sound, Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAssetModalOpen(true)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
              title="보유 자산 목록 보기"
            >
              <Briefcase size={14} />
              <span className="hidden sm:inline">자산 보관함</span>
              <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {assets.length}
              </span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors ${
                soundEnabled 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
              title={soundEnabled ? '효과음 켜짐' : '효과음 꺼짐'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="다시 처음부터 시작"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Real-time Breaking News Ticker */}
        <BreakingNewsTicker customLatestNews={latestHeadline} />
      </header>

      {/* WEALTH DASHBOARD STATUS BAR */}
      <section className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-b border-amber-500/30 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Main Net Worth Counter */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-400 text-2xl">
              💰
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp size={12} /> 임재윤의 현재 총 자산
              </div>
              <div className="text-2xl sm:text-3xl font-black text-yellow-300 tracking-tight drop-shadow-[0_2px_12px_rgba(250,204,21,0.5)]">
                {formatKoreanMoney(totalMoney)}
              </div>
            </div>
          </div>

          {/* Current Wealth Title & Stage Progress */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">현재 등급 및 칭호</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800 border border-amber-400/50 text-xs font-black text-amber-300">
                <Crown size={12} className="text-yellow-400" /> {wealthTitle}
              </div>
            </div>

            <div className="w-28 sm:w-36">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                <span>{isEndlessMode ? '무한 모드' : `진행도`}</span>
                <span className="text-amber-400">{isEndlessMode ? '∞' : `${progressPercent}%`}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN GAME ARENA */}
      <main className="max-w-6xl mx-auto w-full px-4 py-4 sm:py-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
          
          {/* LEFT COLUMN: PIXEL JAE-YOON STAGE (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles size={14} /> 실시간 진화형 픽셀 무대
              </span>
              <span className="text-[11px] text-slate-400">
                턴이 지날수록 부유함 폭발 🚀
              </span>
            </div>

            {/* Pixel Stage Component */}
            <PixelJaeyoon 
              tier={currentTier} 
              turn={currentTurnIndex + 1}
              onCharacterClick={handleMoneyThrowClick}
            />

            {/* Interactive "돈 뿌리기" Quick Clicker Button */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={(e) => handleMoneyThrowClick(e)}
                className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/50 pixel-button"
              >
                <span>💸</span>
                <span>클릭해서 돈 흩뿌리기! (보너스 머니)</span>
              </button>

              <button
                onClick={() => setIsAssetModalOpen(true)}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs border border-amber-500/40 transition-colors"
                title="획득한 자산 열람"
              >
                보유 아이템 ({assets.length})
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CHOICES & STORY (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/80 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-xl relative backdrop-blur-sm">
            
            {/* STAGE HEADER INFO */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-black text-xs">
                    {isEndlessMode ? `무한 턴 #${currentScenario.turn}` : `STAGE ${currentScenario.turn} / 10`}
                  </span>
                  <h2 className="text-sm sm:text-base font-black text-amber-300">
                    {currentScenario.stageName}
                  </h2>
                </div>
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> 100% 부자 확정
                </div>
              </div>

              {/* CURRENT SITUATION & PROMPT */}
              <div className="my-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-inner">
                <p className="text-xs sm:text-sm text-slate-300 font-medium mb-1.5 leading-relaxed">
                  {currentScenario.situation}
                </p>
                <p className="text-base sm:text-lg font-black text-yellow-200">
                  👉 {currentScenario.prompt}
                </p>
              </div>

              {/* CHOICES LIST */}
              <div className="space-y-3 my-4">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>선택지를 클릭하세요 (아무거나 골라도 무조건 벼락부자!)</span>
                  <span className="text-amber-400 text-[11px]">선택 1개 필수</span>
                </div>

                {currentScenario.choices.map((choice, idx) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 border-2 border-slate-700 hover:border-amber-400 transition-all duration-150 transform hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden pixel-button"
                  >
                    {/* Background gold shine on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                        {choice.flavor}
                      </span>
                      <span className="text-xs font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 shrink-0">
                        <TrendingUp size={12} /> {choice.formattedGain}
                      </span>
                    </div>

                    <div className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-200 transition-colors flex items-center justify-between">
                      <span>{idx + 1}. {choice.text}</span>
                      <ArrowRight size={16} className="text-slate-500 group-hover:text-amber-400 transition-colors shrink-0 ml-2 group-hover:translate-x-1" />
                    </div>

                    {choice.acquiredAsset && (
                      <div className="mt-2 text-[11px] text-amber-300/80 flex items-center gap-1">
                        <span>보너스 획득 예정:</span>
                        <span className="font-bold text-yellow-300">
                          {choice.acquiredAsset.icon} {choice.acquiredAsset.name}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* BOTTOM TIPS / NOTICE */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span>💡</span> 아무리 게으르고 말도 안 되는 짓을 해도 임재윤은 무조건 억만장자가 됩니다!
              </span>
              <span className="text-amber-400 font-bold hidden sm:inline">
                예상 플레이 시간: 약 3~5분
              </span>
            </div>

          </div>

        </div>
      </main>

      {/* OUTCOME MODAL (WHEN A CHOICE IS SELECTED) */}
      {recentOutcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border-4 border-yellow-400 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(250,204,21,0.6)] text-center animate-scale-in">
            
            {/* Header Icon */}
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-3xl mb-3 animate-bounce">
              🎉
            </div>

            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              [선택 결과 보고서]
            </div>

            {/* Headline */}
            <h3 className="text-base sm:text-xl font-black text-yellow-300 leading-snug mb-3 px-2">
              {recentOutcome.choice.headline}
            </h3>

            {/* Story */}
            <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed mb-4 text-left">
              {recentOutcome.choice.story}
            </div>

            {/* Profit & Asset Acquired */}
            <div className="p-3 bg-gradient-to-r from-emerald-950 via-slate-800 to-emerald-950 rounded-xl border border-emerald-500/50 mb-5 flex items-center justify-around">
              <div>
                <div className="text-[11px] text-emerald-400 font-bold">수익 정산</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300">
                  {recentOutcome.choice.formattedGain}
                </div>
              </div>

              {recentOutcome.choice.acquiredAsset && (
                <div className="border-l border-slate-700 pl-4 text-left">
                  <div className="text-[11px] text-amber-400 font-bold">새로 획득한 자산</div>
                  <div className="text-sm font-bold text-yellow-200 flex items-center gap-1.5 mt-0.5">
                    <span className="text-xl">{recentOutcome.choice.acquiredAsset.icon}</span>
                    <span>{recentOutcome.choice.acquiredAsset.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleNextTurn}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl text-base shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-2 pixel-button cursor-pointer"
            >
              <span>다음으로 더 부자되기</span>
              <ArrowRight size={18} />
            </button>

          </div>
        </div>
      )}

      {/* ASSET INVENTORY MODAL */}
      <AssetModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        assets={assets}
        totalMoney={totalMoney}
        formattedMoney={formatKoreanMoney(totalMoney)}
      />

      {/* GRAND CLIMAX ENDING MODAL */}
      <EndingModal
        isOpen={isEndingOpen}
        onRestart={handleRestart}
        onContinueEndless={handleContinueEndless}
        totalMoneyFormatted={formatKoreanMoney(totalMoney)}
        assets={assets}
        choiceHistory={choiceHistory}
      />

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-3 px-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            주인공: <span className="text-amber-300 font-bold">임재윤</span> | 100% 무조건 부자 보장 시스템
          </div>
          <div className="text-slate-400 text-[11px]">
            © 임재윤의 무조건 부자되기 대작전 - Pixel Rich Simulator
          </div>
        </div>
      </footer>

    </div>
  );
}
