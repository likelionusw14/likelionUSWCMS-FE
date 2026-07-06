/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // ── 색상: Figma 디자인 토큰(Color/*)을 단일 출처로 등록. ──
    // 팔레트를 Figma 로 고정하기 위해 Tailwind 기본 색을 대체한다(임의 색 방지).
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
      white: '#FFFFFF', // Color / White
      black: '#000000', // Color / Black
      primary: { 500: '#FF4823', DEFAULT: '#FF4823' }, // Color / Primary
      secondary: { 500: '#E3FDFF', DEFAULT: '#E3FDFF' }, // Color / Secondary
      gray: {
        100: '#F6F6F6',
        300: '#E0E0E0',
        500: '#848484',
        700: '#484848',
        900: '#282828',
      },
      navy: { 500: '#08192E', DEFAULT: '#08192E' }, // Color / Navy
      success: { 500: '#22C55E', DEFAULT: '#22C55E' }, // Color / Success
      error: { 500: '#EF4444', DEFAULT: '#EF4444' }, // Color / Error
      warning: { 500: '#FFD640', DEFAULT: '#FFD640' }, // Color / Warning
      info: { 500: '#3B82F6', DEFAULT: '#3B82F6' }, // Color / Info
    },
    // ── 간격(Spacing): Figma 토큰. 키 = px 값 (예: p-16 = 16px, gap-8 = 8px). ──
    // Tailwind 기본 배수 스케일을 대체하므로 숫자는 곧 픽셀이다.
    spacing: {
      0: '0px',
      px: '1px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      64: '64px',
      96: '96px',
    },
    // ── 모서리(Radius): Figma 토큰만. rounded = 8px, rounded-full = 999px. ──
    borderRadius: {
      none: '0px',
      DEFAULT: '8px', // Radius / 8
      full: '999px', // Radius / 999
    },
    extend: {
      fontFamily: {
        // 영문/숫자 = Inter, 한글 = Pretendard. Inter 를 앞에 둬 라틴 글리프에만 적용.
        // Inter 는 Medium(500) 한 weight 만 로드 + body 의 font-synthesis:none →
        // bold 문맥에서도 라틴은 항상 Inter Medium, 한글만 Pretendard 가 실제 가중치로 렌더.
        sans: ['Inter', 'Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        pretendard: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      fontSize: {
        // ── Figma 텍스트 스타일 (size / line-height Auto=normal / weight 번들) ──
        // Heading=Bold(700), SM=Semibold(600), M=Medium(500), R=Regular(400)
        h1: ['40px', { lineHeight: 'normal', fontWeight: '700' }],
        h2: ['18px', { lineHeight: 'normal', fontWeight: '700' }],
        'sm-22': ['22px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-20': ['20px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-18': ['18px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-16': ['16px', { lineHeight: 'normal', fontWeight: '600' }],
        'm-20': ['20px', { lineHeight: 'normal', fontWeight: '500' }],
        'm-18': ['18px', { lineHeight: 'normal', fontWeight: '500' }],
        'm-16': ['16px', { lineHeight: 'normal', fontWeight: '500' }],
        'm-14': ['14px', { lineHeight: 'normal', fontWeight: '500' }],
        'r-14': ['14px', { lineHeight: 'normal', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
