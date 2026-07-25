import { Dropdown } from '@atoms'
import { PROJECT_COHORT_OPTIONS } from '@constants'
import { useUserLionListPage } from '@hooks'
import { LionPartFilter } from '@molecules'
import { LionSection } from '@organisms'

// 사자 페이지 — 기수 드롭다운(공통) + 운영진/아기사자 2섹션. 아기사자만 파트 필터.
export function UserLionListPage() {
  const { operators, babyLions, cohort, part, setCohort, setPart } = useUserLionListPage()

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-48 px-24 pb-96 pt-40 sm:gap-64 sm:px-32 sm:pt-48 lg:px-64">
      <header className="flex flex-col items-center gap-8">
        <div className="relative border-x border-secondary-2 bg-secondary-2/10 px-24 py-4">
          <span className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-secondary-2" />
          <span className="absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-secondary-2" />
          <h1 className="text-h1 text-black">LIONS</h1>
        </div>
        <p className="text-sm-18 text-black">사자</p>
      </header>

      <div className="flex flex-col gap-24">
        <div className="flex justify-end">
          <Dropdown
            value={cohort}
            onChange={setCohort}
            options={PROJECT_COHORT_OPTIONS}
            placeholder="기수"
          />
        </div>
        <LionSection label="운영진" lions={operators.data} isLoading={operators.isLoading} />
        <LionSection
          label="아기사자"
          lions={babyLions.data}
          isLoading={babyLions.isLoading}
          filter={<LionPartFilter value={part} onChange={setPart} />}
        />
      </div>
    </div>
  )
}
