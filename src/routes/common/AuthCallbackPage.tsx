import { Link } from 'react-router-dom'
import { WindowPanel } from '@atoms'
import { useAuthCallback } from '@hooks'

// 카카오 인증 착지 지점. 백엔드가 /auth/kakao/callback 에서 쿠키를 심은 뒤 이 경로로 되돌려보낸다.
// 세션 교환이 끝나면 곧바로 다음 화면으로 이동하므로, 사용자에게는 잠깐의 안내만 보인다.
export function AuthCallbackPage() {
  const { error } = useAuthCallback()

  return (
    <WindowPanel
      className="w-full max-w-[993px]"
      bodyClassName="flex h-[574px] flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-24 text-center text-black">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-h1">LOGIN</h1>
          <p className="text-sm-18">{error ? '로그인 실패' : '로그인 중'}</p>
        </div>
        {error ? (
          <>
            <p className="text-m-16 text-error">{error}</p>
            <Link
              to="/login"
              className="rounded-8 text-m-16 text-primary underline outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              로그인 화면으로 돌아가기
            </Link>
          </>
        ) : (
          <p className="text-m-16 text-gray-500">카카오 계정을 확인하고 있습니다.</p>
        )}
      </div>
    </WindowPanel>
  )
}
