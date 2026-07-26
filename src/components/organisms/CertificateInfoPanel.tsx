import type { ReactNode } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import chevronDown from '@/assets/icons/chevron-down-sm.svg'
import { Button, WindowPanel } from '@atoms'
import type { CertificateInfoPanelProps } from '@types'

// 읽기 전용 필드 한 칸 — 라벨 + 값 박스(Figma 의 입력/드롭다운 룩). 실제 서비스에선 내 정보가
// 읽기 전용이라 파트·기수 셰브런과 활동기간 캘린더는 시각 표시만 하고 동작은 없다.
function Field({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="flex items-center gap-12">
      <span className="text-m-14 text-black">{label}</span>
      <span className="flex h-32 min-w-[120px] items-center justify-between gap-8 rounded-8 border border-secondary-1 bg-background-1 px-12 text-m-14 text-black">
        <span className="whitespace-nowrap">{value}</span>
        {icon}
      </span>
    </div>
  )
}

// 내 정보 확인 창 — 활동증명서에 반영될 본인 정보(읽기 전용) + PDF 발급하기.
export function CertificateInfoPanel({ info, isLoading, onIssue }: CertificateInfoPanelProps) {
  return (
    <WindowPanel bodyClassName="flex flex-col items-center gap-40 py-40">
      <h2 className="text-sm-20 text-black">내 정보 확인</h2>
      {info && !isLoading ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-24">
            <Field label="이름" value={info.name} />
            <Field label="학번" value={info.studentId} />
            <Field
              label="파트"
              value={info.part}
              icon={
                <img src={chevronDown} alt="" aria-hidden className="h-[4px] w-[8px] shrink-0" />
              }
            />
            <Field
              label="기수"
              value={info.cohort}
              icon={
                <img src={chevronDown} alt="" aria-hidden className="h-[4px] w-[8px] shrink-0" />
              }
            />
            <Field
              label="활동기간"
              value={info.activityPeriod}
              icon={<img src={calendarIcon} alt="" aria-hidden className="h-24 w-24 shrink-0" />}
            />
          </div>
          <Button variant="primary" onClick={onIssue}>
            PDF 발급하기
          </Button>
        </>
      ) : (
        <p className="text-m-16 text-gray-700">불러오는 중…</p>
      )}
    </WindowPanel>
  )
}
