import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { COHORT_OPTIONS, PROJECT_CATEGORY_OPTIONS } from '@constants'
import { isBackendConnected } from '@config'
import { useDeleteProject, useProject, useProjectForm } from '@hooks'
import { ConfirmDialog, ResultDialog } from '@molecules'
import { ProjectForm } from '@organisms'

// 작성(/new)과 수정(/:projectId/edit)을 같은 폼으로 처리한다.
export function ProjectFormPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { data: project } = useProject(projectId)
  const isEdit = Boolean(projectId)
  const { values, setField, handleSubmit, fileName, selectFile, clearFile } =
    useProjectForm(project)
  const deleteProject = useDeleteProject()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleteDoneOpen, setDeleteDoneOpen] = useState(false)

  async function handleDelete() {
    setConfirmOpen(false)
    // 미연동 데모: 서버 호출 없이 완료 처리. 연동 시에만 삭제 요청을 보낸다.
    if (isBackendConnected && projectId) {
      await deleteProject.mutateAsync(projectId)
    }
    setDeleteDoneOpen(true)
  }

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
        onFileChange={selectFile}
        onFileClear={clearFile}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
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
