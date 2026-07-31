import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { NotFoundPage } from '@routes'
import { commonRoutes } from '@routes/common/routes'
import { userRoutes } from '@routes/user/routes'
import { adminRoutes } from '@routes/admin/routes'
// 개발 전용 로컬 미리보기 라우트 — git 미추적 파일(src/routes/devRoutes.local.tsx)이 있을 때만 로드한다.
// 컴포넌트 확인용 sandbox 등 "로컬 전용" 라우트는 그 파일에만 두어 절대 커밋/배포되지 않는다.
const localDevRoutes = import.meta.glob('./routes/devRoutes.local.tsx', { eager: true }) as Record<
  string,
  { default: RouteObject[] }
>
const devRoutes: RouteObject[] = import.meta.env.DEV
  ? (Object.values(localDevRoutes)[0]?.default ?? [])
  : []

// 조립 전용: 영역별 라우트 모듈을 합친다. 페이지 추가는 각 영역 폴더에서 한다.
export default function App() {
  return useRoutes([
    ...devRoutes,
    ...commonRoutes,
    ...userRoutes,
    ...adminRoutes,
    // 404 — NotFoundPage 가 현재 role 에 맞는 헤더/푸터를 스스로 고른다(가드 불필요, 항상 렌더).
    { path: '*', element: <NotFoundPage /> },
  ])
}
