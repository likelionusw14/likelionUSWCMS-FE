import { motion, useReducedMotion } from 'framer-motion'
import emojiBar from '@/assets/home/hero/emoji-bar.svg'
import floorOverlay from '@/assets/home/hero/floor.png'
import folderReflection from '@/assets/home/hero/folder-reflection.svg'
import folderIllustration from '@/assets/home/hero/folder.svg'
import logoSticker from '@/assets/home/hero/logo-sticker.svg'
import musicPlayer from '@/assets/home/hero/music-player.png'
import volumeCard from '@/assets/home/hero/volume.svg'
import { BRAND_NAME } from '@constants'
import { cn } from '@utils'

// 떠 있는 그래픽 3종 — 좌표는 Figma 1280x1600 프레임 기준 절대 위치다.
// 음악 플레이어와 볼륨은 디자인에서 프레임 좌/우 경계에 잘려 있어, 잘린 폭 그대로 익스포트해
// 각각 컨테이너 왼쪽·오른쪽 끝에 붙인다(그래서 left-0 / right-0).
const FLOATING_GRAPHICS = [
  {
    id: 'music-player',
    src: musicPlayer,
    box: 'left-0 top-[223px] h-[277.15px] w-[325.26px]',
    duration: 5,
  },
  {
    id: 'emoji-bar',
    src: emojiBar,
    box: 'left-[760px] top-[92px] h-[120.11px] w-[426.9px]',
    duration: 4,
  },
  {
    id: 'volume',
    src: volumeCard,
    box: 'right-0 top-[321.23px] h-[260.49px] w-[233.78px]',
    duration: 4.5,
  },
] as const

// 홈 히어로(메인 비주얼) — 다크 배경 위 중앙 헤딩 + 3D 파일 일러스트와 바닥 반사, 떠 있는 그래픽 3종.
// 디자인이 1280x1600 고정 합성이라 내부 요소는 프레임 좌표 그대로 절대배치한다.
export function HomeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative w-full bg-background-2">
      {/* 컨테이너에서 잘라내야 디자인처럼 좌/우 그래픽이 1280 경계에서 잘린다. */}
      <div className="relative mx-auto h-[1600px] w-full max-w-[1280px] overflow-hidden">
        {/* 파일 일러스트 — 파트 목록 카드까지 한 장의 벡터로 익스포트했다. */}
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

        {/* 헤딩 — 디자인은 64px(1·2행)/80px(3행) 이지만 토큰에 없어 가장 가까운 text-h0(56px) 로 통일한다.
            h0 에 묶인 자간 6% 는 히어로 전용 값이라, 자간이 0 인 이 디자인에 맞춰 tracking-normal 로 되돌린다.
            줄 간격은 Figma 의 각 행 중심 y(306/398/499.5) 에 맞춘 값이다 (h0 줄높이 72 + gap-24 → 306/402/498). */}
        <h1 className="absolute left-1/2 top-[270px] flex -translate-x-1/2 flex-col items-center gap-24 whitespace-nowrap text-center text-h0 tracking-normal">
          <span className="bg-gradient-typo bg-clip-text text-transparent">내 아이디어를</span>
          <span className="bg-gradient-typo bg-clip-text text-transparent">내 손으로,</span>
          {/* 디자인은 amber→orange 그라디언트지만 토큰에 없어 단색 secondary-2 로 처리. */}
          <span className="text-secondary-2">멋쟁이사자처럼</span>
        </h1>

        {/* 떠 있는 그래픽 — 아주 약한 부유만 준다(동작 최소화 설정이면 정지). */}
        {FLOATING_GRAPHICS.map((graphic) => (
          <motion.img
            key={graphic.id}
            src={graphic.src}
            alt=""
            className={cn('pointer-events-none absolute', graphic.box)}
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: graphic.duration, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}

        {/* 좌상단 브랜드 스티커 */}
        <img
          src={logoSticker}
          alt={BRAND_NAME}
          className="absolute left-[119.91px] top-[570px] h-[105.53px] w-[226.53px]"
        />
      </div>
    </section>
  )
}
