import { Input, Select, WindowPanel } from '@atoms'
import { FormField } from '@molecules'
import type { SignupProfileFormProps } from '@types'

// 가입 추가정보 입력 폼 — 이름·학과·학번·기수·파트.
export function SignupProfileForm({
  values,
  onFieldChange,
  onSubmit,
  cohortOptions,
  partOptions,
}: SignupProfileFormProps) {
  return (
    <WindowPanel
      className="w-[993px]"
      bodyClassName="flex h-[574px] flex-col items-center justify-center"
    >
      <form onSubmit={onSubmit} className="flex w-[666px] flex-col items-center gap-24">
        <div className="flex flex-col items-center gap-4 text-center text-black">
          <h1 className="text-h1">LOGIN</h1>
          <p className="text-sm-18">추가정보 입력</p>
        </div>
        <div className="flex flex-col items-center gap-40">
          <div className="flex flex-col gap-12">
            <FormField label="이름" htmlFor="signup-name">
              <Input
                id="signup-name"
                value={values.name}
                onChange={(event) => onFieldChange('name', event.target.value)}
                placeholder="이름을 입력하세요."
                className="w-[320px]"
              />
            </FormField>
            <FormField label="학과" htmlFor="signup-department">
              <Input
                id="signup-department"
                value={values.department}
                onChange={(event) => onFieldChange('department', event.target.value)}
                placeholder="학과를 입력하세요."
                className="w-[320px]"
              />
            </FormField>
            <FormField label="학번" htmlFor="signup-student-id">
              <Input
                id="signup-student-id"
                value={values.studentId}
                onChange={(event) => onFieldChange('studentId', event.target.value)}
                placeholder="학번을 입력하세요."
                className="w-[320px]"
              />
            </FormField>
            <div className="flex items-center gap-16">
              <FormField label="기수" htmlFor="signup-cohort">
                <Select
                  id="signup-cohort"
                  value={values.cohort}
                  onChange={(event) => onFieldChange('cohort', event.target.value)}
                  options={cohortOptions}
                  placeholder="기수"
                  className="w-[128px]"
                />
              </FormField>
              <FormField label="파트" htmlFor="signup-part">
                <Select
                  id="signup-part"
                  value={values.part}
                  onChange={(event) => onFieldChange('part', event.target.value)}
                  options={partOptions}
                  placeholder="파트"
                  className="w-[128px]"
                />
              </FormField>
            </div>
          </div>
          {/* Button atom 은 기존(구 디자인) 치수를 갖고 있어 여기서는 디자인 값으로 직접 그린다. */}
          <button
            type="submit"
            className="flex h-48 min-w-[128px] items-center justify-center rounded-8 bg-primary px-32 text-sm-18 text-white"
          >
            저장
          </button>
        </div>
      </form>
    </WindowPanel>
  )
}
