import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/projects.less';
import Project from '../../types/Project';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import PreviewCard from '../../components/cards/PreviewCard';
import ProjectDetails from './ProjectDetails';
import GitHubProject, { GitHubRepository } from '../../types/GitHubProjects';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect((): void => {
    fetch('/projects.json')
      .then((response: Response) => response.json())
      .then((data: Project[]): void => {
        const promises: Promise<Project>[] = data.map(
          async (project: Project): Promise<Project> => {
            if (project.type === 'GITHUB') {
              const gitHubProject: GitHubProject = new GitHubProject(project);
              const repository: GitHubRepository | null =
                await gitHubProject.fetchGitHubRepository();
              if (repository) {
                project.gitHubRepository = repository;
                project.title = repository.title;
                return gitHubProject
                  .fetchProjectFile('README.md')
                  .then((readme: string) => {
                    project.readme = readme;
                    return project;
                  })
                  .catch((error: any) => {
                    console.error('Error:', error);
                    return project;
                  });
              } else {
                return Promise.resolve(project);
              }
            } else {
              return Promise.resolve(project);
            }
          }
        );

        // Wait for all promises to resolve before setting the state
        Promise.all(promises).then((updatedProjects: Project[]) => {
          setProjects(updatedProjects);
        });
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const [selectedProject, setProject] = React.useState<Project | undefined>(undefined);

  const selectProject = useCallback(
    (project: Project | undefined) => {
      setProject(project);
      if (project?.projectSlug !== new URLSearchParams(location.search).get('id')) {
        project
          ? navigate(`/projects?id=${project.projectSlug}`, { replace: false })
          : navigate('/projects');
      }
    },
    [navigate, location.search]
  );

  React.useEffect((): void => {
    const projectSlug: string | undefined =
      new URLSearchParams(location.search).get('id') || undefined;
    const project: Project | undefined = projects.find(
      (project: Project): boolean => project.projectSlug === projectSlug
    );

    if (project !== selectedProject) selectProject(project);
  }, [location.search, projects, selectProject, selectedProject]);

  return selectedProject ? (
    <ProjectDetails project={selectedProject} selectProject={selectProject} />
  ) : (
    <div id='project-list'>
      {projects.map((project: Project, index: number) => (
        <li
          key={index}
          className={'project-minimal'}
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
