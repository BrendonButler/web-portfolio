import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/projects.less';
import Project from '../../types/Project'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import PreviewCard from '../../components/cards/PreviewCard';
import ProjectDetails from './ProjectDetails';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/projects.json')
        .then((response) => response.json())
        .then((data) => setProjects(data))
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

  React.useEffect(() => {
    const projectSlug: string | undefined =
        new URLSearchParams(location.search).get('id') || undefined;
    const project: Project | undefined = projects.find(
        (project: Project) => project.projectSlug === projectSlug
    );

    if (project !== selectedProject) selectProject(project);
  }, [location.search, projects, selectProject, selectedProject]);

  return selectedProject ? (
      <ProjectDetails
          project={selectedProject}
          selectProject={selectProject}
        />
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
                projectType={project.type}
                title={project.title}
                shortDescription={project.shortDescription}
                image={{ source: project.logo, alt: project.title, title: project.title }}
              />
            </li>
        ))}
      </div>
  );
}

export default Projects;