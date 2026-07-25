import type { NavSidebarTone } from '@types'

// 공통 사이드바(NavSidebar)의 톤별 Tailwind 클래스.
// light = 관리자 시안(1205:11709) 및 밝은 배경 라우트, dark = 어두운 배경 위에 얹히는
// 게스트 홈(/)·사용자 홈(/app) 시안(1360:11150·11172).
// 헤더는 드로어가 열리면 panel 을 그대로 써서 드로어와 한 덩어리로 보이게 한다.
export const NAV_SIDEBAR_TONE: Record<
  NavSidebarTone,
  { panel: string; item: string; active: string }
> = {
  light: { panel: 'bg-white', item: 'text-black', active: 'bg-background-1' },
  dark: { panel: 'bg-background-2', item: 'text-white', active: 'bg-primary' },
}

// 이 아래(모바일)는 오버레이가 헤더 바로 아래 붙는 전폭 카드라 헤더도 같은 색으로 물들여 한 덩어리로
// 보이게 하고, 여기부터(태블릿)는 화면 높이를 덮는 224px 측면 드로어라 헤더는 유리판 그대로 둔다.
// 드로어의 모드 전환과 헤더의 색 전환이 어긋나면 안 되므로 질의는 여기 한 곳에서만 정의한다.
export const NAV_SIDEBAR_TABLET_QUERY = '(min-width: 640px)'
