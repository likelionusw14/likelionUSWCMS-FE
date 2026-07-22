import { motion, useReducedMotion } from 'framer-motion'
import contextMenu from '@/assets/home/hero/context-menu.svg'
import emojiBar from '@/assets/home/hero/emoji-bar.svg'
import floorOverlay from '@/assets/home/hero/floor.png'
import folderReflection from '@/assets/home/hero/folder-reflection.svg'
import folderIllustration from '@/assets/home/hero/folder.svg'
import logoSticker from '@/assets/home/hero/logo-sticker.svg'
import musicPlayer from '@/assets/home/hero/music-player.png'
import volumeCard from '@/assets/home/hero/volume.png'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'

// 떠 있는 그래픽 5종 — Figma 1280 프레임 좌표 기준 절대배치한다.
// 각 그래픽은 로드 시 아래·회전된 위치에서 제자리로 1회 낙하·정착한다(Figma 프로토타입 모션).
// from = 초기 오프셋(Figma 키프레임의 시작 transform, rest 대비), delay = 등장 시차.
// music-player/volume 은 Figma 에선 프레임 좌/우 경계를 넘어가(블리드) overflow-hidden 에 잘리는데,
// 전체 그래픽 PNG 로 교체했으므로 좌/우 끝(left-0/right-0)에 붙여 카드 전체가 보이게 한다.
const GRAPHICS = [
  {
    // Cut/Copy/Paste 컨텍스트 메뉴 (Figma 894:2763) — 렌더 상태(7.06° 회전·레이어 블러)는 SVG 에
    // 구워져 있고, box 는 블러 패딩이 포함된 export 경계(320.98/60, 284x96)에 맞춘다.
    // from 은 Figma 키프레임(rotate 31.1→7.06, x 83→0, y 898→0)의 rest 대비 오프셋.
    id: 'context-menu',
    src: contextMenu,
    alt: '',
    box: 'left-[320.98px] top-[60px] h-[96px] w-[284px]',
    from: { x: 83, y: 898, rotate: 24 },
    delay: 0.35,
  },
  {
    id: 'music-player',
    src: musicPlayer,
    alt: '',
    box: 'left-0 top-[223px] h-[277.153px] w-[361.257px]',
    from: { x: 350, y: 629, rotate: 5 },
    delay: 0.2,
  },
  {
    id: 'emoji-bar',
    src: emojiBar,
    alt: '',
    box: 'left-[calc(50%+333.45px)] top-[92px] h-[120.105px] w-[426.902px] -translate-x-1/2',
    from: { x: -232, y: 851, rotate: 8.7 },
    delay: 0.3,
  },
  {
    id: 'volume',
    src: volumeCard,
    alt: '',
    box: 'right-0 top-[321.23px] h-[260.492px] w-[260.492px]',
    from: { x: -354, y: 585, rotate: 5.7 },
    delay: 0.25,
  },
  {
    id: 'logo-sticker',
    src: logoSticker,
    alt: BRAND_NAME,
    box: 'left-[119.91px] top-[570px] h-[105.528px] w-[226.528px]',
    from: { x: 266, y: 487, rotate: 36.7 },
    delay: 0,
  },
] as const

// 낙하·정착 easing — Figma 키프레임 x/y 베지어(끝에서 살짝 오버슈트).
const SETTLE_EASE: [number, number, number, number] = [0.45, 1.45, 0.8, 1]

// 홈 히어로(메인 비주얼) — 다크 배경 위 중앙 헤딩 + 3D 파일 일러스트와 바닥 반사, 떠 있는 그래픽 4종.
// 디자인이 1280x1600 고정 합성이라 내부 요소는 프레임 좌표 그대로 절대배치한다.
export function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative w-full bg-background-2">
      {/* 컨테이너에서 잘라내야 디자인처럼 좌/우 그래픽이 1280 경계에서 잘린다. */}
      <div className="relative mx-auto h-[1600px] w-full max-w-[1280px] overflow-hidden">
        {/* 파일 일러스트 — 파트 목록 카드까지 한 장의 벡터로 익스포트했다. (정지) */}
        <img
          src={folderIllustration}
          alt="Planning, Frontend, Design, Backend 파트 목록이 담긴 파일 일러스트레이션"
          className="absolute left-1/2 top-[601px] h-[607.18px] w-[933.12px] -translate-x-1/2"
        />

        {/* 바닥 반사 — 일러스트를 상하 반전한 상 위에, 반투명 어두운 바닥을 덮어 서서히 사라지게 한다. */}
        <img
          src={folderReflection}
          alt=""
          className="pointer-events-none absolute left-1/2 top-[1208px] h-[392px] w-[933.12px] -translate-x-1/2"
        />
        <img
          src={floorOverlay}
          alt=""
          className="pointer-events-none absolute left-0 top-[1208px] h-[452px] w-full object-cover"
        />

        {/* 그라디언트 효과 — 중앙 방사형 글로우(장식). Figma 의 640x640 radial 을 blur 원으로 근사. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[123px] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.15] blur-[120px]"
        />

        {/* 헤딩 — 1·2행 64px / 3행 80px. 각 행이 92px 씩 내려가도록(Figma y 268/360/452) gap-16 을 준다
            (hero-64 줄높이 76 + gap-16 = 92). 3행은 amber→secondary-2 세로 그라디언트 텍스트. */}
        <h1 className="absolute left-1/2 top-[268px] flex -translate-x-1/2 flex-col items-center gap-16 whitespace-nowrap text-center">
          <span className="bg-gradient-typo bg-clip-text text-hero-64 text-transparent">
            내 아이디어를
          </span>
          <span className="bg-gradient-typo bg-clip-text text-hero-64 text-transparent">
            내 손으로,
          </span>
          <span className="bg-gradient-typo-secondary bg-clip-text text-hero-80 text-transparent">
            멋쟁이사자처럼
          </span>
        </h1>

        {/* 떠 있는 그래픽 — 로드 시 1회 낙하·정착. 위치 래퍼(-translate-x-1/2 등 레이아웃 transform)와
            모션 transform(x/y/rotate)이 충돌하지 않도록 래퍼 안에 motion.img 를 둔다. */}
        {GRAPHICS.map((graphic) => (
          <div key={graphic.id} className={cn('pointer-events-none absolute', graphic.box)}>
            <motion.img
              src={graphic.src}
              alt={graphic.alt}
              className="h-full w-full"
              initial={reduceMotion ? false : { opacity: 0, ...graphic.from }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: graphic.delay,
                ease: SETTLE_EASE,
                opacity: { duration: 0.4, delay: graphic.delay, ease: 'easeOut' },
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
