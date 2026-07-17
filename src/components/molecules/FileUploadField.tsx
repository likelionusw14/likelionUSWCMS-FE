import { useRef } from 'react'
import uploadIcon from '@/assets/icons/upload.svg'
import type { FileUploadFieldProps } from '@types'

// 관리 폼 공용 업로드 박스 — 아이콘 + 파일명 + 찾기/삭제 버튼.
// 공지·세션자료·프로젝트 작성 폼이 공유한다 (Figma 상 세 폼 모두 동일한 톤).
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
    <div className="flex items-center gap-8">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex w-[188px] flex-col items-center justify-center gap-8 rounded-8 border border-secondary-1 bg-background-1 p-16"
      >
        <img src={uploadIcon} alt="" className="h-[20px] w-[29px]" />
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
  )
}
