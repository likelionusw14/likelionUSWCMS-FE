import { motion, useReducedMotion } from 'framer-motion'
import { Chip, WindowPanel } from '@atoms'

// 파트 소개 카드 데이터 — 문구는 Figma 원문 그대로.
const PARTS = [
  {
    id: 'planning',
    nameKo: '기획',
    nameEn: 'Planning',
    description:
      '시장 분석, 사용자 조사, 서비스 기획, 프로젝트 매니지먼트를 배웁니다. 팀의 비전을 설정하고 목표 달성을 이끄는 리더십을 기릅니다.',
    tags: ['Service Planning', 'User Story', 'Agile', 'Data Analysis'],
  },
  {
    id: 'design',
    nameKo: '디자인',
    nameEn: 'Design',
    description:
      'UX 리서치부터 프로토타이핑까지, 실제 서비스에 적용되는 디자인을 경험합니다. 개발자와 협업하는 디자인 프로세스를 배웁니다.',
    tags: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
  },
  {
    id: 'frontend',
    nameKo: '프론트엔드',
    nameEn: 'Frontend',
    description:
      'HTML/CSS 기초부터 React 프레임워크까지 단계적으로 학습합니다. UI/UX를 고려한 아름다운 인터페이스를 구현하는 능력을 기릅니다.',
    tags: ['React', 'TypeScript', 'CSS', 'Responsive Design'],
  },
  {
    id: 'backend',
    nameKo: '백엔드',
    nameEn: 'Backend',
    description:
      '서버 아키텍처, 데이터베이스 설계, API 개발을 배웁니다. 안정적이고 확장 가능한 백엔드 시스템을 구축하는 역량을 키웁니다.',
    tags: ['Spring Boot', 'Django', 'REST API', 'Database'],
  },
] as const

// 홈 "파트" 섹션 — 4개 파트를 창(window) 카드로 소개한다. 좌/우 열이 세로로 어긋난 배치.
export function HomeParts() {
  const reduceMotion = useReducedMotion()

  // 카드 한 장. 등장 모션은 열 순서와 무관하게 index 기준으로 순차 지연한다.
  const renderCard = (part: (typeof PARTS)[number], index: number) => (
    <motion.div
      key={part.id}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.12 }}
    >
      <WindowPanel
        className="w-[510px]"
        // 디자인의 본문 배경은 흰색 60% — cn 이 tailwind-merge 가 아니라서 `!` 로 아톰 기본값(bg-white)을 덮는다.
        bodyClassName="flex h-[280px] flex-col justify-between !bg-white/60"
      >
        <div className="flex w-full flex-col gap-8">
          {/* 제목: 한글 | 영문 (구분자는 Figma 원문의 'l' 글자) */}
          <div className="flex items-start gap-[6px] whitespace-nowrap text-sm-22">
            <span className="text-primary/60">{part.nameKo}</span>
            <span aria-hidden className="text-primary/30">
              l
            </span>
            <span className="text-primary/60">{part.nameEn}</span>
          </div>
          <p className="text-m-16-home text-black">{part.description}</p>
        </div>
        <div className="flex w-full flex-wrap items-start gap-8">
          {part.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </WindowPanel>
    </motion.div>
  )

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
