import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

import arrowRight from '@/assets/home/projects/arrow-right.svg'
import projectBitemind from '@/assets/home/projects/project-3.jpg'
import projectMealdo from '@/assets/home/projects/project-2.png'
import projectMidnight from '@/assets/home/projects/project-1.png'
import { cn } from '@utils'

// 프로젝트 썸네일 목록 (Figma 588:4572 — 484x272).
// 디자인의 4~6번 칸은 아직 비어 있어(빈 프레임) 이미지가 채워질 때 여기에 더한다.
const PROJECTS = [
  {
    id: 'midnight',
    title: '2026 수원대학교 대동제 MIDNIGHT',
    thumbnail: projectMidnight,
    // Figma 는 원본 이미지를 위쪽에 맞춰 잘랐다 (아래 여백을 버림).
    thumbnailClassName: 'object-center',
  },
  {
    id: 'mealdo',
    title: 'MEALDO',
    thumbnail: projectMealdo,
    thumbnailClassName: 'object-center',
  },
  {
    id: 'bitemind',
    title: 'Bitemind',
    thumbnail: projectBitemind,
    thumbnailClassName: 'object-top',
  },
] as const

// 이음매를 없애려고 같은 목록을 2벌 렌더하고 트랙을 -50% 이동시킨다.
// (아이템마다 pr-24 로 간격을 주므로 트랙의 정확히 절반이 한 벌과 일치한다)
const MARQUEE_ITEMS = [...PROJECTS, ...PROJECTS]

// 한 바퀴(한 벌만큼 이동)에 걸리는 시간(초). 508px 짜리 썸네일이 천천히 흐르도록 잡았다.
const MARQUEE_DURATION = 24

// 홈 "프로젝트" 섹션 (Figma 588:4565 — 1280x995, 밝은 배경 background-1).
export function HomeProjects() {
  const reduceMotion = useReducedMotion()
  // 모션을 끄면 흐름이 없으니 한 벌만 렌더한다 (중복 낭독 방지).
  const items = reduceMotion ? MARQUEE_ITEMS.slice(0, PROJECTS.length) : MARQUEE_ITEMS

  return (
    <section
      aria-labelledby="home-projects-title"
      className="relative w-full overflow-hidden bg-background-1 pb-[90px] pt-[180px]"
    >
      {/* 장식: 좌상단 640x640 방사형 글로우 (디자인의 "그라디언트 효과" 근사) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[190px] -top-[117px] h-[640px] w-[640px] rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-96 px-64">
        <motion.div
          className="flex flex-col items-center gap-12 text-center"
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="home-projects-title" className="text-h1 text-black">
            프로젝트
          </h2>
          <p className="text-m-18 text-secondary-2">멋쟁이사자처럼의 프로젝트를 소개합니다</p>
        </motion.div>

        {/* 프로젝트 UI 그래픽 — 디자인 모서리는 24px 이지만 radius 토큰(4·8·16)에 없어 16px 로 근사한다 */}
        <div className="w-full overflow-hidden rounded-16">
          <div className="bg-white/60 p-24 shadow-emboss-light">
            {/* 모션을 끈 사용자는 흐름 대신 가로 스크롤로 볼 수 있게 한다 */}
            <div className={cn('overflow-hidden', reduceMotion && 'overflow-x-auto')}>
              <motion.ul
                className="flex w-max"
                animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { repeat: Infinity, ease: 'linear', duration: MARQUEE_DURATION }
                }
              >
                {items.map((project, index) => (
                  <li
                    key={`${project.id}-${index}`}
                    className="shrink-0 pr-24"
                    aria-hidden={index >= PROJECTS.length}
                  >
                    <div className="h-[272px] w-[484px] overflow-hidden rounded-16">
                      <img
                        src={project.thumbnail}
                        alt={index < PROJECTS.length ? `${project.title} 프로젝트 썸네일` : ''}
                        className={cn('h-full w-full object-cover', project.thumbnailClassName)}
                      />
                    </div>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>

          <div className="flex h-[108px] items-center justify-between border-t-2 border-secondary-1 bg-white/60 px-24 shadow-emboss-light">
            {/* 디자인은 24px Medium 이지만 타이포 토큰에 24px 이 없어 가장 가까운 text-m-20 으로 근사한다 */}
            <p className="text-m-20 text-primary/70">
              지금 멋쟁이사자처럼 수원대학교의 프로젝트를 확인해보세요!
            </p>
            <Link
              to="/projects"
              className="flex shrink-0 items-center gap-12 rounded-full bg-secondary-2 px-24 py-12 text-m-20 text-white transition-opacity hover:opacity-90"
            >
              프로젝트 더보기
              <img src={arrowRight} alt="" className="h-[20px] w-[11px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
