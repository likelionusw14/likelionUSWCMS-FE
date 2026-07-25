import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Tailwind lg — 사이드바가 흐름 안 고정 컬럼으로 서는 경계.
const DESKTOP_QUERY = '(min-width: 1024px)'

function matchDesktop() {
  return typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_QUERY).matches
}

// 관리자 접이식 사이드바 상태 — Figma 는 사이드바 안 X 로 닫고 상단바 햄버거로 다시 여는 구조다.
// lg 이상은 기본 열림(고정 컬럼), lg 미만은 기본 닫힘(왼쪽 오버레이 드로어)이고 상태는 하나로 공유한다.
// 드로어일 때만 라우트 이동 시 닫고 Escape·body 스크롤 잠금을 건다 — 데스크톱 고정 사이드바는 그대로 둔다.
export function useAdminSidebar() {
  const { pathname } = useLocation()
  const [isDesktop, setIsDesktop] = useState(matchDesktop)
  const [isOpen, setIsOpen] = useState(matchDesktop)

  // 브레이크포인트를 넘나들면 그 폭의 기본값(데스크톱=열림 / 모바일=닫힘)으로 되돌린다.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)

    function sync(event: MediaQueryListEvent) {
      setIsDesktop(event.matches)
      setIsOpen(event.matches)
    }

    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!isDesktop) setIsOpen(false)
  }, [pathname, isDesktop])

  useEffect(() => {
    if (isDesktop || !isOpen) return

    const previousOverflow = document.body.style.overflow

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isDesktop, isOpen])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}
