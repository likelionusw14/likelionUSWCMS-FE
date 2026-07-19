import { AdminHeader, NotFoundPanel, PublicHeader, SiteFooter, UserHeader } from '@organisms'
import { ADMIN_NAV } from '@routes/admin/nav'
import { PUBLIC_APPLY, PUBLIC_NAV } from '@routes/common/nav'
import { USER_NAV } from '@routes/user/nav'
import { useAuth, useLogout } from '@hooks'

// 전역 404 — 접속 시점의 권한(role)에 맞는 헤더/푸터로 감싼다.
// 이전에는 무조건 AdminShell(관리자 헤더)로 고정돼 있어, 게스트/아기사자가 404 를 만나도
// 관리자 메뉴가 보이는 문제가 있었다. ADMIN_NAV 는 애초에 "대시보드 홈·404 의 상단 네비"로
// 설계돼 있었는데(nav.ts 주석), 실제로는 role 분기 없이 재사용되고 있지 않았다.
export function NotFoundPage() {
  const { role } = useAuth()
  const handleLogout = useLogout()

  if (role === 'STAFF') {
    return (
      <div className="flex min-h-screen flex-col bg-background-1">
        <AdminHeader title="" navItems={ADMIN_NAV} onLogout={handleLogout} />
        <main className="flex-1">
          <NotFoundPanel />
        </main>
        <SiteFooter variant="light" />
      </div>
    )
  }

  if (role === 'MEMBER') {
    return (
      <div className="h-screen overflow-hidden bg-background-1">
        <div className="h-full overflow-y-auto">
          <UserHeader navItems={USER_NAV} onLogout={handleLogout} />
          <main>
            <NotFoundPanel />
          </main>
          <SiteFooter variant="light" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background-2">
      <PublicHeader navItems={PUBLIC_NAV} applyItem={PUBLIC_APPLY} />
      <main className="flex flex-1 items-center justify-center px-64 py-[120px]">
        <NotFoundPanel />
      </main>
      <SiteFooter variant="dark" />
    </div>
  )
}
