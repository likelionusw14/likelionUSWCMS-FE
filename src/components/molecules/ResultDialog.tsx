import { Button } from '@atoms'
import { Modal } from '@molecules'
import type { ResultDialogProps } from '@types'

// 결과 팝업(삭제완료 등) — 제목/설명 + 단일 확인 버튼. 버튼으로만 닫힌다(바깥클릭·ESC 무시).
// Figma "삭제완료 팝업": 카드 padding 32/40·gap 16, 버튼 h-48·px-32·SM/18(파랑 채움).
export function ResultDialog({
  open,
  onConfirm,
  title,
  description,
  confirmLabel,
}: ResultDialogProps) {
  return (
    // 모바일(375) — 오버레이 px-24 안쪽 327px 을 카드가 전부 쓰도록 w-full, 데스크톱은 기존처럼 내용폭 hug.
    <Modal
      open={open}
      onClose={onConfirm}
      dismissable={false}
      ariaLabel={title}
      panelClassName="w-full max-w-[400px] rounded-8 bg-white sm:w-auto"
    >
      {/* 좌우 패딩 모바일 24 / 데스크톱 40 (Figma 1249:21023). */}
      <div className="flex w-full flex-col items-center gap-16 px-24 py-32 sm:px-40">
        <div className="flex w-full flex-col items-center gap-8">
          <p className="text-center text-sm-20 text-black">{title}</p>
          {description && <p className="text-center text-m-14 text-black">{description}</p>}
        </div>
        {/* 긴 라벨(예: '회원 관리로 이동')이 좁은 화면을 넘지 않도록 카드 폭으로 제한. */}
        <Button variant="primary" onClick={onConfirm} className="max-w-full">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
