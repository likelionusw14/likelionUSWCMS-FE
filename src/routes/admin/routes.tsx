import type { RouteObject } from 'react-router-dom'
import { AdminShell, AdminSidebarShell } from '@templates'
import { RequireRole } from '@routes/guards/RequireRole'
import { ADMIN_NAV, ADMIN_PAGE_TITLES, ADMIN_SIDEBAR_HOME, ADMIN_SIDEBAR_NAV } from './nav'
import { DashboardPage } from './DashboardPage'
import { ProjectListPage } from './ProjectListPage'
import { ProjectDetailPage } from './ProjectDetailPage'
import { ProjectFormPage } from './ProjectFormPage'

// 관리자(운영진) 영역 — STAFF. 가드 + 셸 + 페이지를 캡슐화한다.
// 이 영역 담당자는 이 폴더(routes/admin/)만 편집한다.
// 대시보드 홈은 상단 네비 셸, 관리 페이지들은 사이드바 셸이다 (디자인이 서로 다르다).
export const adminRoutes: RouteObject[] = [
  {
    element: <RequireRole area="admin" />,
    children: [
      {
        element: <AdminShell navItems={ADMIN_NAV} pageTitles={ADMIN_PAGE_TITLES} />,
        children: [{ path: '/admin', element: <DashboardPage /> }],
      },
      {
        element: <AdminSidebarShell homeItem={ADMIN_SIDEBAR_HOME} navItems={ADMIN_SIDEBAR_NAV} />,
        children: [
          { path: '/admin/projects', element: <ProjectListPage /> },
          { path: '/admin/projects/new', element: <ProjectFormPage /> },
          { path: '/admin/projects/:projectId', element: <ProjectDetailPage /> },
          { path: '/admin/projects/:projectId/edit', element: <ProjectFormPage /> },
        ],
      },
    ],
  },
]
