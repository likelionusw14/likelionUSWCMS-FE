import type { RouteObject } from 'react-router-dom'
import { PublicContentShell, PublicShell } from '@templates'
// 게스트 콘텐츠는 로그인 사용자(/app/*)와 "똑같이" 보여야 하므로 멤버 영역의 페이지를 그대로 재사용한다.
// 상세 링크 베이스는 각 목록 페이지가 현재 라우트(useLocation)에서 따므로 게스트 경로로 자연스럽게 이어진다.
import { UserLionListPage } from '@routes/user/UserLionListPage'
import { UserNoticeDetailPage } from '@routes/user/UserNoticeDetailPage'
import { UserNoticeListPage } from '@routes/user/UserNoticeListPage'
import { UserProjectDetailPage } from '@routes/user/UserProjectDetailPage'
import { UserProjectListPage } from '@routes/user/UserProjectListPage'
import { UserSchedulePage } from '@routes/user/UserSchedulePage'
import { PUBLIC_NAV } from './nav'
import { CommonHomePage } from './CommonHomePage'
import { DemoLoginPage } from './DemoLoginPage'
import { LoginPage } from './LoginPage'
import { SignupPendingPage } from './SignupPendingPage'
import { SignupProfilePage } from './SignupProfilePage'

// 공통(공개) 영역 — 게스트 포함 전체 접근. 가드 없음.
// 이 영역 담당자는 이 폴더(routes/common/)만 편집한다.
export const commonRoutes: RouteObject[] = [
  { path: '/', element: <CommonHomePage /> },
  // 개발용 역할 선택 로그인 — 디자인 셸 밖의 임시 화면.
  { path: '/login/demo', element: <DemoLoginPage /> },
  {
    element: <PublicShell navItems={PUBLIC_NAV} />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup/profile', element: <SignupProfilePage /> },
      { path: '/signup/pending', element: <SignupPendingPage /> },
    ],
  },
  // 게스트 콘텐츠(프로젝트·공지·일정) — 멤버 페이지를 밝은 게스트 셸에서 재사용. 헤더 메뉴 경로와 일치한다.
  {
    element: <PublicContentShell navItems={PUBLIC_NAV} />,
    children: [
      { path: '/projects', element: <UserProjectListPage /> },
      { path: '/projects/:projectId', element: <UserProjectDetailPage /> },
      { path: '/notices', element: <UserNoticeListPage /> },
      { path: '/notices/:noticeId', element: <UserNoticeDetailPage /> },
      { path: '/schedule', element: <UserSchedulePage /> },
      { path: '/members', element: <UserLionListPage /> },
    ],
  },
]
