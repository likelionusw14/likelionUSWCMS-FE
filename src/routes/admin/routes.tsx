import type { RouteObject } from 'react-router-dom'
import { AppShell } from '@templates'
import { RequireRole } from '@routes/guards/RequireRole'
import { ADMIN_NAV } from './nav'
import { DashboardPage } from './DashboardPage'

// 관리자(운영진) 영역 — STAFF. 가드 + 셸 + 페이지를 캡슐화한다.
// 이 영역 담당자는 이 폴더(routes/admin/)만 편집한다. 페이지 추가는 children 에 1줄.
export const adminRoutes: RouteObject[] = [
  {
    element: <RequireRole area="admin" />,
    children: [
      {
        element: <AppShell areaLabel="관리자" navItems={ADMIN_NAV} />,
        children: [{ path: '/admin', element: <DashboardPage /> }],
      },
    ],
  },
]
