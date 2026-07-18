import { motion, useReducedMotion } from 'framer-motion'
import { Chip, WindowPanel } from '@atoms'
import { cn } from '@utils'
import backendIll from '@/assets/home/parts/part-backend.svg'
import designIll from '@/assets/home/parts/part-design.svg'
import frontendIll from '@/assets/home/parts/part-frontend.svg'
import planningIll from '@/assets/home/parts/part-planning.svg'

// 파트 소개 카드 데이터 — 문구는 Figma 원문 그대로.
// accent = 호버 시 제목·배경 오버레이 색 (Figma: 기획·백엔드=secondary-2, 디자인·프론트엔드=primary).
// illustration = 호버 시 우하단에 페이드 인 되는 파트별 일러스트(Figma 익스포트), illBox = 그 크기·회전.
const PARTS = [
  {
    id: 'planning',
    nameKo: '기획',
    nameEn: 'Planning',
    description:
      '시장 분석, 사용자 조사, 서비스 기획, 프로젝트 매니지먼트를 배웁니다. 팀의 비전을 설정하고 목표 달성을 이끄는 리더십을 기릅니다.',
    tags: ['Service Planning', 'User Story', 'Agile', 'Data Analysis'],
    accent: 'secondary-2',
    illustration: planningIll,
    illBox: 'h-[92px] w-[74px] rotate-[7deg]',
  },
  {
    id: 'design',
    nameKo: '디자인',
    nameEn: 'Design',
    description:
      'UX 리서치부터 프로토타이핑까지, 실제 서비스에 적용되는 디자인을 경험합니다. 개발자와 협업하는 디자인 프로세스를 배웁니다.',
    tags: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
    accent: 'primary',
    illustration: designIll,
    illBox: 'h-[88px] w-[95px] -rotate-[29deg]',
  },
  {
    id: 'frontend',
    nameKo: '프론트엔드',
    nameEn: 'Frontend',
    description:
      'HTML/CSS 기초부터 React 프레임워크까지 단계적으로 학습합니다. UI/UX를 고려한 아름다운 인터페이스를 구현하는 능력을 기릅니다.',
    tags: ['React', 'TypeScript', 'CSS', 'Responsive Design'],
    accent: 'primary',
    illustration: frontendIll,
    illBox: 'h-[66px] w-[88px] rotate-[12deg]',
  },
  {
    id: 'backend',
    nameKo: '백엔드',
    nameEn: 'Backend',
    description:
      '서버 아키텍처, 데이터베이스 설계, API 개발을 배웁니다. 안정적이고 확장 가능한 백엔드 시스템을 구축하는 역량을 키웁니다.',
    tags: ['Spring Boot', 'Django', 'REST API', 'Database'],
    accent: 'secondary-2',
    illustration: backendIll,
    illBox: 'h-[92px] w-[92px]',
  },
] as const

// accent → 호버 클래스. Tailwind 는 정적 클래스만 인식하므로 문자열로 매핑한다.
const ACCENT_CLASSES = {
  primary: {
    title: 'group-hover:text-primary',
    sep: 'group-hover:text-primary/30',
    overlay: 'to-primary/20',
  },
  'secondary-2': {
    title: 'group-hover:text-secondary-2',
    sep: 'group-hover:text-secondary-2/30',
    overlay: 'to-secondary-2/20',
  },
} as const

// 홈 "파트" 섹션 — 4개 파트를 창(window) 카드로 소개한다. 좌/우 열이 세로로 어긋난 배치.
// 카드 호버 시 배경이 흰색+accent 그라디언트로, 제목이 accent 색으로 바뀌고 일러스트가 등장한다.
export function HomeParts() {
  const reduceMotion = useReducedMotion()

  // 카드 한 장. 등장 모션은 열 순서와 무관하게 index 기준으로 순차 지연한다.
  const renderCard = (part: (typeof PARTS)[number], index: number) => {
    const accent = ACCENT_CLASSES[part.accent]
    return (
      <motion.div
        key={part.id}
        className="group"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.12 }}
      >
        <WindowPanel
          className="w-[510px]"
          // 본문 배경: 기본 흰색 60% → 호버 시 흰색. cn 이 tailwind-merge 가 아니라서 `!` 로 덮는다.
          bodyClassName="relative flex h-[280px] flex-col justify-between !bg-white/60 transition-colors duration-300 group-hover:!bg-white motion-reduce:transition-none"
        >
          {/* 호버 배경 오버레이 — accent 그라디언트(우하단 방향), 페이드 인 */}
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none',
              accent.overlay,
            )}
          />

          {/* 파트별 일러스트 — 우하단, 호버 시 페이드·스케일 인 (본문 뒤 레이어) */}
          <img
            src={part.illustration}
            alt=""
            aria-hidden
            className={cn(
              'pointer-events-none absolute bottom-[72px] right-[32px] scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none',
              part.illBox,
            )}
          />

          <div className="relative flex w-full flex-col gap-8">
            {/* 제목: 한글 | 영문 (구분자는 Figma 원문의 'l' 글자). 호버 시 accent 색으로 전환. */}
            <div className="flex items-start gap-[6px] whitespace-nowrap text-sm-22">
              <span
                className={cn(
                  'text-primary/60 transition-colors duration-300 motion-reduce:transition-none',
                  accent.title,
                )}
              >
                {part.nameKo}
              </span>
              <span
                aria-hidden
                className={cn(
                  'text-primary/30 transition-colors duration-300 motion-reduce:transition-none',
                  accent.sep,
                )}
              >
                l
              </span>
              <span
                className={cn(
                  'text-primary/60 transition-colors duration-300 motion-reduce:transition-none',
                  accent.title,
                )}
              >
                {part.nameEn}
              </span>
            </div>
            <p className="text-m-16-home text-black">{part.description}</p>
          </div>

          <div className="relative flex w-full flex-wrap items-start gap-8">
            {part.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </div>
        </WindowPanel>
      </motion.div>
    )
  }

  return (
    <section className="relative w-full overflow-hidden bg-background-1 py-[180px]">
      {/* 배경 방사형 글로우 2개 — Figma 의 640x640 그라디언트 효과를 blur 로 근사 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[calc(50%-884px)] top-[73px] h-[640px] w-[640px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -bottom-[160px] left-[calc(50%+98px)] h-[640px] w-[640px] rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-96 px-64">
        <motion.div
          className="flex flex-col items-center gap-12 whitespace-nowrap"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h2 className="text-h1 text-black">파트</h2>
          <p className="text-m-18 text-secondary-2">4개의 파트를 소개합니다</p>
        </motion.div>

        <div className="flex w-full items-start justify-center gap-32">
          {/* 좌열 — 기획·디자인 */}
          <div className="flex flex-col items-center gap-[56px]">
            {PARTS.slice(0, 2).map((part, index) => renderCard(part, index))}
          </div>
          {/* 우열 — 프론트엔드·백엔드. 디자인상 90px 아래로 어긋나 있다. */}
          <div className="flex flex-col items-center gap-[56px] pt-[90px]">
            {PARTS.slice(2).map((part, index) => renderCard(part, index + 2))}
          </div>
        </div>
      </div>
    </section>
  )
}
