import { motion, useReducedMotion } from 'framer-motion'

import { BRAND_NAME } from '@constants'
import { cn } from '@utils'

// 흐르는 브랜드 텍스트 띠(마퀴).
// Figma 원본은 "LIKELION USW" 를 8회 반복한 한 벌(5052px)이다.
// 이음매를 없애려고 같은 목록을 2벌 렌더하고 트랙을 -50% 만큼 이동시킨다.
// (아이템마다 pr-24 로 간격을 주므로 트랙의 정확히 절반이 한 벌과 일치한다)
const MARQUEE_REPEAT = 8
const MARQUEE_ITEMS = Array.from({ length: MARQUEE_REPEAT * 2 }, (_, index) => index)

// 한 바퀴(한 벌만큼 이동)에 걸리는 시간(초).
const MARQUEE_DURATION = 40

// 디자인은 88px ExtraBold 지만 타이포 토큰에 88px 이 없어 가장 큰 토큰(text-h0, 56px)으로 근사한다.
// 자간(h0 는 6%)·굵기(h0 는 Bold)는 디자인(자간 0, ExtraBold)에 맞춰 유틸로 되돌린다.
const MARQUEE_TEXT =
  'text-sm-22 sm:text-h1 lg:text-h0 font-extrabold leading-none tracking-normal whitespace-nowrap'

// 파트 섹션 위 다크 마퀴 (Figma 665:3295 — 1280x160, 배경 #04102D).
export function HomeMarquee() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative h-[80px] w-full overflow-hidden bg-background-2 sm:h-[120px] lg:h-[160px]">
      {/* 배경 오버레이: 솔리드 #04102D 위에 primary 20% 선형 그라디언트(37% → 89% 구간에서 투명해짐). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/20 from-[37%] to-primary/0 to-[89%]"
      />
      <span className="sr-only">{BRAND_NAME}</span>
      <div className="relative flex h-full items-center">
        <motion.div
          aria-hidden
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduceMotion
              ? undefined
              : { repeat: Infinity, ease: 'linear', duration: MARQUEE_DURATION }
          }
        >
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className={cn(MARQUEE_TEXT, 'shrink-0 pr-24 text-secondary-1')}>
              {BRAND_NAME}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// 밝은 배경 위 브랜드 마퀴 (Figma 588:4541 — 높이 60, 배경 투명 / 글자 #04102D).
export function HomeBrandMarquee() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative h-[60px] w-full overflow-hidden">
      <span className="sr-only">{BRAND_NAME}</span>
      <div className="flex h-full items-center">
        <motion.div
          aria-hidden
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={
            reduceMotion
              ? undefined
              : { repeat: Infinity, ease: 'linear', duration: MARQUEE_DURATION }
          }
        >
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className={cn(MARQUEE_TEXT, 'shrink-0 pr-24 text-background-2')}>
              {BRAND_NAME}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
