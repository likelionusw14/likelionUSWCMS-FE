import { WindowPanel } from '@atoms'
import { LionProfileCard } from '@molecules'
import type { LionSectionProps } from '@types'

// 사자 섹션 — 창 패널 안에 라벨(운영진/아기사자) + (옵션)파트 필터 + 프로필 카드 3열 그리드.
// 운영진·아기사자가 공유한다(아기사자만 filter 슬롯을 채운다).
export function LionSection({ label, lions, isLoading, filter, className }: LionSectionProps) {
  return (
    <WindowPanel className={className} bodyClassName="flex flex-col gap-32">
      <div className="flex flex-col items-start gap-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex shrink-0">
          <span className="flex h-48 items-center justify-center whitespace-nowrap rounded-full bg-primary px-16 text-sm-22 text-white/90">
            {label}
          </span>
          {/* 말풍선 꼬리 — Figma 의 점 2개(12px, 6px) 재현 */}
          <span aria-hidden className="absolute left-[17px] top-[42px] h-12 w-12 rounded-full bg-primary" />
          <span aria-hidden className="absolute left-[11px] top-[53px] h-6 w-6 rounded-full bg-primary" />
        </div>
        {filter}
      </div>
      {lions.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-[29px] gap-y-40 md:grid-cols-3">
          {lions.map((lion) => (
            <LionProfileCard key={lion.id} lion={lion} />
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
