import { motion, useReducedMotion } from 'framer-motion'
import messageIcon from '@/assets/home/intro/message-icon.svg'

// 홈 "멋쟁이 사자처럼은?" 소개 섹션 — 좌: 드래그 선택 효과가 걸린 제목 / 우: iMessage 말풍선 카드.
export function HomeIntro() {
  const reduceMotion = useReducedMotion()

  // 스크롤 진입 시 등장. 동작 최소화 설정이면 모션을 끈다.
  const appear = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5 },
  }

  return (
    <section className="relative w-full overflow-hidden bg-background-1 py-[180px]">
      {/* 그라디언트 효과 — 우측 상단 방사형 글로우(장식). Figma 의 640x640 radial 을 blur 원으로 근사. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[26px] ml-[439px] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.15] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-64">
        <div className="flex items-center justify-center gap-96">
          {/* 좌: 제목 (px-24 는 강조 박스가 텍스트 밖으로 넘치는 만큼 확보한 여백) */}
          <motion.div {...appear} className="shrink-0 px-24">
            <h2 className="whitespace-nowrap text-h0 text-black">
              <span className="block">멋쟁이</span>
              <span className="relative inline-block">
                {/* 드래그 선택 효과 — 반투명 강조 박스 + 양 끝에 주황 점이 달린 세로 핸들 */}
                <span aria-hidden className="pointer-events-none absolute -inset-x-24 -inset-y-4">
                  <span className="absolute inset-0 bg-secondary-2/[0.15]" />
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-secondary-2">
                    <span className="absolute -top-[17px] left-1/2 h-[17px] w-[17px] -translate-x-1/2 rounded-full bg-secondary-2" />
                  </span>
                  <span className="absolute right-0 top-0 h-full w-[2px] bg-secondary-2">
                    <span className="absolute -bottom-[17px] left-1/2 h-[17px] w-[17px] -translate-x-1/2 rounded-full bg-secondary-2" />
                  </span>
                </span>
                <span className="relative">사자처럼은?</span>
              </span>
            </h2>
          </motion.div>

          {/* 우: iMessage 말풍선 카드 (뒤에 반투명 카드가 한 장 겹쳐 있다) */}
          <motion.div
            {...appear}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-[542px] shrink-0"
          >
            <div
              aria-hidden
              className="absolute inset-x-16 -top-[18px] bottom-0 rounded-t-16 bg-white/60"
            />
            <div className="relative rounded-t-16 bg-white">
              <div className="flex items-center justify-between px-24 py-16">
                <div className="flex items-center gap-8">
                  <img src={messageIcon} alt="" className="h-24 w-24" />
                  <span className="text-m-18 text-black">iMessage</span>
                </div>
                <span className="text-m-14 text-black">now</span>
              </div>
              {/* 본문 — 좌우 여백 56px 은 spacing 토큰에 없는 값이라 임의값으로 둔다 (Figma 실측). */}
              <div className="flex break-keep flex-col gap-24 px-[56px] pb-48 pt-40 text-m-18-body text-black">
                <p>
                  멋쟁이사자처럼은 2013년 서울대학교에서 시작하여,
                  <br />
                  현재 전국 80여개 대학, 4,000명 이상의 대학생이 참여하는
                  <br />
                  <span className="font-semibold text-secondary-2">
                    국내 최대 규모의 IT 창업 동아리
                  </span>
                  입니다.
                </p>
                <p>
                  기술을 통한 아이디어 실현을 목표로, 비전공자도 함께하는
                  <br />
                  열린 커뮤니티를 운영하고 있습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
