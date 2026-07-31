import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { WindowPanel } from '@atoms'
import { cn } from '@utils'
import type { MenuCardProps } from '@types'

// 관리 메뉴 카드 — 기본은 제목·설명. 호버하면 본문 배경이 secondary-1(#D7E2FF)로 전환되고,
// 제목+설명이 아래로 미끄러지며 사라지고 그 자리에 'OO 관리하기 →' CTA 가 위에서 내려온다.
export function MenuCard({ title, description, to, className }: MenuCardProps) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  const ease = [0.16, 1, 0.3, 1] as const
  const duration = reduce ? 0 : 0.7

  return (
    <Link to={to} className={cn('block py-px', className)}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: reduce ? 0 : 0.4, ease }}
      >
        <WindowPanel
          bodyClassName={cn(
            'relative h-[235px] overflow-hidden transition-colors duration-700',
            // cn 은 tailwind-merge 가 아니라서 `!` 로 아톰 기본값(bg-white)을 덮는다.
            hovered && '!bg-secondary-1',
          )}
        >
          {/* 기본: 제목 + 설명 — 호버 시 아래로 미끄러지며, 설명은 먼저 투명해지며 접힌다. */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center gap-8 px-32"
            animate={{ y: hovered ? 24 : 0 }}
            transition={{ duration, ease }}
          >
            <motion.h2
              className="text-sm-22 text-black"
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration, ease }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="text-m-16-home text-black"
              animate={{ opacity: hovered ? 0 : 1, y: hovered ? -8 : 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* 호버: 'OO 관리하기 →' — 위에서 내려오며 나타난다. */}
          <motion.div
            className="absolute inset-0 flex items-center gap-8 px-32"
            initial={false}
            animate={{ y: hovered ? 0 : -24, opacity: hovered ? 1 : 0 }}
            transition={{ duration, ease }}
          >
            <span className="text-sm-22 text-black">{title}하기</span>
            <span aria-hidden className="text-sm-22 text-black">
              →
            </span>
          </motion.div>
        </WindowPanel>
      </motion.div>
    </Link>
  )
}
