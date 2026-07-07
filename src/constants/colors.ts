// JS 에서 색 값이 필요할 때 사용 (tailwind.config.js 의 Figma 디자인 토큰과 동기화 유지).
export const colors = {
  primary: '#FF4823',
  secondary: '#E3FDFF',
  gray: {
    100: '#F6F6F6',
    300: '#E0E0E0',
    500: '#848484',
    700: '#484848',
    900: '#282828',
  },
  navy: '#08192E',
  white: '#FFFFFF',
  black: '#000000',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#FFD640',
  info: '#3B82F6',
} as const
