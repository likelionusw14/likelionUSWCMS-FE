import { COHORT_OPTIONS, PART_OPTIONS } from '@constants'
import { useSignupProfileForm } from '@hooks'
import { SignupProfileForm } from '@organisms'

export function SignupProfilePage() {
  const { values, setField, handleSubmit } = useSignupProfileForm()

  return (
    <SignupProfileForm
      values={values}
      onFieldChange={setField}
      onSubmit={handleSubmit}
      cohortOptions={COHORT_OPTIONS}
      partOptions={PART_OPTIONS}
    />
  )
}
