import { useParams } from 'react-router-dom'
import { useProject } from '@hooks'
import { AdminTopBar, NotFoundPanel, ProjectDetail } from '@organisms'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const { data: project } = useProject(projectId)

  return (
    <>
      <AdminTopBar
        breadcrumb={[
          { label: '홈', to: '/admin' },
          { label: '프로젝트 관리', to: '/admin/projects' },
          { label: '프로젝트 상세' },
        ]}
        title="프로젝트 상세"
      />
      {project ? <ProjectDetail project={project} /> : <NotFoundPanel />}
    </>
  )
}
