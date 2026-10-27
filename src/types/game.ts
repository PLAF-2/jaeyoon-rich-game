export interface Choice {
  id: string;
  text: string;
  flavor: string; // e.g. "가장 게으른 선택", "황당무계한 행동", "국룰 로또 한 장"
  gainAmount: number; // In KRW (represented in big units)
  formattedGain: string;
  headline: string;
  story: string;
  acquiredAsset?: {
    name: string;
    icon: string;
    description: string;
  };
}

export interface ScenarioTurn {
  turn: number;
  stageName: string;
  prompt: string;
  situation: string;
  choices: Choice[];
}

export interface PlayerAsset {
  id: string;
  name: string;
  icon: string;
  description: string;
  acquiredAtTurn: number;
}

export type WealthTier = 
  | 'tier0' // 0 ~ 1천만원: 흙수저 탈출 준비
  | 'tier1' // 1천만원 ~ 10억원: 선글라스 & 금목걸이 & 돈다발
  | 'tier2' // 10억 ~ 1000억원: 명품 턱시도 & 롤렉스 양손 장착 & 금고
  | 'tier3' // 1000억 ~ 10조원: 황금 슈퍼카 주차 & 전속 집사 대동
  | 'tier4' // 10조 ~ 500조원: 전용기 JY-Air & 순금 왕관 & 애완 순금 호랑이
  | 'tier5' // 500조 ~ 5000조원: 순금 옥좌 & 지구 소유권 & 인공위성
  | 'tier6'; // 5000조 ~ 무한대: 전 우주를 매수한 자본의 신 임재윤
