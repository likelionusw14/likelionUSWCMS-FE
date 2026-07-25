import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PublicHeader, SiteFooter } from '@organisms'
import type { PublicShellProps } from '@types'

// 게스트 콘텐츠 셸 — 게스트가 프로젝트·공지·일정을 로그인 사용자와 동일한 화면으로 본다.
// 로그인 전/후 UI 만 다른 PublicHeader + 밝은 본문 + SiteFooter(light) 구성이라, UserShell 과
// 같은 단일 스크롤 컨테이너 패턴을 쓴다(sticky 유리 헤더가 본문과 같은 스크롤 축에 있어야 블러 성립).
export function PublicContentShell({ navItems, applyItem }: PublicShellProps) {
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)

  // 페이지 이동 시 스크롤 위치를 최상단으로 되돌린다(window 대신 스크롤 컨테이너 기준).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  return (
    <div className="h-screen overflow-hidden bg-background-1">
      <div ref={scrollRef} className="h-full overflow-y-auto">
        <PublicHeader navItems={navItems} applyItem={applyItem} />
        {/* relative z-0 — UserShell 과 같은 이유(본문 z-index 가 헤더·드로어를 뚫지 않게). */}
        <main className="relative z-0">
          <Outlet />
        </main>
        <SiteFooter variant="light" />
      </div>
    </div>
  )
}
