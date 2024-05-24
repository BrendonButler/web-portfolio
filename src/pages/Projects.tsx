import React, { useCallback, useMemo } from 'react';
import '../styles/projects.less';
import {useLocation, useNavigate} from 'react-router-dom';
import {PreviewCard, HeaderCard, MainCard, SideCard} from "../components/ProjectInfoCard";

export interface Project {
  projectSlug: string;
  logo: string;
  title: string;
  // support Markdown for READMEs
  readme: string;
  shortDescription: string;
  url: string;
  downloads: number;
  links?: Link[];
}

export interface Link {
  id: string;
  url: string;
  text?: string;
  version?: string;
}

function Projects() {
  // TODO: Fetch projects from an API or database
  const projects: Project[] = useMemo<Project[]>(() => ([
    {
      projectSlug: 'shops-spigot-plugin',
      logo: 'https://hangarcdn.papermc.io/avatars/project/1237.webp?v=1',
      title: 'Shops (Spigot/Paper)',
      readme: 'Shops is a simple, lightweight, and easy-to-use shop plugin for Spigot and Paper servers.',
      shortDescription: 'This is a description of project 1.',
      url: 'https://hangar.papermc.io/chalk/Shops',
      downloads: 100,
      links: [
        {id: 'latest-download', url: 'https://www.curseforge.com/minecraft/bukkit-plugins/command-shops', text: 'Latest (Spigot)', version: '1.0.0'},
      ]
    },
    {
      projectSlug: 'project-2',
      logo: 'https://www.example.com/project2.png',
      title: 'Project 2',
      readme: 'This is a description of project 2.',
      shortDescription: 'This is a description of project 2.',
      url: 'https://www.example.com/project2',
      downloads: 200
    },
    {
      projectSlug: 'project-3',
      logo: 'https://www.example.com/project3.png',
      title: 'Project 3',
      readme: 'This is a description of project 3.',
      shortDescription: 'This is a description of project 3.',
      url: 'https://www.example.com/project3',
      downloads: 300
    }
  ]), []);

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProject, setProject] = React.useState<Project | undefined>(undefined);

  const selectProject = useCallback((project: Project | undefined) => {
    setProject(project);
    if (project?.projectSlug !== new URLSearchParams(location.search).get('id')) {
      project
          ? navigate(`/projects?id=${project.projectSlug}`, {replace: false})
          : navigate('/projects');
    }
  }, [navigate, location.search]);

  React.useEffect(() => {
    const projectSlug: string | undefined = new URLSearchParams(location.search).get('id') || undefined;
    const project: Project | undefined = projects.find((project: Project) => project.projectSlug === projectSlug);

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

        <div id={"project-panel"}>
          <MainCard
              id = {selectedProject.projectSlug}
              title = {selectedProject.title}
              readme = {selectedProject.readme}
              shortDescription = {selectedProject.shortDescription}
              image = {{source: selectedProject.logo, alt: selectedProject.title, title: selectedProject.title}}
              links = {selectedProject.links}
          />

          <aside id='side-cards'>
            <SideCard title={"Project Info"}>
              <table>
                <tbody>
                <tr>
                  <td><strong>Downloads</strong></td>
                  <td>{selectedProject.downloads}</td>
                </tr>
                <tr>
                  <td><strong>Links</strong></td>
                  <td>
                    {selectedProject.links && selectedProject.links.map((link: Link, index: number) => (
                        <a key={index} id={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text || link.url}
                          {link.version && <span> {link.version}</span>}
                        </a>
                    ))}
                  </td>
                </tr>
                </tbody>
              </table>
            </SideCard>
          </aside>
        </div>
      </div>
  ) : (
      <div id='project-list'>
        {projects.map((project: Project, index: number) => (
            <li key={index} className={'project-minimal'} id={index === 0 ? 'feature-project' : undefined} onClick={() => selectProject(project)}>
              <PreviewCard
                  id={project.projectSlug}
                  title={project.title}
                  shortDescription={project.shortDescription}
                  image={{source: project.logo, alt: project.title, title: project.title}}
                  links={[{id: project.projectSlug, url: project.url}]}
              />
            </li>
        ))}
      </div>
  );
}

export default Projects;