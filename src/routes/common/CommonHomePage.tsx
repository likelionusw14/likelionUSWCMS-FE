import { Link } from 'react-router-dom'
import { roleHome } from '@constants'
import { useAuth } from '@hooks'

// 공통(공개) 영역 랜딩. 게스트/비로그인 포함 누구나 접근.
export function CommonHomePage() {
  const { isAuthenticated, role } = useAuth()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-h1 text-gray-900">멋사 USW CMS</h1>
        <p className="mt-8 text-sm-18 text-gray-700">동아리 관리 시스템</p>
      </div>
      {isAuthenticated ? (
        <Link
          to={roleHome(role)}
          className="rounded bg-primary px-24 py-12 text-m-16 text-white transition-colors hover:bg-primary/90"
        >
          내 영역으로 이동
        </Link>
      ) : (
        <Link
          to="/login"
          className="rounded bg-primary px-24 py-12 text-m-16 text-white transition-colors hover:bg-primary/90"
        >
          로그인
        </Link>
      )}
    </div>
  )
}
