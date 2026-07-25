import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from './useMediaQuery'

// Tailwind lg — 사이드바가 흐름 안 고정 컬럼으로 서는 경계.
const DESKTOP_QUERY = '(min-width: 1024px)'

// 관리자 접이식 사이드바 상태 — Figma 는 사이드바 안 X 로 닫고 상단바 햄버거로 다시 여는 구조다.
// lg 이상은 기본 열림(고정 컬럼), lg 미만은 기본 닫힘(오버레이)이고 상태는 하나로 공유한다.
// 오버레이일 때만 라우트 이동 시 닫고 Escape 를 건다 — 데스크톱 고정 사이드바는 그대로 둔다.
// (관리자 셸은 h-screen overflow-hidden 이라 body 스크롤 잠금은 필요 없다 — 공용 헤더의 useMobileMenu 와 다른 점.)
export function useAdminSidebar() {
  const { pathname } = useLocation()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [isOpen, setIsOpen] = useState(isDesktop)

  // 브레이크포인트를 넘나들면 그 폭의 기본값(데스크톱=열림 / 그 미만=닫힘)으로 되돌린다.
  useEffect(() => {
    setIsOpen(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) setIsOpen(false)
  }, [pathname, isDesktop])

  useEffect(() => {
    if (isDesktop || !isOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isDesktop, isOpen])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}
