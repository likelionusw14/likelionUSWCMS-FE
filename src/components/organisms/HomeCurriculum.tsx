import { motion, useReducedMotion } from 'framer-motion'
import { SpeechBubble } from '@atoms'
import { cn } from '@utils'
import timelineLine from '@/assets/home/curriculum/timeline.svg'

// 커리큘럼 6단계. side 는 타임라인 기준 말풍선이 놓이는 방향이다.
const CURRICULUM_STEPS = [
  {
    id: 'orientation',
    side: 'left',
    title: 'OT & 오리엔테이션',
    description: '새로운 아기사자들이 합류하고, 1년간의 여정을 안내합니다.',
  },
  {
    id: 'session-1',
    side: 'right',
    title: '1학기 트랙별 세션',
    description: '기획 · 디자인 · 프론프엔드 · 백엔트 파트별 집중 교육을 진행합니다.',
  },
  {
    id: 'ideathon',
    side: 'left',
    title: '아이디어톤',
    description: '전국 아기사자들이 한자리에 모여 아이디어를 공유합니다.',
  },
  {
    id: 'hackathon',
    side: 'right',
    title: '중앙 해커톤',
    description:
      '전국 54개 대학 1,600명이 참여하는 국내 최대 대학 해커톤에서 아이디어를 실현합니다.',
  },
  {
    id: 'session-2',
    side: 'left',
    title: '2학기 트랙별 세션',
    description: '심화 학습과 팀 프로젝트를 통해 실전 역량을 키웁니다.',
  },
  {
    id: 'demoday',
    side: 'right',
    title: '종강총회 & 데모데이',
    description: '1년간의 성과를 공유하고 최우수 프로젝트를 시상합니다.',
  },
] as const

// 다크 배경 위 세로 타임라인 커리큘럼 섹션 (홈).
export function HomeCurriculum() {
  const reduceMotion = useReducedMotion()

  // 좌/우 열은 Figma 와 같이 카드(148px) + 간격(236px) 로 쌓고, 우측 열만 192px 만큼 아래로 어긋난다.
  const leftSteps = CURRICULUM_STEPS.filter((step) => step.side === 'left')
  const rightSteps = CURRICULUM_STEPS.filter((step) => step.side === 'right')

  const renderStep = (step: (typeof CURRICULUM_STEPS)[number]) => (
    <motion.div
      key={step.id}
      className="group relative h-[148px] w-full max-w-[440px] shrink-0"
      initial={reduceMotion ? false : { opacity: 0, x: step.side === 'left' ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* 말풍선 벡터 — 원본은 꼬리가 좌하단(우측 카드용)이라 좌측 카드는 좌우 반전한다.
          호버 시 흰→primary 로 색이 전환된다(SpeechBubble 내부 group-hover). */}
      <SpeechBubble
        className={cn(
          'absolute inset-0 h-[148px] w-full',
          step.side === 'left' && 'lg:-scale-x-100',
        )}
      />
      <div
        className={cn(
          'absolute inset-y-0 flex flex-col justify-center gap-8 text-black transition-colors duration-300 group-hover:text-white motion-reduce:transition-none',
          step.side === 'left'
            ? 'left-[44px] right-[36px] lg:left-40 lg:right-40'
            : 'left-[44px] right-[36px]',
        )}
      >
        <p className="text-sm-20">{step.title}</p>
        <p className="text-m-16-home">{step.description}</p>
      </div>
    </motion.div>
  )

  return (
    <section className="relative w-full overflow-hidden bg-background-2 pb-[90px] pt-96 lg:pt-[180px]">
      {/* 배경 그라디언트 효과 — Figma 의 640x640 방사형 글로우(primary 15%)를 blur 원으로 근사. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full w-full max-w-[1280px]"
      >
        <div className="absolute left-[-273px] top-[393px] h-[640px] w-[640px] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-64 px-24 sm:px-32 lg:gap-96 lg:px-64">
        <motion.div
          className="flex flex-col items-center gap-12"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-h1 text-white">커리큘럼</h2>
          <p className="text-m-18 text-secondary-2">1년동안 이어지는 성장의 여정을 소개합니다</p>
        </motion.div>

        <div className="relative flex w-full max-w-[560px] flex-col gap-48 border-l-2 border-secondary-2 pl-24 lg:hidden">
          {CURRICULUM_STEPS.map((step) => (
            <div key={step.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[31px] top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-secondary-2"
              />
              {renderStep(step)}
            </div>
          ))}
        </div>

        <div className="hidden w-full items-center justify-center gap-24 lg:flex">
          <div className="flex h-[1252px] w-[440px] shrink-0 flex-col gap-[236px]">
            {leftSteps.map(renderStep)}
          </div>
          {/* 타임라인 — 주황 그라디언트 선 + 단계별 원 6개 (Figma 벡터 익스포트) */}
          <img src={timelineLine} alt="" className="h-[1252px] w-[54px] shrink-0" />
          <div className="flex h-[1252px] w-[440px] shrink-0 flex-col justify-end gap-[236px] pb-[144px]">
            {rightSteps.map(renderStep)}
          </div>
        </div>
      </div>
    </section>
  )
}
