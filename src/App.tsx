import { Routes, Route } from 'react-router-dom'
import { RootLayout, LoginPage, DashboardPage, NotFoundPage } from '@routes'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RootLayout />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
