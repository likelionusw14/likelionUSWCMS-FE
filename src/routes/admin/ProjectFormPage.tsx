import { useParams } from 'react-router-dom'
import { PROJECT_CATEGORY_OPTIONS } from '@constants'
import { useProject, useProjectForm } from '@hooks'
import { ProjectForm } from '@organisms'

// 작성(/new)과 수정(/:projectId/edit)을 같은 폼으로 처리한다.
export function ProjectFormPage() {
  const { projectId } = useParams()
  const { data: project } = useProject(projectId)
  const isEdit = Boolean(projectId)
  const { values, setField, handleSubmit, handleDelete, fileName, setFileName } =
    useProjectForm(project)


  return (
    <>
      <ProjectForm
        values={values}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onDelete={isEdit ? handleDelete : undefined}
        categoryOptions={PROJECT_CATEGORY_OPTIONS}
        fileName={fileName}
        onFileChange={setFileName}
        onFileClear={() => setFileName('')}
      />
    </>
  )
}
