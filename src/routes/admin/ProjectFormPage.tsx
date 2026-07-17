import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { COHORT_OPTIONS, PROJECT_CATEGORY_OPTIONS } from '@constants'
import { useProject, useProjectForm } from '@hooks'
import { ConfirmDialog, ResultDialog } from '@molecules'
import { ProjectForm } from '@organisms'

// 작성(/new)과 수정(/:projectId/edit)을 같은 폼으로 처리한다.
export function ProjectFormPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { data: project } = useProject(projectId)
  const isEdit = Boolean(projectId)
  const { values, setField, handleSubmit, fileName, setFileName } = useProjectForm(project)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  return (
    <>
      <ProjectForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onDelete={isEdit ? () => setConfirmOpen(true) : undefined}
        cohortOptions={COHORT_OPTIONS}
        categoryOptions={PROJECT_CATEGORY_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          setDeleteDoneOpen(true)
        }}
        title="프로젝트 삭제"
        description="해당 프로젝트를 삭제하시겠습니까?"
      />
      <ResultDialog
        open={deleteDoneOpen}
        onConfirm={() => {
          setDeleteDoneOpen(false)
          navigate('/admin/projects')
        }}
        title="삭제 완료"
        description="삭제처리가 완료되었습니다."
        confirmLabel="프로젝트 관리로 이동"
      />
    </>
  )
}
