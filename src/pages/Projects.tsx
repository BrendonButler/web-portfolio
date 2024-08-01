import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/projects.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { PreviewCard, HeaderCard, MainCard, SideCard } from '../components/ProjectCard';
import Project from '../types/Project';
import ProjectLink from '../types/ProjectLink';

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const navigate = useNavigate();
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
    <div id='project'>
      <HeaderCard
        cardProps={{
          id: selectedProject.projectSlug,
          title: selectedProject.title,
          shortDescription: selectedProject.shortDescription,
          image: {
            source: selectedProject.logo,
            alt: selectedProject.title,
            title: selectedProject.title
          },
          links: selectedProject.links
        }}
        selectProject={selectProject}
      />

      <div id={'project-panel'}>
        <MainCard
          id={selectedProject.projectSlug}
          title={selectedProject.title}
          readme={selectedProject?.readme}
          readmeLink={selectedProject?.readmeLink}
          shortDescription={selectedProject.shortDescription}
          image={{
            source: selectedProject.logo,
            alt: selectedProject.title,
            title: selectedProject.title
          }}
          links={selectedProject.links}
        />

        <aside id='side-cards'>
          <SideCard title={'Project Info'}>
            <table>
              <tbody>
                {selectedProject.downloads && (
                  <tr>
                    <td>
                      <strong>Downloads</strong>
                    </td>
                    <td>{selectedProject.downloads}</td>
                  </tr>
                )}
                {selectedProject.license && (
                  <tr>
                    <td>
                      <strong>License</strong>
                    </td>
                    <td>
                      <a
                        href={selectedProject.license.url}
                        title={selectedProject.license.id}
                        target='_blank'
                        rel='noopener noreferrer'>
                        {selectedProject.license.text}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </SideCard>

          {selectedProject.links && (
            <SideCard title={'Additional Links'}>
              <ul>
                {selectedProject.links
                  ?.filter((link: ProjectLink): boolean => link.id !== 'latest-download')
                  .map((link: ProjectLink, index: number) => (
                    <li key={index}>
                      <a href={link.url} target='_blank' rel='noopener noreferrer'>
                        {link.text || link.id}
                      </a>
                    </li>
                  ))}
              </ul>
            </SideCard>
          )}
        </aside>
      </div>
    </div>
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
            shortDescription={project.shortDescription}
            image={{ source: project.logo, alt: project.title, title: project.title }}
            links={[{ id: project.projectSlug, url: project.url }]}
          />
        </li>
      ))}
    </div>
  );
}

export default Projects;
