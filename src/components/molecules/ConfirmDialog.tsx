import { Button } from '@atoms'
import { Modal } from '@molecules'
import type { ConfirmDialogProps } from '@types'

// 확인 팝업(삭제 등) — 96px 원형 쓰레기통 아이콘 + 제목/설명 + 취소/확인 버튼.
// Figma 254:2746(마스터) — 카드 bg-white·rounded-8·px-32 py-24·gap-32, 링 96(border-2 error)·글리프 36,
// 제목 SemiBold 20 / 설명 Medium 14 (gap-8), 버튼 행 gap-24, 버튼 h-48·min-w-128·px-32·SM/18.
// 취소는 gray/500 테두리+글자(254:2758)라 outline(primary) 이 아니라 neutral 이다.
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
}: ConfirmDialogProps) {
  return (
    // 폭 — 데스크탑은 내용 hug 344(=32+128+24+128+32, Figma 1205:22114), 모바일은 330(Figma 1249:20988).
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={title}
      panelClassName="w-full max-w-[330px] rounded-8 bg-white sm:w-auto sm:max-w-[344px]"
    >
      {/* 좌우 패딩 — 데스크탑은 시안대로 32, 모바일은 24. 330 안에 min-w-128 버튼 둘 + gap-24(=280)를
          넣으려면 좌우 32(=266)로는 모자라고 24(=282)여야 버튼이 시안 규격을 유지한다. */}
      <div className="flex w-full flex-col items-center gap-32 px-24 py-24 sm:px-32">
        <svg
          aria-hidden
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-error"
        >
          <rect x="1" y="1" width="94" height="94" rx="47" stroke="currentColor" strokeWidth="2" />
          {/* 글리프 프레임 36x36 (Figma 254:2748) — 원본 path 는 24x27 이라 링 중심(48,48.5) 기준 1.333배로
              키워 32x36 을 채운다. 확대분만큼 stroke 를 1.5 로 낮춰 실제 굵기는 시안과 같은 2 가 된다. */}
          <g transform="translate(48 48.5) scale(1.3333) translate(-48 -48.5)">
            <path
              d="M51 47V56"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M45 47V56"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 41V60C39 61.1046 39.8954 62 41 62H55C56.1046 62 57 61.1046 57 60V41"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36 41H60"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M41 41L44 35H53L56 41"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <div className="flex flex-col items-center gap-8">
          <p className="text-center text-sm-20 text-black">{title}</p>
          {description && <p className="text-center text-m-14 text-black">{description}</p>}
        </div>
        {/* 버튼 행 — gap 24 고정(Figma 254:2757), 버튼은 hug(min-w-128·px-32)라 모바일에서도 시안 규격 그대로. */}
        <div className="flex w-full justify-center gap-24">
          <Button variant="neutral" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
