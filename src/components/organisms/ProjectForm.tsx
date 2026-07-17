import { useState } from 'react'
import type { FormEvent } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import { Dropdown, FormInput } from '@atoms'
import { DatePickerModal, FileUploadField, FormRow } from '@molecules'
import type { ProjectFormProps, ProjectFormValues } from '@types'

// 프로젝트 작성·수정 폼 — 표 형태(라벨 secondary-1 + 입력): 프로젝트명·기수·태그·제작기간·
// 깃허브/프로젝트 URL·참여자·대표이미지·설명. 저장 시 프로젝트명/태그가 비어있으면
// '작성내용을 다시 확인해주세요'(R/12 error) 표시. Figma 818:16386/16385.
export function ProjectForm({
  values,
  onFieldChange,
  onSubmit,
  onDelete,
  cohortOptions,
  categoryOptions,
  fileName,
  onFileChange,
  onFileClear,
}: ProjectFormProps) {
  const [error, setError] = useState(false)
  const [dateOpen, setDateOpen] = useState<'start' | 'end' | null>(null)

  function change(field: keyof ProjectFormValues, value: string) {
    onFieldChange(field, value)
    if (error) setError(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!values.name.trim() || !values.category.trim()) {
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
        <div className="w-full rounded-8 bg-white">
          {/* 프로젝트명 */}
          <div className="relative z-50 flex h-[56px] w-full items-stretch">
            <FormRow label="프로젝트명" labelClassName="rounded-tl-8">
              <FormInput
                value={values.name}
                onChange={(event) => change('name', event.target.value)}
                placeholder="프로젝트명을 입력해주세요"
              />
            </FormRow>
          </div>

          {/* 기수 / 태그 */}
          <div className="relative z-40 flex h-[56px] w-full items-stretch border-y border-secondary-1">
            <FormRow label="기수">
              <Dropdown
                value={values.cohort}
                onChange={(value) => change('cohort', value)}
                options={cohortOptions}
                placeholder="기수"
                className="w-[172px]"
              />
            </FormRow>
            <FormRow label="태그">
              <Dropdown
                value={values.category}
                onChange={(value) => change('category', value)}
                options={categoryOptions}
                placeholder="태그를 선택해주세요"
                className="w-[172px]"
              />
            </FormRow>
          </div>

          {/* 제작기간 */}
          <div className="relative z-30 flex h-[56px] w-full items-stretch">
            <FormRow label="제작기간">
              <div className="flex items-center gap-24">
                <button
                  type="button"
                  onClick={() => setDateOpen('start')}
                  className="flex h-32 w-[160px] items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14"
                >
                  <span className={values.startDate ? 'text-black' : 'text-primary/50'}>
                    {values.startDate || 'YYYY.MM'}
                  </span>
                  <img src={calendarIcon} alt="" className="h-24 w-24 shrink-0" />
                </button>
                <span className="text-r-12 text-primary/50">~</span>
                <button
                  type="button"
                  onClick={() => setDateOpen('end')}
                  className="flex h-32 w-[160px] items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14"
                >
                  <span className={values.endDate ? 'text-black' : 'text-primary/50'}>
                    {values.endDate || 'YYYY.MM'}
                  </span>
                  <img src={calendarIcon} alt="" className="h-24 w-24 shrink-0" />
                </button>
              </div>
            </FormRow>
          </div>

          {/* 깃허브 URL / 프로젝트 URL */}
          <div className="relative z-20 flex h-[56px] w-full items-stretch border-y border-secondary-1">
            <FormRow label="깃허브 URL">
              <FormInput
                value={values.githubUrl}
                onChange={(event) => onFieldChange('githubUrl', event.target.value)}
                placeholder="링크URL을 입력해주세요"
              />
            </FormRow>
            <FormRow label="프로젝트 URL">
              <FormInput
                value={values.projectUrl}
                onChange={(event) => onFieldChange('projectUrl', event.target.value)}
                placeholder="링크URL을 입력해주세요"
              />
            </FormRow>
          </div>

          {/* 프로젝트 참여자 */}
          <div className="relative z-10 flex w-full items-stretch">
            <FormRow label="프로젝트 참여자">
              <FormInput
                value={values.participants}
                onChange={(event) => onFieldChange('participants', event.target.value)}
                placeholder="김ㅇㅇ(14기,기획), 김ㅇㅇ(14기,기획)"
              />
            </FormRow>
          </div>

          {/* 대표이미지 업로드 */}
          <div className="flex h-[115px] w-full items-stretch border-y border-secondary-1">
            <FormRow label="대표이미지 업로드">
              <FileUploadField
                fileName={fileName}
                onFileChange={onFileChange}
                onFileClear={onFileClear}
                accept="image/*"
              />
            </FormRow>
          </div>

          {/* 프로젝트 설명 */}
          <div className="flex w-full items-stretch">
            <FormRow label="프로젝트 설명" labelClassName="rounded-bl-8">
              <textarea
                value={values.description}
                onChange={(event) => onFieldChange('description', event.target.value)}
                placeholder="프로젝트를 설명해주세요"
                rows={6}
                className="no-scrollbar w-full resize-none rounded-8 border border-secondary-1 bg-background-1 px-16 py-[8.5px] text-m-14 text-black placeholder:text-primary/50 focus:outline-none"
              />
            </FormRow>
          </div>
        </div>

        {error && <p className="px-8 text-right text-r-12 text-error">작성내용을 다시 확인해주세요</p>}
      </div>

      <div className="flex w-full flex-col gap-16">
        <button
          type="submit"
          className="flex h-48 w-full items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
        >
          저장
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="flex h-48 w-full items-center justify-center rounded-8 border border-error px-32 text-sm-18 text-error"
          >
            삭제
          </button>
        ) : null}
      </div>

      <DatePickerModal
        open={dateOpen !== null}
        onClose={() => setDateOpen(null)}
        onConfirm={(value) => {
          if (dateOpen) change(dateOpen === 'start' ? 'startDate' : 'endDate', value)
        }}
        value={dateOpen === 'start' ? values.startDate : values.endDate}
        title={dateOpen === 'start' ? '제작 시작일' : '제작 종료일'}
        granularity="month"
      />
    </form>
  )
}
