import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import { Button, Dropdown, Input } from '@atoms'
import { DatePickerModal, FileUploadField, FormRow } from '@molecules'
import type { ProjectFormProps, ProjectFormValues } from '@types'
import { cn } from '@utils'

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
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  // 프로젝트 설명 auto-grow — 엔터/입력마다 scrollHeight 만큼 높이를 늘린다. 값(초기값 포함) 변화 시 재계산.
  useEffect(() => {
    const el = descriptionRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [values.description])

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 px-24 pb-[90px] pt-32 sm:pb-[120px] lg:pb-[180px]"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="w-full rounded-8 bg-white">
          {/* 프로젝트명 — input/textarea 는 FormRow 입력 셀(flex)의 자식이라 min-w-px 가 없으면
              기본 폭(size=20, 약 188px) 아래로 줄지 않아 375에서 셀을 밀고 나간다. */}
          <div className="relative z-50 flex h-48 w-full items-stretch sm:h-[56px]">
            <FormRow label="프로젝트명" labelClassName="rounded-tl-8">
              <Input
                variant="form"
                className="min-w-px"
                value={values.name}
                onChange={(event) => change('name', event.target.value)}
                placeholder="프로젝트명을 입력해주세요"
              />
            </FormRow>
          </div>

          {/* 기수 / 태그 — 모바일은 한 행에 두 칸을 넣을 폭이 없어 전폭 단일 행 2개로 쪼갠다 (Figma 1181:20599 / 20606) */}
          <div className="relative z-40 flex w-full flex-col items-stretch border-y border-secondary-1 sm:h-[56px] sm:flex-row">
            <FormRow label="기수" className="min-h-48 sm:min-h-0">
              <Dropdown
                value={values.cohort}
                onChange={(value) => change('cohort', value)}
                options={cohortOptions}
                placeholder="기수"
                className="w-[172px] min-w-px"
              />
            </FormRow>
            <FormRow label="태그" className="min-h-48 sm:min-h-0">
              <Dropdown
                value={values.category}
                onChange={(value) => change('category', value)}
                options={categoryOptions}
                placeholder="태그를 선택해주세요"
                className="w-[172px] min-w-px"
              />
            </FormRow>
          </div>

          {/* 제작기간 — 모바일은 좁은 입력 셀에 두 날짜 버튼이 나란히 들어가지 않아 세로로 쌓는다 (Figma 1181:21209) */}
          <div className="relative z-30 flex w-full items-stretch sm:h-[56px]">
            <FormRow label="제작기간">
              <div className="flex w-full max-w-[160px] flex-col items-center gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:gap-24">
                <button
                  type="button"
                  onClick={() => setDateOpen('start')}
                  className="flex h-32 w-full min-w-px max-w-[160px] items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 sm:w-[160px]"
                >
                  <span
                    className={cn('truncate', values.startDate ? 'text-black' : 'text-primary/50')}
                  >
                    {values.startDate || 'YYYY.MM'}
                  </span>
                  <img src={calendarIcon} alt="" className="h-24 w-24 shrink-0" />
                </button>
                <span className="text-r-12 text-primary/50">~</span>
                <button
                  type="button"
                  onClick={() => setDateOpen('end')}
                  className="flex h-32 w-full min-w-px max-w-[160px] items-center justify-between rounded-8 border border-secondary-1 bg-background-1 px-16 text-m-14 sm:w-[160px]"
                >
                  <span
                    className={cn('truncate', values.endDate ? 'text-black' : 'text-primary/50')}
                  >
                    {values.endDate || 'YYYY.MM'}
                  </span>
                  <img src={calendarIcon} alt="" className="h-24 w-24 shrink-0" />
                </button>
              </div>
            </FormRow>
          </div>

          {/* 깃허브 URL / 프로젝트 URL — 모바일은 한 행에 두 칸을 넣을 폭이 없어 전폭 단일 행 2개로 쪼갠다 (Figma 1181:20627 / 20633) */}
          <div className="relative z-20 flex w-full flex-col items-stretch border-y border-secondary-1 sm:h-[56px] sm:flex-row">
            <FormRow label="깃허브 URL" className="min-h-48 sm:min-h-0">
              <Input
                variant="form"
                className="min-w-px"
                value={values.githubUrl}
                onChange={(event) => onFieldChange('githubUrl', event.target.value)}
                placeholder="링크URL을 입력해주세요"
              />
            </FormRow>
            <FormRow label="프로젝트 URL" className="min-h-48 sm:min-h-0">
              <Input
                variant="form"
                className="min-w-px"
                value={values.projectUrl}
                onChange={(event) => onFieldChange('projectUrl', event.target.value)}
                placeholder="링크URL을 입력해주세요"
              />
            </FormRow>
          </div>

          {/* 프로젝트 참여자 */}
          <div className="relative z-10 flex min-h-48 w-full items-stretch sm:min-h-[56px]">
            <FormRow label="프로젝트 참여자">
              <Input
                variant="form"
                className="min-w-px"
                value={values.participants}
                onChange={(event) => onFieldChange('participants', event.target.value)}
                placeholder="김ㅇㅇ(14기,기획), 김ㅇㅇ(14기,기획)"
              />
            </FormRow>
          </div>

          {/* 대표이미지 업로드 — 모바일은 업로드 박스 아래로 찾기/삭제가 접히므로 높이를 고정하지 않는다 (Figma 1181:20646) */}
          <div className="flex w-full items-stretch border-y border-secondary-1 sm:h-[115px]">
            <FormRow label="대표이미지 업로드">
              <FileUploadField
                fileName={fileName}
                onFileChange={onFileChange}
                onFileClear={onFileClear}
                accept="image/*"
              />
            </FormRow>
          </div>

          {/* 프로젝트 설명 — 시안 행 높이는 375=73 / sm 이상=56 이다(값 셀 상하 여백이 이 행만 11).
              FormRow 공통 py-8 로는 8px 모자라므로 행에 최소 높이를 준다. 입력이 길어지면 auto-grow 로 늘어난다. */}
          <div className="flex min-h-[73px] w-full items-stretch sm:min-h-[56px]">
            <FormRow label="프로젝트 설명" labelClassName="rounded-bl-8">
              <textarea
                ref={descriptionRef}
                rows={1}
                value={values.description}
                onChange={(event) => change('description', event.target.value)}
                placeholder="프로젝트를 설명해주세요"
                className="no-scrollbar min-h-[34px] w-full min-w-px resize-none rounded-8 border border-secondary-1 bg-background-1 px-16 py-[8.5px] text-m-14 text-black placeholder:text-primary/50 focus:outline-none"
              />
            </FormRow>
          </div>
        </div>

        {error && (
          <p className="px-8 text-right text-r-12 text-error">작성내용을 다시 확인해주세요</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-16">
        <Button type="submit" size="block">
          저장
        </Button>
        {onDelete ? (
          <Button size="block" variant="danger" onClick={onDelete}>
            삭제
          </Button>
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
