// JS 에서 색 값이 필요할 때 사용 (tailwind.config.js 의 Figma 디자인 토큰과 동기화 유지).
export const colors = {
  primary: '#3A60FB',
  // Secondary·background 는 Figma 에서 값이 둘(500 1 / 500 2)이라 숫자 키로 유지한다.
  secondary: {
    1: '#D7E2FF',
    2: '#FF7B2F',
  },
  background: {
    1: '#EEF3FF',
    2: '#04102D',
  },
  gray: {
    100: '#F6F6F6',
    300: '#E0E0E0',
    500: '#848484',
    700: '#484848',
    900: '#282828',
  },
  white: '#FFFFFF',
  black: '#000000',
  // 카카오 브랜드 색 (디자인 팔레트 아님 — 카카오 로그인 버튼 규정).
  kakao: {
    bg: '#FEE500',
    text: 'rgba(0, 0, 0, 0.85)',
  },
  success: '#22C55E',
  error: '#EF4444',
  warning: '#FFD640',
  info: '#3B82F6',
} as const
