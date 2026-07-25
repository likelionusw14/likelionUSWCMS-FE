import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 모바일 메뉴(햄버거) 공용 상태 — 관리자(AdminMobileMenu)·사용자(UserHeader) 헤더가 공유한다.
// 라우트가 바뀌면 닫고, 열려 있는 동안 Escape 로 닫으며 body 스크롤을 잠근다.
// 인증 훅과 마찬가지로 데이터 조회 훅의 { data, isLoading } 계약 대상이 아니다(UI 상태 훅).
export function useMobileMenu() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

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
  }, [isOpen])

  return {
    isOpen,
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((open) => !open),
  }
}
