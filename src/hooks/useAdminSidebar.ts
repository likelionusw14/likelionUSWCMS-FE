import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from './useMediaQuery'

// Tailwind lg — 사이드바가 흐름 안 고정 컬럼으로 서는 경계.
const DESKTOP_QUERY = '(min-width: 1024px)'

// 관리자 사이드바 오버레이 상태 — lg 미만에서만 의미가 있다.
// lg 이상은 224px 컬럼이 항상 떠 있어 열고 닫을 것이 없다(Figma 페이지 시안에 닫기·햄버거가 없다).
// 라우트가 바뀌거나 lg 를 넘나들면 닫고, 열려 있는 동안 Escape 로 닫는다.
// (관리자 셸은 h-screen overflow-hidden 이라 body 스크롤 잠금은 필요 없다 — 공용 헤더의 useMobileMenu 와 다른 점.)
export function useAdminSidebar() {
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, isDesktop])

  useEffect(() => {
    if (!isOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}
