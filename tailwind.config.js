/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 한글 본문 = Pretendard, 영문/숫자 강조 = Roboto
        sans: ['Pretendard Variable', 'Pretendard', 'Roboto', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        pretendard: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      colors: {
        // 멋쟁이사자처럼 브랜드 오렌지 스케일
        brand: {
          50: '#FFF3EB',
          100: '#FFE1CC',
          200: '#FFC299',
          300: '#FFA366',
          400: '#FF8B3D',
          500: '#FF7710', // DEFAULT
          600: '#E0640A',
          700: '#B34E06',
          800: '#803804',
          900: '#542502',
          DEFAULT: '#FF7710',
        },
        // 관리자 UI 중립 표면/텍스트 토큰
        surface: {
          base: '#FFFFFF',
          subtle: '#F7F8FA',
          muted: '#EEF0F3',
          border: '#E2E5EA',
        },
        content: {
          DEFAULT: '#1A1D21',
          muted: '#5B6470',
          subtle: '#8A929E',
          inverse: '#FFFFFF',
        },
        state: {
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
          info: '#2563EB',
        },
      },
      borderRadius: {
        card: '12px',
        'card-lg': '16px',
      },
    },
  },
  plugins: [],
}
