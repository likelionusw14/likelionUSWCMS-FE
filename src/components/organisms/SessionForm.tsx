import { useRef } from 'react'
import uploadIcon from '@/assets/icons/upload.svg'
import { FormSelect } from '@atoms'
import { FormRow } from '@molecules'
import type { SessionFormProps } from '@types'

// 세션자료 작성·수정 폼 — 주차·파트 + 대표이미지 업로드.
export function SessionForm({
  values,
  onFieldChange,
  onSubmit,
  weekOptions,
  partOptions,
  fileName,
  onFileChange,
  onFileClear,
}: SessionFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // input 의 값도 함께 비운다. 안 그러면 방금 지운 파일을 다시 골라도 change 가 안 나 파일명이 되살아나지 않는다.
  function handleFileClear() {
    if (fileInputRef.current) fileInputRef.current.value = ''
    onFileClear()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-24 px-24 pb-[120px] pt-32">
      <div className="w-full overflow-hidden rounded-8 bg-white">
        <div className="flex w-full items-stretch">
          <FormRow label="주차">
            <FormSelect
              value={values.week}
              onChange={(event) => onFieldChange('week', event.target.value)}
              options={weekOptions}
              placeholder="0주차"
            />
          </FormRow>
          <FormRow label="파트">
            <FormSelect
              value={values.part}
              onChange={(event) => onFieldChange('part', event.target.value)}
              options={partOptions}
              placeholder="기획"
            />
          </FormRow>
        </div>

        <div className="flex w-full items-stretch">
          <FormRow label="대표이미지 업로드">
            <div className="flex items-center gap-8">
              <div className="flex h-96 w-[188px] flex-col items-center justify-center gap-8 rounded-8 border border-gray-500/50 p-16">
                <img src={uploadIcon} alt="" className="h-[20px] w-[29px]" />
                <span className="truncate text-m-14 text-gray-500/50">
                  {fileName || '파일을 선택해주세요'}
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
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
                onClick={handleFileClear}
                className="flex h-32 items-center rounded-8 border border-error px-16 text-m-14 text-error"
              >
                삭제
              </button>
            </div>
          </FormRow>
        </div>
      </div>

      <button
        type="submit"
        className="flex h-48 w-full items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
      >
        저장
      </button>
    </form>
  )
}
