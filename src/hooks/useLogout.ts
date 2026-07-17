import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

// 로그아웃 액션 seam — 상태 초기화 + 로그인 페이지 이동을 한곳에 모은다.
// 여러 셸/헤더가 동일 흐름을 복제하지 않도록 이 훅으로 통일한다.
export function useLogout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return function handleLogout() {
    logout()
    navigate('/login')
  }
}
