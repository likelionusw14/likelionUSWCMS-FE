import { SIGNUP_PART_OPTIONS } from '@constants'
import { useSignupProfileForm } from '@hooks'
import { SignupProfileForm } from '@organisms'

export function SignupProfilePage() {
  const { values, setField, handleSubmit, cohortOptions, canSubmit, isSubmitting, error } =
    useSignupProfileForm()

  return (
    <SignupProfileForm
      values={values}
      onFieldChange={setField}
      onSubmit={handleSubmit}
      cohortOptions={cohortOptions}
      partOptions={SIGNUP_PART_OPTIONS}
      canSubmit={canSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  )
}
