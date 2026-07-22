import { Button, WindowPanel } from '@atoms'
import type { CertificateInfoPanelProps } from '@types'

// 읽기 전용 필드 한 칸 — 라벨 + 값 박스(디자인의 입력/드롭다운 룩, 비활성).
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-16">
      <span className="text-m-16 text-black">{label}</span>
      <span className="flex h-32 min-w-[120px] items-center rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 text-black">
        {value}
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
          <div className="flex flex-col items-center gap-24">
            <div className="flex flex-wrap justify-center gap-x-40 gap-y-16">
              <Field label="이름" value={info.name} />
              <Field label="학번" value={info.studentId} />
            </div>
            <div className="flex flex-wrap justify-center gap-x-40 gap-y-16">
              <Field label="파트" value={info.part} />
              <Field label="기수" value={info.cohort} />
              <Field label="활동기간" value={info.activityPeriod} />
            </div>
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
