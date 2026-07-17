import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project, ProjectFormValues } from '@types'

const EMPTY_VALUES: ProjectFormValues = {
  name: '',
  cohort: '',
  category: '',
  startDate: '',
  endDate: '',
  githubUrl: '',
  projectUrl: '',
  participants: '',
  description: '',
}

function toFormValues(project: Project | undefined): ProjectFormValues {
  if (!project) return EMPTY_VALUES
  return {
    name: project.title,
    cohort: `${project.cohortId}기`,
    category: project.tags.find((tag) => tag === '해커톤' || tag === '아이디어톤') ?? '',
    startDate: `${project.developedYear}.${String(project.developedMonth).padStart(2, '0')}`,
    endDate: `${project.developedYear}.${String(project.developedMonth).padStart(2, '0')}`,
    githubUrl: project.githubUrl,
    projectUrl: project.deployUrl,
    participants: project.participants
      .map((participant) => `${participant.name}(${participant.cohortId}기,${participant.part})`)
      .join(', '),
    description: project.description,
  }
}

// 프로젝트 작성·수정 폼 상태. 백엔드 연동 전이라 저장·삭제는 목록으로 돌아가기만 한다.
export function useProjectForm(project?: Project) {
  const navigate = useNavigate()
  const [values, setValues] = useState<ProjectFormValues>(() => toFormValues(project))
  const [fileName, setFileName] = useState('')

  function setField(field: keyof ProjectFormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/admin/projects')
  }

  function handleDelete() {
    navigate('/admin/projects')
  }

  return {
    values,
    setField,
    handleSubmit,
    handleDelete,
    fileName,
    setFileName,
  }
}
