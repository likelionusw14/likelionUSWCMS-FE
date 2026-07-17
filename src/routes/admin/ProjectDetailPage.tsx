import { useParams } from 'react-router-dom'
import { useProject } from '@hooks'
import { NotFoundPanel, ProjectDetail } from '@organisms'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const { data: project } = useProject(projectId)

  return (
    <div className="px-24 pb-[120px] pt-32">
      {project ? <ProjectDetail project={project} /> : <NotFoundPanel />}
    </div>
  )
}
