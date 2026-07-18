import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import type { CountUpProps } from '@types'

// 숫자 카운트업 — 뷰포트에 처음 들어올 때 0에서 목표값까지 1회 증가하고, 접미사를 뒤에 붙인다.
// 값은 천단위 콤마(en-US)로 표기한다 (예: 15000 → "15,000").
export function CountUp({ to, suffix = '', duration = 1.6, className }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    // reduced-motion: 카운트업 없이 최종값을 즉시 표시.
    if (reduceMotion) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, to, duration])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
