import { NavLink } from 'react-router-dom'
import closeIcon from '@/assets/icons/close.svg'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'
import type { AdminSidebarProps } from '@types'

// Figma 실측(데스크톱 1205:11709 / 태블릿 1356:10648 / 모바일 1356:10670 — 셋 다 같은 사양):
// 사이드바 배경은 white, 항목은 컨테이너(px-4) 폭을 꽉 채우고 px-24 rounded-8,
// 활성 항목만 bg-background-1 이며 글자색은 항상 black 이다(쓰이는 변수: white/secondary-2/black/background-1).
// - 캔버스 우측 끝(x≈35600)에 배경 background-1 + 활성 primary 인 대체 시안(1327:10669 / 1356:10691)이
//   따로 있지만, 실제 관리 페이지 안에 배치된 인스턴스는 1205:11709(white)라 이쪽을 따른다.
// - Figma 항목 높이는 40 두 개 + 44 네 개로 섞여 있다(디자인 노이즈). 활성 알약 높이인 40 으로 통일한다.
const MENU_ITEM = 'flex h-40 items-center rounded-8 px-24 text-sm-16 text-black'
const MENU_ITEM_ACTIVE = 'bg-background-1'

// 관리 페이지 사이드바 — 브랜드(홈 링크) + 관리 메뉴, 오버레이일 때만 닫기(X).
// 폭·위치는 셸이 정한다(여기서는 잡지 않는다): lg 이상은 흐름 안 224px 고정 컬럼(닫기 없음 — 항상 떠 있다),
// lg 미만은 AdminSidebarDrawer 가 이 컴포넌트를 오버레이(태블릿=좌측 드로어 / 모바일=상단바 아래 드롭다운)에 담고
// onClose 를 넘겨 브랜드 옆 24x24 X 를 붙인다. 그 X 로 닫으면 상단바 햄버거로 다시 연다.
export function AdminSidebar({ homeItem, navItems, onClose, className }: AdminSidebarProps) {
  return (
    <aside className={cn('flex flex-col gap-24 bg-white px-4 py-24', className)}>
      <div className="flex items-center gap-8 px-24">
        <NavLink
          to={homeItem.to}
          end
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
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-8 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img src={closeIcon} alt="" className="h-24 w-24" />
          </button>
        )}
      </div>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(MENU_ITEM, isActive && MENU_ITEM_ACTIVE)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
