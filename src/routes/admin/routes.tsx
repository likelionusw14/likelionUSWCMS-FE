import type { RouteObject } from 'react-router-dom'
import { AdminShell, AdminSidebarShell } from '@templates'
import { RequireRole } from '@routes/guards/RequireRole'
import { ADMIN_PAGE_TITLES, ADMIN_SIDEBAR_HOME, ADMIN_SIDEBAR_NAV } from './nav'
import { DashboardPage } from './DashboardPage'
import { ProjectListPage } from './ProjectListPage'
import { ProjectDetailPage } from './ProjectDetailPage'
import { ProjectFormPage } from './ProjectFormPage'
import { SessionListPage } from './SessionListPage'
import { SessionDetailPage } from './SessionDetailPage'
import { SessionFormPage } from './SessionFormPage'
import { AttendancePage } from './AttendancePage'
import { SchedulePage } from './SchedulePage'
import { NoticeListPage } from './NoticeListPage'
import { NoticeDetailPage } from './NoticeDetailPage'
import { NoticeFormPage } from './NoticeFormPage'
import { MemberPage } from './MemberPage'

// 관리자(운영진) 영역 — STAFF. 가드 + 셸 + 페이지를 캡슐화한다.
// 이 영역 담당자는 이 폴더(routes/admin/)만 편집한다.
// 대시보드 홈은 상단 네비 셸, 관리 페이지들은 사이드바 셸이다 (디자인이 서로 다르다).
export const adminRoutes: RouteObject[] = [
  {
    element: <RequireRole area="admin" />,
    children: [
      {
        element: <AdminShell pageTitles={ADMIN_PAGE_TITLES} />,
        children: [{ path: '/admin', element: <DashboardPage /> }],
      },
      {
        element: <AdminSidebarShell homeItem={ADMIN_SIDEBAR_HOME} navItems={ADMIN_SIDEBAR_NAV} />,
        children: [
          { path: '/admin/projects', element: <ProjectListPage /> },
          { path: '/admin/projects/new', element: <ProjectFormPage /> },
          { path: '/admin/projects/:projectId', element: <ProjectDetailPage /> },
          { path: '/admin/projects/:projectId/edit', element: <ProjectFormPage /> },
          { path: '/admin/sessions', element: <SessionListPage /> },
          { path: '/admin/sessions/new', element: <SessionFormPage /> },
          { path: '/admin/sessions/:sessionId', element: <SessionDetailPage /> },
          { path: '/admin/sessions/:sessionId/edit', element: <SessionFormPage /> },
          { path: '/admin/attendance', element: <AttendancePage /> },
          { path: '/admin/schedule', element: <SchedulePage /> },
          { path: '/admin/notices', element: <NoticeListPage /> },
          { path: '/admin/notices/new', element: <NoticeFormPage /> },
          { path: '/admin/notices/:noticeId', element: <NoticeDetailPage /> },
          { path: '/admin/notices/:noticeId/edit', element: <NoticeFormPage /> },
          { path: '/admin/members', element: <MemberPage /> },
        ],
      },
    ],
  },
]
