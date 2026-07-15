import { motion, useReducedMotion } from 'framer-motion'

// 주요 성과 지표 — 말풍선 바 3칸
const STATS = [
  { label: '시작된 지', value: '14년' },
  { label: '멋대 출신 학생 수', value: '15,000+' },
  { label: '누적 완성 서비스 수', value: '2,300+' },
] as const

// 홈 소개 섹션 — 동아리 소개 문구 + 주요 성과(말풍선 바).
export function HomeStats() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="w-full bg-background-1 py-[180px]">
      <div className="mx-auto w-full max-w-[1280px] px-64">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-48"
        >
          {/* 타이틀 */}
          <div className="flex flex-col items-center gap-24 text-center">
            <h2 className="text-h1 text-black">수원대학교 멋쟁이사자처럼</h2>
            {/* 디자인 줄간격 27px → 본문 토큰(text-m-18-body, 26px)으로 근사 */}
            <p className="text-m-18-body text-black">
              상상만 하던 아이디어를 실제 서비스로 구현하는 곳
              <br />
              수원대학교 멋쟁이사자처럼입니다.
            </p>
            <p className="text-m-18-body text-black">
              우리는 책 속의 코드가 아닌, 우리 학교 학우들의 스마트폰 안에서 실제로 움직이는
              서비스를 만듭니다.
              <br />
              전국 80여 개 대학과 연계된 탄탄한 기술력을 바탕으로, 우리 캠퍼스에 필요한 IT 솔루션을
              고민하고 실천합니다.
              <br />
              상상을 현실로 바꾸는 힘,{' '}
              {/* 본문 줄간격을 유지해야 해서 크기 토큰 대신 굵기만 올린다 */}
              <span className="font-semibold text-secondary-2">수원대학교 멋쟁이사자처럼</span>
              입니다.
            </p>
          </div>

          {/* 주요성과 말풍선 — 바(140px) + 아래 삼각 꼬리(58px) */}
          <div className="relative h-[198px] w-full">
            <ul className="flex h-[140px] w-full items-stretch divide-x-2 divide-white/30 overflow-hidden rounded-16 bg-secondary-2 shadow-emboss-light">
              {STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-1 flex-col items-center justify-center gap-8 text-center whitespace-nowrap text-white"
                >
                  <span className="text-sm-22">{stat.label}</span>
                  <span className="text-h1">{stat.value}</span>
                </li>
              ))}
            </ul>
            {/* 꼬리 — Figma 벡터(588:4513) 대신 clip-path 삼각형. 첫 구분선 오른쪽(가로 38.4% 지점)에 맞춘다 */}
            <div className="absolute top-[140px] left-[38.4%] h-[58px] w-[61px] -translate-x-1/2 bg-secondary-2 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
