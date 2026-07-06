import { Routes, Route } from 'react-router-dom'
import {
  LoginPage,
  CommonHomePage,
  UserHomePage,
  DashboardPage,
  NotFoundPage,
  RequireRole,
} from '@routes'
import { AppShell } from '@templates'
import { ADMIN_NAV, USER_NAV } from '@constants'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* 공통 (게스트 포함 전체 접근) */}
      <Route path="/" element={<CommonHomePage />} />

      {/* 사용자 (아기사자 이상) */}
      <Route element={<RequireRole area="user" />}>
        <Route element={<AppShell areaLabel="사용자" navItems={USER_NAV} />}>
          <Route path="/app" element={<UserHomePage />} />
        </Route>
      </Route>

      {/* 관리자 (운영진) */}
      <Route element={<RequireRole area="admin" />}>
        <Route element={<AppShell areaLabel="관리자" navItems={ADMIN_NAV} />}>
          <Route path="/admin" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
