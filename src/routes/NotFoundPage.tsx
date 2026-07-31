import { NotFoundPanel, PublicHeader, SiteFooter } from '@organisms'
import { ADMIN_NAV } from '@routes/admin/nav'
import { PUBLIC_NAV } from '@routes/common/nav'
import { USER_NAV } from '@routes/user/nav'
import { useAuth } from '@hooks'
import type { NavItem } from '@types'

// 역할별 메뉴 구성만 다를 뿐 헤더 컴포넌트/레이아웃 자체(기존 404 UI)는 그대로 유지한다.
const NAV_BY_ROLE: Record<'STAFF' | 'MEMBER' | 'GUEST', NavItem[]> = {
  STAFF: ADMIN_NAV,
  MEMBER: USER_NAV,
  GUEST: PUBLIC_NAV,
}

// 전역 404 (Figma 594:1382) — 다크 배경에 공개 헤더(유리 알약 메뉴) + 다크 푸터.
// 상단 메뉴 구성만 접속 시점의 권한(role)에 맞는 목록으로 바꾼다. ADMIN_NAV 는 애초에
// "대시보드 홈·404 의 상단 네비"로 설계돼 있었는데(nav.ts 기존 주석), role 분기 없이 항상
// ADMIN_NAV 만 쓰고 있어 게스트/아기사자가 404 를 만나도 관리자 메뉴가 보이는 문제가 있었다.
export function NotFoundPage() {
  const { role } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={NAV_BY_ROLE[role]} tone="dark" />
      <main className="flex-1">
        <NotFoundPanel />
      </main>
      <SiteFooter variant="dark" />
    </div>
  )
}
