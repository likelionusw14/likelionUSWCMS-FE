import { useState } from 'react'
import { useOutlet } from 'react-router-dom'

// AnimatePresence 크로스페이드 동안 나가는(exit) 인스턴스가 '이전 라우트' 내용을 유지하도록
// outlet 을 최초 마운트 시점 값으로 고정한다. (useOutlet 은 매 렌더 새 라우트를 준다.)
export function AnimatedOutlet() {
  const outlet = useOutlet()
  const [snapshot] = useState(outlet)
  return <>{snapshot}</>
}
