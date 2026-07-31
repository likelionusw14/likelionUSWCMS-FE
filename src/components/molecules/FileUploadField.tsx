import { useRef } from 'react'
import uploadIcon from '@/assets/icons/upload.svg'
import type { FileUploadFieldProps } from '@types'

// 관리 폼 공용 업로드 박스 — 아이콘 + 파일명 + 찾기/삭제 버튼.
// 공지·세션자료·프로젝트 작성 폼이 공유한다 (Figma 상 세 폼 모두 동일한 톤).
// 반응형: 좁은 입력 셀에서는 드롭존 188px 고정폭이 그대로 넘치므로 max-w 로 유동화하고,
// 찾기/삭제는 한 묶음으로 감싸 flex-wrap 시 둘이 함께 아랫줄로 내려가게 한다 (Figma 모바일 1181:20649).
// 바깥 래퍼에 w-full: 래퍼가 내용에 맞춰 줄어들면 드롭존의 max-w-[188px] 가 반영되기 전 폭으로 확정돼
// 데스크톱에서도 찾기/삭제가 불필요하게 아랫줄로 접힌다. min-w-px 는 드롭존 파일명이 nowrap 이라
// min-content 가 텍스트 폭만큼 잡히는 걸 풀어 375에서 셀 밖으로 밀려나지 않게 한다.
export function FileUploadField({
  fileName,
  onFileChange,
  onFileClear,
  accept,
}: FileUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // input 의 값도 함께 비운다. 안 그러면 방금 지운 파일을 다시 골라도 change 가 안 나 파일명이 되살아나지 않는다.
  function handleClear() {
    if (fileInputRef.current) fileInputRef.current.value = ''
    onFileClear()
  }

  return (
    <div className="flex w-full min-w-px flex-wrap items-center gap-8">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex w-full min-w-px max-w-[188px] flex-col items-center justify-center gap-8 rounded-8 border border-secondary-1 bg-background-1 p-16"
      >
        {/* 아이콘 프레임 42x30 안에 29x20 글리프 — 프레임을 빼면 박스가 87 이 아니라 77 로 줄어 행 높이가 어긋난다. */}
        <span className="flex h-[30px] w-[42px] items-center justify-center">
          <img src={uploadIcon} alt="" className="h-[20px] w-[29px]" />
        </span>
        <span className="w-full truncate text-center text-m-14 text-primary/50">
          {fileName || '파일을 선택해주세요'}
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? '')}
      />
      <div className="flex min-w-px flex-wrap items-center gap-8">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-32 items-center rounded-8 bg-primary px-16 text-m-14 text-white"
        >
          찾기
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex h-32 items-center rounded-8 border border-error px-16 text-m-14 text-error"
        >
          삭제
        </button>
      </div>
    </div>
  )
}
