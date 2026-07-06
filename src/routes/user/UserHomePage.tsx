import { useAuth } from '@hooks'

// 사용자(아기사자) 영역 홈.
export function UserHomePage() {
  const { user } = useAuth()

  return (
    <div>
      <header className="mb-24">
        <h1 className="text-h1 text-gray-900">사용자 홈</h1>
        <p className="mt-8 text-h2 text-gray-700">
          {user ? `${user.name}님 환영합니다.` : '환영합니다.'}
        </p>
      </header>
      <p className="text-m-16 text-gray-700">아기사자 전용 기능은 백엔드 연동 후 추가됩니다.</p>
    </div>
  )
}
