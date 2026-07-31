import { kakaoLoginUrl } from '@api'
import { isBackendConnected } from '@config'

// 카카오 로그인 시작 seam.
// 백엔드가 state·nonce 를 만들고 카카오로 302 시키므로, XHR 이 아니라 브라우저를 통째로 넘긴다.
// 이후 흐름은 백엔드 콜백(/auth/kakao/callback)이 쿠키를 심고 프론트 콜백 화면으로 돌려보낸다.
export function useKakaoLogin() {
  function startKakaoLogin() {
    window.location.assign(kakaoLoginUrl())
  }

  return { startKakaoLogin, isAvailable: isBackendConnected }
}
