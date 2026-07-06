import type { RouteObject } from 'react-router-dom'
import { CommonHomePage } from './CommonHomePage'

// 공통(공개) 영역 — 게스트 포함 전체 접근. 가드/셸 없음.
// 이 영역 담당자는 이 폴더(routes/common/)만 편집한다.
export const commonRoutes: RouteObject[] = [{ path: '/', element: <CommonHomePage /> }]
