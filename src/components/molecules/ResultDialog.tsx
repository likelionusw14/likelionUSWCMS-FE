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
    // 시안(삭제완료 팝업)은 모바일에서도 내용폭 hug(262) — 344 컨테이너 안에 41/41 여백으로 놓인다.
    // 늘리지 않고 hug 시키되, 긴 라벨로 화면을 넘지 않게 max-w 로만 제한한다.
    <Modal
      open={open}
      onClose={onConfirm}
      dismissable={false}
      ariaLabel={title}
      panelClassName="max-w-full rounded-8 bg-white"
    >
      {/* 좌우 패딩 40 (Figma 1249:21023) — 시안은 모바일 삭제완료도 262 라 데스크탑과 같은 패딩이다. */}
      <div className="flex w-full flex-col items-center gap-16 px-40 py-32">
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
