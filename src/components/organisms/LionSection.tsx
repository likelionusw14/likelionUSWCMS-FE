import { WindowPanel } from '@atoms'
import { LionProfileCard } from '@molecules'
import type { LionSectionProps } from '@types'

// 사자 섹션 — 창 패널 안에 라벨(운영진/아기사자) + (옵션)파트 필터 + 프로필 카드 3열 그리드.
// 운영진·아기사자가 공유한다(아기사자만 filter 슬롯을 채운다).
export function LionSection({ label, lions, isLoading, filter, className }: LionSectionProps) {
  return (
    <WindowPanel className={className} bodyClassName="flex flex-col gap-32">
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-center rounded-full bg-primary px-24 py-8 text-sm-18 text-white">
          {label}
        </span>
        {filter}
      </div>
      {lions.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-[29px] gap-y-40 md:grid-cols-2 lg:grid-cols-3">
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
