import type { RouteObject } from 'react-router-dom'
import { UserShell } from '@templates'
import { RequireRole } from '@routes/guards/RequireRole'
import { USER_NAV } from './nav'
import { UserHomePage } from './UserHomePage'
import { UserProjectListPage } from './UserProjectListPage'
import { UserProjectDetailPage } from './UserProjectDetailPage'
import { UserSessionListPage } from './UserSessionListPage'
import { UserSessionDetailPage } from './UserSessionDetailPage'
import { UserNoticeListPage } from './UserNoticeListPage'
import { UserNoticeDetailPage } from './UserNoticeDetailPage'
import { UserSchedulePage } from './UserSchedulePage'
import { UserAttendancePage } from './UserAttendancePage'
import { UserLionListPage } from './UserLionListPage'
import { UserCertificatePage } from './UserCertificatePage'

// 사용자(아기사자) 영역 — MEMBER 이상. 가드 + 셸 + 페이지를 캡슐화한다.
// 이 영역 담당자는 이 폴더(routes/user/)만 편집한다. 페이지 추가는 children 에 1줄.
export const userRoutes: RouteObject[] = [
  {
    element: <RequireRole area="user" />,
    children: [
      {
        element: <UserShell navItems={USER_NAV} />,
        children: [
          { path: '/app', element: <UserHomePage /> },
          { path: '/app/projects', element: <UserProjectListPage /> },
          { path: '/app/projects/:projectId', element: <UserProjectDetailPage /> },
          { path: '/app/sessions', element: <UserSessionListPage /> },
          { path: '/app/sessions/:resourceId', element: <UserSessionDetailPage /> },
          { path: '/app/notices', element: <UserNoticeListPage /> },
          { path: '/app/notices/:noticeId', element: <UserNoticeDetailPage /> },
          { path: '/app/schedule', element: <UserSchedulePage /> },
          { path: '/app/attendance', element: <UserAttendancePage /> },
          { path: '/app/members', element: <UserLionListPage /> },
          { path: '/app/certificates', element: <UserCertificatePage /> },
        ],
      },
    ],
  },
]
