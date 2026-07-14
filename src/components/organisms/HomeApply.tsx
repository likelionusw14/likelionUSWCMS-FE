import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { WindowPanel } from '@atoms'
import { COHORT } from '@constants'

// 홈 하단 지원 CTA 섹션 — 다크 배경 위에 창(window) 패널을 얹고 지원 페이지로 유도한다.
export function HomeApply() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="w-full bg-background-2 py-[180px]">
      <div className="mx-auto w-full max-w-[1280px] px-64">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          {/* 본문 배경 #EEF3FF — 아톰 기본값(bg-white)을 덮으려면 important 필요 (cn 은 단순 join) */}
          <WindowPanel bodyClassName="!bg-background-1">
            {/* 아톰 본문 패딩(32px) + 58px = 디자인 상하 여백 90px */}
            <div className="flex w-full flex-col items-center gap-48 py-[58px]">
              <div className="flex w-full flex-col items-center gap-16 text-center">
                {/* text-h1(40px Bold) + 디자인 값(줄간격 53px·자간 2px)은 토큰에 없어 임의값으로 보정 */}
                <h2 className="w-full text-h1 leading-[53px] tracking-[2px] text-black">
                  멋쟁이 사자처럼 수원대학교에서
                  <br />
                  <span className="text-primary">{COHORT}기 아기사자를 모집중</span>이에요!
                </h2>
                <p className="w-full text-m-18 text-black">함꼐 해보자는 둥 안내멘트</p>
              </div>
              {/* 디자인 24px Semibold → 토큰에 없어 가장 가까운 text-sm-22 사용 */}
              <Link
                to="/apply"
                className="flex items-center justify-center overflow-hidden rounded-full bg-secondary-2 px-32 py-16 text-center text-sm-22 whitespace-nowrap text-white transition-opacity hover:opacity-90"
              >
                {COHORT}기 지원하기
              </Link>
            </div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  )
}
