import { WindowPanel } from '@atoms'
import { LionProfileCard } from '@molecules'
import type { LionSectionProps } from '@types'

// 사자 섹션 — 창 패널 안에 라벨(운영진/아기사자) + (옵션)파트 필터 + 프로필 카드 3열 그리드.
// 운영진·아기사자가 공유한다(아기사자만 filter 슬롯을 채운다).
export function LionSection({ label, lions, isLoading, filter, className }: LionSectionProps) {
  return (
    // cn 은 tailwind-merge 가 아니라 clsx 라 WindowPanel 기본 p-32 를 그냥 덮지 못한다(둘 다 남아 CSS 순서상 p-32 승).
    // Figma 본문 패딩 16/24/32 를 강제하려 important(!) 로 override 한다.
    <WindowPanel className={className} bodyClassName="flex flex-col gap-32 !p-16 sm:!p-24 lg:!p-32">
      <div className="flex flex-col items-start gap-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex shrink-0">
          {/* 말풍선 그림자 — shadow-drop(Figma 원본)은 너무 옅어 잘 안 보여, 같은 navy 색으로 더 진하게(말풍선 한정). */}
          <span className="flex h-48 min-w-[100px] items-center justify-center whitespace-nowrap rounded-full bg-primary px-16 text-sm-16 text-white/90 shadow-[0_6px_16px_-2px_rgb(7_13_40_/_0.3)] sm:min-w-[126px] sm:px-24 sm:text-sm-22 xl:px-[34px]">
            {label}
          </span>
          {/* 말풍선 꼬리 — Figma 의 점 2개(12px, 6px) 재현 */}
          <span
            aria-hidden
            className="absolute left-[17px] top-[42px] h-12 w-12 rounded-full bg-primary"
          />
          <span
            aria-hidden
            className="absolute left-[11px] top-[53px] h-6 w-6 rounded-full bg-primary"
          />
        </div>
        {filter}
      </div>
      {lions.length > 0 ? (
        // 카드 그리드 — Figma 고정 크기: 모바일 197px 1열 가운데정렬, 태블릿 197px 3열(gap 40),
        // 데스크탑(xl) 299px 3열 space-between(간격 ≈95px). 행 간격 40px.
        <div className="grid justify-center gap-y-40 grid-cols-[197.34px] md:grid-cols-[repeat(3,197.34px)] md:gap-x-40 xl:grid-cols-[repeat(3,299px)] xl:justify-between xl:gap-x-0">
          {lions.map((lion) => (
            // Figma 태블릿/모바일 카드는 데스크탑(299px) 카드를 66% 통째 축소한 인스턴스 → zoom 으로 폰트까지 함께 스케일.
            <div key={lion.id} className="w-[299px] [zoom:0.66] xl:[zoom:1]">
              <LionProfileCard lion={lion} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center rounded-8 bg-background-1 px-24 text-center text-m-18 text-gray-700">
          {isLoading ? '불러오는 중…' : '조건에 맞는 사자가 없습니다.'}
        </div>
      )}
    </WindowPanel>
  )
}
