import { useRoutes } from 'react-router-dom'
import { LoginPage, NotFoundPage } from '@routes'
import { commonRoutes } from '@routes/common/routes'
import { userRoutes } from '@routes/user/routes'
import { adminRoutes } from '@routes/admin/routes'

// 조립 전용: 영역별 라우트 모듈을 합친다. 페이지 추가는 각 영역 폴더에서 하며 이 파일은 바뀌지 않는다.
export default function App() {
  return useRoutes([
    { path: '/login', element: <LoginPage /> },
    ...commonRoutes,
    ...userRoutes,
    ...adminRoutes,
    { path: '*', element: <NotFoundPage /> },
  ])
}
