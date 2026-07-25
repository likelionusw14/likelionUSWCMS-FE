import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks'
import { SiteFooter, UserHeader } from '@organisms'
import type { UserShellProps } from '@types'

// 사용자 영역 공통 셸 — 상단 내비게이션(sticky) + 콘텐츠 + 푸터를 한 스크롤 컨테이너에 둔다.
// 헤더는 backdrop-blur 유리판이라, 본문과 같은 스크롤 축에 있어야 아래 콘텐츠가 비쳐 흐려지는
// Figma 의 유리 효과가 실제로 보인다(별도 스크롤 컨테이너로 분리하면 blur 대상이 없어진다).
export function UserShell({ navItems }: UserShellProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)

  // 페이지 이동 시 스크롤 위치를 최상단으로 되돌린다(window 대신 스크롤 컨테이너 기준).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="h-screen overflow-hidden bg-background-1">
      <div ref={scrollRef} className="h-full overflow-y-auto scrollbar-gutter-stable">
        <UserHeader navItems={navItems} onLogout={handleLogout} />
        {/* relative z-0 — 본문 내부 z-index(캘린더 팝업 z-50 등)가 sticky 헤더(z-20)와
            모바일 드로어(z-40) 위로 올라가지 않도록 스택 컨텍스트를 가둔다. */}
        <main className="relative z-0">
          <Outlet />
        </main>
        <SiteFooter variant="light" />
      </div>
    </div>
  )
}
