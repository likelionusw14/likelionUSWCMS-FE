import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// 모바일 메뉴(햄버거) 공용 상태 — 사용자(UserHeader)·게스트(PublicHeader) 헤더가 공유한다.
// 라우트가 바뀌면 닫고, 열려 있는 동안 Escape 로 닫으며 body 스크롤을 잠근다.
// 잠글 때 사라지는 스크롤바 폭만큼 padding-right 로 메워준다 — 안 그러면 본문이 그 폭만큼
// 넓어지면서 페이지 전체가 옆으로 움찔한다(스크롤바를 겹쳐 그리는 환경에서는 0 이라 무해).
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
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return {
    isOpen,
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((open) => !open),
  }
}
