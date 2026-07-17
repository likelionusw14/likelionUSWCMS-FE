import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AdminShell } from '@templates'
import { NotFoundPage } from '@routes'
import { ADMIN_NAV, ADMIN_PAGE_TITLES } from '@routes/admin/nav'
import { commonRoutes } from '@routes/common/routes'
import { userRoutes } from '@routes/user/routes'
import { adminRoutes } from '@routes/admin/routes'
import { SandboxPage } from '@routes/SandboxPage'

// 개발 전용 미리보기 라우트(/sandbox) — 프로덕션 빌드에선 등록되지 않고 번들에서도 빠진다.
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [{ path: '/sandbox', element: <SandboxPage /> }]
  : []

// 조립 전용: 영역별 라우트 모듈을 합친다. 페이지 추가는 각 영역 폴더에서 한다.
export default function App() {
  return useRoutes([
    ...devRoutes,
    ...commonRoutes,
    ...userRoutes,
    ...adminRoutes,
    // 404 는 디자인상 관리자 헤더/푸터가 붙은 화면이라 같은 셸을 쓴다.
    {
      element: <AdminShell navItems={ADMIN_NAV} pageTitles={ADMIN_PAGE_TITLES} />,
      children: [{ path: '*', element: <NotFoundPage /> }],
    },
  ])
}
