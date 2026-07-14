import kakaoLogo from '@/assets/icons/kakao.svg'
import { cn } from '@utils'
import type { KakaoLoginButtonProps } from '@types'

// 카카오 로그인 버튼. 색·모서리는 카카오 브랜드 규정 값이라 디자인 토큰이 아니다.
export function KakaoLoginButton({ className, ...props }: KakaoLoginButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-48 w-[400px] items-center justify-between overflow-hidden rounded-[12px] bg-kakao px-24',
        className,
      )}
      {...props}
    >
      <img src={kakaoLogo} alt="" className="h-24 w-24" />
      <span className="text-sm-20 text-kakao-text">Kakao로 시작하기</span>
      {/* 로고와 짝을 이루는 여백 — 가운데 글자를 버튼 정중앙에 둔다. */}
      <span className="h-24 w-24" />
    </button>
  )
}
