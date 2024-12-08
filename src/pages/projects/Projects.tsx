import '../../styles/projects.less';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Project from '../../types/Project';
import GitHubProject from '../../types/GitHubProjects';
import PreviewCard from '../../components/cards/PreviewCard';
import ProjectDetails from './ProjectDetails';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('./assets/projects.json')
      .then((response) => response.json())
      .then((data: Project[]) => {
        return Promise.all(
          data.map(async (project) => {
            if (project.type === 'GITHUB') {
              const gitHubProject = new GitHubProject(project);
              const repository = await gitHubProject.fetchGitHubRepository();
              if (repository) {
                project.gitHubRepository = repository;
                project.title = repository.title;
                return gitHubProject
                  .fetchProjectFile('README.md')
                  .then((readme) => {
                    project.readme = readme;
                    return project;
                  })
                  .catch((error) => {
                    console.error('Error fetching README:', error);
                    return project;
                  });
              }
              return project;
            }
            return Promise.resolve(project);
          })
        );
      })
      .then((updatedProjects) => setProjects(updatedProjects))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const selectProject = useCallback(
    (project: Project | undefined) => {
      setSelectedProject(project);
      const projectSlug = project?.projectSlug;
      const currentSlug = new URLSearchParams(location.search).get('id');
      if (projectSlug !== currentSlug) {
        navigate(projectSlug ? `/projects?id=${projectSlug}` : '/projects', { replace: false });
      }
    },
    [navigate, location.search]
  );

  useEffect(() => {
    const projectSlug = new URLSearchParams(location.search).get('id');
    const project = projects.find((p) => p.projectSlug === projectSlug);
    if (project !== selectedProject) {
      setSelectedProject(project);
    }
  }, [location.search, projects, selectedProject]);

  return selectedProject ? (
    <ProjectDetails project={selectedProject} selectProject={selectProject} />
  ) : (
    <div id='project-list'>
      {projects.map((project, index) => (
        <li
          key={index}
          className='project-minimal'
          id={index === 0 ? 'feature-project' : undefined}
          onClick={() => selectProject(project)}>
          <PreviewCard
            id={project.projectSlug}
            title={project.title}
            projectType={project.type}
            shortDescription={project.shortDescription}
            image={{ source: project.logo, alt: project.title, title: project.title }}
          />
        </li>
      ))}
    </div>
  );
}

export default Projects;
