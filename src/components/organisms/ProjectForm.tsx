import { useRef } from 'react'
import calendarIcon from '@/assets/icons/calendar.svg'
import uploadIcon from '@/assets/icons/upload.svg'
import { FormInput } from '@atoms'
import { FormRow } from '@molecules'
import type { ProjectFormProps } from '@types'

const FIELD_BORDER = 'border-b border-secondary-1'

// 프로젝트 작성·수정 폼.
export function ProjectForm({
  values,
  onFieldChange,
  onSubmit,
  onDelete,
  categoryOptions,
  fileName,
  onFileChange,
  onFileClear,
}: ProjectFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-24 px-24 pb-[120px] pt-32">
      <div className="w-full overflow-hidden rounded-8 bg-white">
        <div className={`flex w-full items-stretch ${FIELD_BORDER}`}>
          <FormRow label="프로젝트명">
            <FormInput
              value={values.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              placeholder="프로젝트명을 입력해주세요"
            />
          </FormRow>
          <FormRow label="태그">
            <select
              value={values.category}
              onChange={(event) => onFieldChange('category', event.target.value)}
              className="h-32 w-full rounded-8 border border-gray-500 px-16 text-m-14 text-black"
            >
              <option value="">태그를 선택해주세요</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormRow>
        </div>

        <div className={`flex w-full items-stretch ${FIELD_BORDER}`}>
          <FormRow label="제작기간">
            <div className="flex items-center gap-24">
              <div className="relative w-[160px]">
                <FormInput
                  value={values.startDate}
                  onChange={(event) => onFieldChange('startDate', event.target.value)}
                  placeholder="YYYY.MM"
                  className="pr-40"
                />
                <img
                  src={calendarIcon}
                  alt=""
                  className="pointer-events-none absolute right-16 top-4 h-24 w-24"
                />
              </div>
              <span className="text-r-12 text-gray-500">~</span>
              <div className="relative w-[160px]">
                <FormInput
                  value={values.endDate}
                  onChange={(event) => onFieldChange('endDate', event.target.value)}
                  placeholder="YYYY.MM"
                  className="pr-40"
                />
                <img
                  src={calendarIcon}
                  alt=""
                  className="pointer-events-none absolute right-16 top-4 h-24 w-24"
                />
              </div>
            </div>
          </FormRow>
        </div>

        <div className={`flex w-full items-stretch ${FIELD_BORDER}`}>
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

        <div className={`flex w-full items-stretch ${FIELD_BORDER}`}>
          <FormRow label="프로젝트 참여자">
            <FormInput
              value={values.participants}
              onChange={(event) => onFieldChange('participants', event.target.value)}
              placeholder="김ㅇㅇ(14기,기획), 김ㅇㅇ(14기,기획)"
            />
          </FormRow>
        </div>

        <div className={`flex h-[100px] w-full items-stretch ${FIELD_BORDER}`}>
          <FormRow label="대표이미지 업로드">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center justify-center gap-8 rounded-8 border border-gray-500 p-16">
                <img src={uploadIcon} alt="" className="h-[20px] w-[29px]" />
                <span className="text-m-14 text-gray-500">{fileName || '파일을 선택해주세요'}</span>
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
                onClick={onFileClear}
                className="flex h-32 items-center rounded-8 border border-error px-16 text-m-14 text-error"
              >
                삭제
              </button>
            </div>
          </FormRow>
        </div>

        <div className="flex w-full items-stretch">
          <FormRow label="프로젝트 설명">
            <textarea
              value={values.description}
              onChange={(event) => onFieldChange('description', event.target.value)}
              placeholder="프로젝트를 설명해주세요"
              rows={6}
              className="w-full rounded-8 border border-gray-500 px-16 py-8 text-m-14 text-black placeholder:text-gray-500"
            />
          </FormRow>
        </div>
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
    </form>
  )
}
