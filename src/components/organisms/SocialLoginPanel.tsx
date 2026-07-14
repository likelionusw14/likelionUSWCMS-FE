import { KakaoLoginButton, WindowPanel } from '@atoms'
import type { SocialLoginPanelProps } from '@types'

// 소셜 로그인 패널 — 카카오 로그인 진입.
// 카카오 OAuth 연동 전이라 버튼은 가입 플로우(추가정보 입력)로 바로 넘어간다.
export function SocialLoginPanel({ onKakaoLogin }: SocialLoginPanelProps) {
  return (
    <WindowPanel
      className="w-[993px]"
      bodyClassName="flex h-[574px] flex-col items-center justify-center"
    >
      <div className="flex w-[666px] flex-col items-center gap-24 text-center text-black">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-h1">LOGIN</h1>
          <p className="text-sm-18">로그인</p>
        </div>
        <p className="text-m-16">소셜 계정으로 간편하게 시작해보세요.</p>
        <div className="flex w-full flex-col items-center gap-24">
          <KakaoLoginButton onClick={onKakaoLogin} />
          <p className="text-m-14 text-gray-500">로그인에 문제가 있으신가요?</p>
        </div>
      </div>
    </WindowPanel>
  )
}
