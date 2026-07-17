import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { MenuCardProps } from '@types'

// 관리 메뉴 카드 — 기본은 제목·설명, 호버하면 본문이 secondary-1 로 바뀌며 이동 안내로 교체된다.
// 호버 전환은 framer-motion 으로 자연스럽게: 카드가 살짝 떠오르고(lift) 본문 콘텐츠가 크로스페이드된다.
export function MenuCard({ title, description, to, className }: MenuCardProps) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] as const },
  }

  return (
    <Link to={to} className={cn('block py-px', className)}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: reduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <WindowPanel
          bodyClassName={cn(
            'flex h-[235px] flex-col justify-center gap-8 transition-colors duration-200',
            hovered && 'bg-secondary-1',
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {hovered ? (
              <motion.div key="cta" {...fade} className="flex items-center gap-40">
                <span className="text-sm-22 text-black">{title}하기</span>
                <span aria-hidden className="text-sm-22 text-black">
                  →
                </span>
              </motion.div>
            ) : (
              <motion.div key="info" {...fade} className="flex flex-col gap-8">
                <h2 className="text-sm-22 text-black">{title}</h2>
                <p className="text-m-16-home text-black">{description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </WindowPanel>
      </motion.div>
    </Link>
  )
}
