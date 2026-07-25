import { useParams } from 'react-router-dom'
import { useProject } from '@hooks'
import { NotFoundPanel, ProjectDetail } from '@organisms'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const { data: project } = useProject(projectId)

  return (
    <div className="px-24 pb-[90px] pt-32 sm:pb-[120px] lg:pb-[180px]">
      {project ? <ProjectDetail project={project} /> : <NotFoundPanel />}
    </div>
  )
}
