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
  { id: 'music-player', src: musicPlayer, box: 'left-0 top-[223px] h-[277.15px] w-[325.26px]' },
  { id: 'emoji-bar', src: emojiBar, box: 'left-[760px] top-[92px] h-[120.11px] w-[426.9px]' },
  { id: 'volume', src: volumeCard, box: 'right-0 top-[321.23px] h-[260.49px] w-[233.78px]' },
] as const

// 홈 히어로(메인 비주얼) — 다크 배경 위 중앙 헤딩 + 3D 파일 일러스트와 바닥 반사, 떠 있는 그래픽 3종.
// 디자인이 1280x1600 고정 합성이라 내부 요소는 프레임 좌표 그대로 절대배치한다.
export function HomeHero() {
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

        {/* 떠 있는 그래픽 — 디자인 그대로 정지 배치 (원본에 모션 없음). */}
        {FLOATING_GRAPHICS.map((graphic) => (
          <img
            key={graphic.id}
            src={graphic.src}
            alt=""
            className={cn('pointer-events-none absolute', graphic.box)}
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
