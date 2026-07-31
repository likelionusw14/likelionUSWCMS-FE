import { useEffect, useState } from 'react'

// CSS 미디어쿼리를 React 상태로 읽는다.
// 브레이크포인트에 따라 로직(애니메이션 방향 등)이 달라질 때만 쓰고,
// 단순 노출/숨김은 Tailwind 반응형 유틸(hidden lg:flex)로 처리한다.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    setMatches(list.matches)

    function sync(event: MediaQueryListEvent) {
      setMatches(event.matches)
    }

    list.addEventListener('change', sync)
    return () => list.removeEventListener('change', sync)
  }, [query])

  return matches
}
