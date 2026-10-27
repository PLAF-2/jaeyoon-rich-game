import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export function fireMoneyConfetti(x = 0.5, y = 0.6) {
  // Gold and money green confetti burst
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { x, y },
    colors: ['#f59e0b', '#10b981', '#fbbf24', '#fef08a', '#34d399'],
    shapes: ['square'],
    scalar: 1.2,
  });
}

export function fireGrandJackpotConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#f59e0b', '#fbbf24', '#10b981', '#ffffff']
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#f59e0b', '#fbbf24', '#10b981', '#ffffff']
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

interface MoneyParticleManagerProps {
  floatingTexts: FloatingText[];
  onRemoveText: (id: number) => void;
}

export const MoneyParticleManager: React.FC<MoneyParticleManagerProps> = ({
  floatingTexts,
  onRemoveText
}) => {
  useEffect(() => {
    if (floatingTexts.length === 0) return;
    const timers = floatingTexts.map(item =>
      setTimeout(() => {
        onRemoveText(item.id);
      }, 1400)
    );
    return () => timers.forEach(clearTimeout);
  }, [floatingTexts, onRemoveText]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingTexts.map(item => (
        <div
          key={item.id}
          className="absolute font-black text-xl sm:text-2xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] animate-bounce select-none transition-all duration-1000 ease-out"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            color: item.color,
            textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 20px rgba(245,158,11,0.6)',
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
