import { useRoutes } from 'react-router-dom'
import { AdminShell } from '@templates'
import { NotFoundPage } from '@routes'
import { ADMIN_NAV, ADMIN_PAGE_TITLES } from '@routes/admin/nav'
import { commonRoutes } from '@routes/common/routes'
import { userRoutes } from '@routes/user/routes'
import { adminRoutes } from '@routes/admin/routes'

// 조립 전용: 영역별 라우트 모듈을 합친다. 페이지 추가는 각 영역 폴더에서 한다.
export default function App() {
  return useRoutes([
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
