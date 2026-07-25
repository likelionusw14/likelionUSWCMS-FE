import { NavLink } from 'react-router-dom'
import { BRAND_NAME, NAV_SIDEBAR_TONE } from '@constants'
import { cn } from '@utils'
import type { NavSidebarProps } from '@types'

// 공통 사이드바 — 관리자·사용자·게스트가 모두 쓴다. Figma 실측으로 세 영역의 사양이 같다:
//   관리자 1205:11709(224) / 1356:10648(224) / 1356:10670(375)
//   사용자·게스트 1360:11150(224) / 1360:11172(375)
// 바깥 py-24 + 브랜드-메뉴 gap-24, 컨테이너 px-4 안에서 항목이 폭을 꽉 채우고 px-24 rounded-8.
// 높이는 내용에 맞춰 늘어난다(시안 375 프레임: 메뉴 4개 254 / 6개 354 — 항목 수만큼만 커진다).
// - Figma 항목 높이는 40 과 44 가 섞여 있다(디자인 노이즈). 활성 알약 높이인 40 으로 통일한다.
// - 폭·위치는 담는 쪽이 정한다: 관리자 lg 이상은 흐름 안 224px 고정 컬럼, lg 미만은 NavSidebarDrawer.
// - homeItem 을 줄 때만 브랜드 행이 붙고, 그 안의 24x24 X 는 onClose 가 있을 때(=오버레이일 때)만
//   붙는다. 관리자 상단바는 브레드크럼/제목이라 이 행이 필요하지만, 사용자·게스트 헤더는 브랜드와
//   햄버거를 계속 띄워두므로 드로어 안에 같은 행을 또 두지 않는다.
const MENU_ITEM = 'flex h-40 items-center rounded-8 px-24 text-sm-16'

export function NavSidebar({
  homeItem,
  navItems,
  onClose,
  tone = 'light',
  className,
  onLogout,
}: NavSidebarProps) {
  const palette = NAV_SIDEBAR_TONE[tone]

  return (
    <aside
      className={cn(
        'flex flex-col gap-24 px-4 pb-24',
        // 브랜드 행이 없으면(=헤더 바로 아래 붙는 모바일 카드) 위 패딩도 없앤다 —
        // 남겨두면 로고가 있던 자리가 빈 띠로 보인다.
        homeItem ? 'pt-24' : 'pt-0',
        palette.panel,
        className,
      )}
    >
      {homeItem && (
        <div className="flex items-center gap-8 px-24">
          <NavLink
            to={homeItem.to}
            end
            onClick={onClose}
            className="min-w-px flex-1 break-words rounded-8 text-sm-22 text-secondary-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-2"
          >
            {BRAND_NAME}
          </NavLink>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="사이드바 닫기"
              title="사이드바 닫기"
              className={cn(
                'flex h-24 w-24 shrink-0 items-center justify-center rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-primary',
                palette.item,
              )}
            >
              {/* Figma 'Icon Frame' 24x24. currentColor 라 배경 톤에 따라 색이 따라온다. */}
              <svg viewBox="0 0 24 24" aria-hidden className="h-24 w-24" fill="none">
                <path
                  d="M7 7L17 17M7 17L17 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => cn(MENU_ITEM, palette.item, isActive && palette.active)}
          >
            {item.label}
          </NavLink>
        ))}
        {/* 로그아웃 — 링크가 아니라 액션이지만 다른 메뉴와 같은 행으로 보여야 해서 같은 클래스를 쓴다.
            사용자·게스트 드로어에만 붙는다(관리자는 상단바 로그아웃 아이콘이 맡는다). */}
        {onLogout && (
          <button
            type="button"
            onClick={() => {
              onClose?.()
              onLogout()
            }}
            className={cn(MENU_ITEM, palette.item, 'text-left')}
          >
            로그아웃
          </button>
        )}
      </nav>
    </aside>
  )
}
