// 브라우저 쿠키 읽기. 인증 쿠키(refresh_session/onboarding_session)는 HttpOnly 라 JS 로 못 읽고,
// 여기서 읽는 건 CSRF 이중 제출(double submit)용으로 서버가 내려주는 "읽을 수 있는" 토큰뿐이다.
export function readCookie(name: string): string | null {
  const prefix = `${name}=`
  for (const chunk of document.cookie.split('; ')) {
    if (chunk.startsWith(prefix)) return decodeURIComponent(chunk.slice(prefix.length))
  }
  return null
}
