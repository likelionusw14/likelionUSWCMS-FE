import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from '@atoms'
import effortBar from '@/assets/home/stats/effort.png'

// 주요 성과 지표 — 말풍선 바 3칸. 숫자는 뷰포트 진입 시 카운트업한다.
const STATS = [
  { label: '시작된 지', to: 14, suffix: '년' },
  { label: '멋대 출신 학생 수', to: 15000, suffix: '+' },
  { label: '누적 완성 서비스 수', to: 2300, suffix: '+' },
] as const

// 홈 소개 섹션 — 동아리 소개 문구 + 주요 성과(말풍선 바).
export function HomeStats() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="w-full bg-background-1 py-96 lg:py-[180px]">
      <div className="mx-auto w-full max-w-[1280px] px-24 sm:px-32 lg:px-64">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-48"
        >
          {/* 타이틀 */}
          <div className="flex flex-col items-center gap-24 text-center">
            <h2 className="text-center text-sm-22 text-black sm:text-h1">
              수원대학교 멋쟁이사자처럼
            </h2>
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

          {/* 주요성과 말풍선 — sm 미만은 Figma 모바일(196×330) 스펙대로 고정 폭 + 가운데 정렬 */}
          <div className="relative w-[196px] pb-[18px] sm:w-full sm:pb-0">
            {/* sm 이상 배경 — 바+꼬리가 담긴 Figma export(736×129). 구분선도 이미지에 있다 */}
            <img
              src={effortBar}
              alt=""
              width={736}
              height={129}
              className="hidden w-full sm:block"
            />
            {/* 통계 3칸 — sm 미만은 스스로 배경을 그리고, sm 이상은 이미지 바 영역(92/129)에 얹는다 */}
            <ul className="flex w-full flex-col items-stretch divide-y-2 divide-white/30 overflow-hidden rounded-16 bg-secondary-2 text-white shadow-emboss-light sm:absolute sm:inset-x-0 sm:top-0 sm:h-[71.3%] sm:flex-row sm:divide-y-0 sm:rounded-none sm:bg-transparent sm:shadow-none">
              {STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-8 py-24 text-center whitespace-nowrap sm:flex-1 sm:py-0"
                >
                  <span className="text-sm-16 sm:text-sm-22">{stat.label}</span>
                  <CountUp to={stat.to} suffix={stat.suffix} className="text-sm-22 sm:text-h1" />
                </li>
              ))}
            </ul>
            {/* sm 미만 꼬리 — Figma 20×18, 말풍선 왼쪽에서 32px (export 는 구분선 위치가 어긋나 CSS 로 그린다) */}
            <div className="absolute bottom-0 left-[32px] h-[18px] w-[20px] bg-secondary-2 [clip-path:polygon(0_0,100%_0,50%_100%)] sm:hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
