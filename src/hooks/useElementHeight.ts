import { useLayoutEffect, useState, type RefObject } from 'react'

// 요소의 실제 높이(px)를 관찰한다. 브레이크포인트나 글꼴 로드로 높이가 바뀌면 다시 측정한다.
// 헤더 높이처럼 CSS 로 표현할 수 없는 값(모바일 드로어가 브라우저 최상단에서부터 내려오도록
// 헤더 높이만큼 자리를 비워야 한다)을 애니메이션에 넘길 때 쓴다.
export function useElementHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => setHeight(el.getBoundingClientRect().height)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return height
}
