import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { isBackendConnected } from '@config'
import {
  toCreateProjectRequest,
  toUpdateProjectRequest,
  useCreateProject,
  useEntityForm,
  useUpdateProject,
} from '@hooks'
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

// 엔티티 → 폼 값 매핑. useEntityForm 의 useEffect 재실행을 막기 위해 모듈 상수 함수로 둔다.
function toProjectValues(project: Project | undefined): ProjectFormValues {
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

// 프로젝트 작성·수정 폼 상태 + 저장 배선. 대표이미지 파일명은 엔티티에 없어 하이드레이트하지 않는다.
export function useProjectForm(project?: Project) {
  const navigate = useNavigate()
  const form = useEntityForm<Project, ProjectFormValues>({
    entity: project,
    toValues: toProjectValues,
    redirectTo: '/admin/projects',
  })
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // 백엔드 미연동 데모: 실제 저장 없이 목록으로 돌아간다.
    if (!isBackendConnected) {
      navigate('/admin/projects')
      return
    }

    if (project) {
      // 수정: version 은 낙관적 동시성 토큰으로 필수(useProject 응답의 version).
      await updateProject.mutateAsync({
        projectId: project.id,
        body: toUpdateProjectRequest(form.values, project.version),
      })
      navigate('/admin/projects')
      return
    }

    await createProject.mutateAsync(toCreateProjectRequest(form.values))
    navigate('/admin/projects')
  }

  return { ...form, handleSubmit, createProject, updateProject }
}
