import plugin from 'tailwindcss/plugin.js'

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
      white: '#FFFFFF', // Color / White / 500
      black: '#000000', // Color / Black / 500
      primary: { 500: '#3A60FB', DEFAULT: '#3A60FB' }, // Color / Primary / 500
      // Secondary·Background 는 Figma 에서 값이 둘(500 1 / 500 2)이라 숫자 접미사로 노출한다.
      secondary: {
        1: '#D7E2FF', // Color / Secondary / 500 1
        2: '#FF7B2F', // Color / Secondary / 500 2
        DEFAULT: '#D7E2FF',
      },
      background: {
        1: '#EEF3FF', // Color / Background / 500 1
        2: '#04102D', // Color / Background / 500 2
        DEFAULT: '#EEF3FF',
      },
      gray: {
        100: '#F6F6F6',
        300: '#E0E0E0',
        500: '#848484',
        700: '#484848',
        900: '#282828',
      },
      success: { 500: '#22C55E', DEFAULT: '#22C55E' }, // Color / Success / 500
      error: { 500: '#EF4444', DEFAULT: '#EF4444' }, // Color / Error / 500
      warning: { 500: '#FFD640', DEFAULT: '#FFD640' }, // Color / Warning / 500
      info: { 500: '#3B82F6', DEFAULT: '#3B82F6' }, // Color / Info / 500
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
    // ── 모서리(Radius): Figma 토큰만. 키 = px 값 (spacing 과 동일 규칙). ──
    // DEFAULT(=rounded) 는 8px 로 둔다 (기존 사용처 유지).
    borderRadius: {
      none: '0px',
      DEFAULT: '8px', // Radius / 8
      4: '4px', // Radius / 4
      8: '8px', // Radius / 8
      16: '16px', // Radius / 16
      full: '999px', // Radius / 999
    },
    extend: {
      fontFamily: {
        // Figma 텍스트 스타일이 전부 Pretendard 단일 패밀리다 (라틴 전용 Inter 병기 폐지).
        sans: ['Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // ── Figma 텍스트 스타일 (size / line-height / letter-spacing / weight 번들) ──
        // Heading=Bold(700), SM=Semibold(600), M=Medium(500), R=Regular(400).
        // Figma 의 line-height "Auto" 는 normal, letter-spacing 은 % → em 으로 옮긴다.
        h0: ['56px', { lineHeight: '72px', letterSpacing: '0.06em', fontWeight: '700' }], // Heading / H0
        h1: ['40px', { lineHeight: 'normal', fontWeight: '700' }], // Heading / H1
        'sm-22': ['22px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-20': ['20px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-18': ['18px', { lineHeight: 'normal', fontWeight: '600' }],
        'sm-16': ['16px', { lineHeight: 'normal', fontWeight: '600' }],
        'm-20': ['20px', { lineHeight: 'normal', fontWeight: '500' }],
        'm-18': ['18px', { lineHeight: 'normal', fontWeight: '500' }],
        // 본문 전용: 줄간격·자간이 붙은 별도 스타일 (M/18 (본문용), M/16 (홈 본문용))
        'm-18-body': ['18px', { lineHeight: '26px', letterSpacing: '0.02em', fontWeight: '500' }],
        'm-16': ['16px', { lineHeight: 'normal', fontWeight: '500' }],
        'm-16-home': ['16px', { lineHeight: '24px', letterSpacing: '-0.02em', fontWeight: '500' }],
        'm-14': ['14px', { lineHeight: 'normal', fontWeight: '500' }],
        'r-20': ['20px', { lineHeight: 'normal', fontWeight: '400' }],
        'r-14': ['14px', { lineHeight: 'normal', fontWeight: '400' }],
        'r-12': ['12px', { lineHeight: 'normal', fontWeight: '400' }],
      },
      // ── 그라디언트: Figma 색상 스타일. 레이어 순서(위→아래)를 그대로 옮긴다. ──
      // Figma 는 [방사형/선형 오버레이] 위에 [솔리드 베이스] 를 깐 2겹 구성이라
      // background-image 다중 레이어로 그대로 재현한다(오버레이 불투명도는 stop alpha 에 곱해 넣음).
      // 위치·반지름은 Figma gradientTransform 을 오브젝트 좌표계로 역변환해 얻은 값이다.
      backgroundImage: {
        // 메인컬러 그라디언트: Primary 위에 Secondary-1 방사형 30%
        'gradient-primary':
          'radial-gradient(ellipse 77.6% 131.6% at 21.3% 12.1%, rgb(215 226 255 / 0.3) 0%, rgb(215 226 255 / 0) 100%), linear-gradient(#3A60FB, #3A60FB)',
        // 서브컬러 그라디언트: Secondary-1 위에 Primary 방사형 20%
        'gradient-secondary':
          'radial-gradient(ellipse 64.9% 220.7% at 94.6% -5.3%, rgb(58 96 251 / 0.2) 0%, rgb(58 96 251 / 0) 100%), linear-gradient(#D7E2FF, #D7E2FF)',
        // 화이트 그라디언트: White 위에 Secondary-1 방사형 50%
        'gradient-white':
          'radial-gradient(ellipse 47.8% 83.1% at 94.0% 76.2%, rgb(215 226 255 / 0.5) 0%, rgb(215 226 255 / 0) 100%), linear-gradient(#FFFFFF, #FFFFFF)',
        // 타이포: White 위에 Primary 선형 70% (아래로 갈수록 진해짐).
        // 텍스트에 쓸 때는 `bg-gradient-typo bg-clip-text text-transparent` 조합.
        'gradient-typo':
          'linear-gradient(to bottom, rgb(58 96 251 / 0) 33.8%, rgb(58 96 251 / 0.604) 100%), linear-gradient(#FFFFFF, #FFFFFF)',
      },
      // ── 효과(그림자): Figma 효과 스타일. ──
      boxShadow: {
        // 그림자 — 바깥쪽 그림자 X0 Y4 B8 S0, #070D28 20%
        drop: '0 4px 8px 0 rgb(7 13 40 / 0.2)',
        // 화이트배경 엠보 — 위 흰색 하이라이트 + 아래 primary 음영
        'emboss-light':
          'inset 0 4px 4px 0 rgb(255 255 255 / 0.45), inset 0 -4px 4px 0 rgb(58 96 251 / 0.3)',
        // 다크배경 엠보 — 같은 구성, 더 강한 대비
        'emboss-dark':
          'inset 0 4px 4px 0 rgb(255 255 255 / 1), inset 0 -4px 4px 0 rgb(58 96 251 / 0.5)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // ── 유리(Glass) 효과 ──
      // Figma 의 GLASS 는 굴절까지 계산하는 전용 효과라 CSS 에 1:1 대응이 없다.
      // blur radius 5 → backdrop-blur, depth 1 + lightAngle -45° + intensity 100%
      // → 좌상단이 밝고 우하단이 어두운 1px inset 하이라이트로 근사한다.
      // (실제 화면에서 Figma 와 대조 후 미세조정 필요)
      addUtilities({
        '.effect-glass': {
          'backdrop-filter': 'blur(5px)',
          '-webkit-backdrop-filter': 'blur(5px)',
          'box-shadow':
            'inset 1px 1px 1px 0 rgb(255 255 255 / 0.6), inset -1px -1px 1px 0 rgb(255 255 255 / 0.25)',
        },
        // 유리+그림자 — 유리 위에 `그림자`(shadow-drop) 를 얹은 Figma 스타일
        '.effect-glass-shadow': {
          'backdrop-filter': 'blur(5px)',
          '-webkit-backdrop-filter': 'blur(5px)',
          'box-shadow':
            '0 4px 8px 0 rgb(7 13 40 / 0.2), inset 1px 1px 1px 0 rgb(255 255 255 / 0.6), inset -1px -1px 1px 0 rgb(255 255 255 / 0.25)',
        },
      })
    }),
  ],
}
