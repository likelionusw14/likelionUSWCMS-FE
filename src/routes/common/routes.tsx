import type { RouteObject } from 'react-router-dom'
import { PublicShell } from '@templates'
import { PUBLIC_APPLY, PUBLIC_NAV } from './nav'
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
    element: <PublicShell navItems={PUBLIC_NAV} applyItem={PUBLIC_APPLY} />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup/profile', element: <SignupProfilePage /> },
      { path: '/signup/pending', element: <SignupPendingPage /> },
    ],
  },
]
