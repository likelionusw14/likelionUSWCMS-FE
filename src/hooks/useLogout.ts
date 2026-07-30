import { useNavigate } from 'react-router-dom'
import { deleteAuthSession } from '@api'
import { isBackendConnected } from '@config'
import { useAuth } from './useAuth'

// 로그아웃 액션 seam — 서버 세션 폐기 + 상태 초기화 + 로그인 페이지 이동을 한곳에 모은다.
// 여러 셸/헤더가 동일 흐름을 복제하지 않도록 이 훅으로 통일한다.
export function useLogout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return async function handleLogout() {
    // 서버의 Refresh Token 폐기. 실패해도(이미 만료 등) 로컬 상태는 반드시 비운다 —
    // 여기서 멈추면 화면상 로그인 상태로 남아 사용자가 빠져나갈 수 없다.
    if (isBackendConnected) {
      try {
        await deleteAuthSession()
      } catch {
        // 서버 폐기 실패는 로그아웃을 막지 않는다.
      }
    }
    logout()
    navigate('/login')
  }
}
