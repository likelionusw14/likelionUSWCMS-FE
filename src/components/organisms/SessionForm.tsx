import { useState } from 'react'
import type { FormEvent } from 'react'
import { Dropdown } from '@atoms'
import { FileUploadField, FormRow } from '@molecules'
import type { SessionFormProps } from '@types'

// 세션자료 작성·수정 폼 — 표 형태(라벨 secondary-1 + 입력): 주차·파트 + 대표이미지 업로드.
// 저장 시 주차/파트가 비어있으면 '작성내용을 다시 확인해주세요'(R/12 error) 표시. Figma 818:16570/16569.
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
  const [error, setError] = useState(false)

  function change(field: keyof typeof values, value: string) {
    onFieldChange(field, value)
    if (error) setError(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!values.week.trim() || !values.part.trim()) {
      event.preventDefault()
      setError(true)
      return
    }
    setError(false)
    onSubmit(event)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-24 px-24 pb-[120px] pt-32">
      <div className="flex w-full flex-col gap-4">
        <div className="w-full overflow-hidden rounded-8 bg-white">
          {/* 주차 / 파트 */}
          <div className="flex h-[56px] w-full items-stretch border-b border-secondary-1">
            <FormRow label="주차">
              <Dropdown
                value={values.week}
                onChange={(value) => change('week', value)}
                options={weekOptions}
                placeholder="0주차"
                className="w-[172px]"
              />
            </FormRow>
            <FormRow label="파트">
              <Dropdown
                value={values.part}
                onChange={(value) => change('part', value)}
                options={partOptions}
                placeholder="기획"
                className="w-[172px]"
              />
            </FormRow>
          </div>

          {/* 대표이미지 업로드 */}
          <div className="flex h-[115px] w-full items-stretch">
            <FormRow label="대표이미지 업로드">
              <FileUploadField
                fileName={fileName}
                onFileChange={onFileChange}
                onFileClear={onFileClear}
                accept="image/*"
              />
            </FormRow>
          </div>
        </div>

        {error && <p className="px-8 text-right text-r-12 text-error">작성내용을 다시 확인해주세요</p>}
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
