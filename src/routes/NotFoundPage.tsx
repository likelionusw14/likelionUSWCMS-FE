import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-surface-subtle">
      <p className="text-3xl font-bold text-content">404</p>
      <p className="text-sm text-content-muted">페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-sm font-medium text-brand hover:underline">
        대시보드로 돌아가기
      </Link>
    </div>
  )
}
