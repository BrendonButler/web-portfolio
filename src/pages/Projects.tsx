import React, { useCallback, useMemo } from 'react';
import '../styles/projects.less';
import {useLocation, useNavigate} from 'react-router-dom';
import {PreviewCard, HeaderCard, MainCard, SideCard} from "../components/ProjectInfoCard";

export interface Project {
  projectSlug: string;
  type: string;
  logo: string;
  title: string;
  readme?: string;
  readmeLink?: string;
  shortDescription: string;
  url: string;
  downloads: number;
  license?: Link;
  developmentStarted?: Date;
  publishedOn?: Date;
  lastUpdated?: Date;
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
      type: 'software',
      logo: 'https://hangarcdn.papermc.io/avatars/project/1237.webp?v=1',
      title: 'Shops (Spigot/Paper)',
      readmeLink: 'https://raw.githubusercontent.com/BrendonButler/Shops/develop/README.md',
      shortDescription: 'This is a description of project 1.',
      url: 'https://hangar.papermc.io/chalk/Shops',
      downloads: 100,
      links: [
        {id: 'latest-download', url: 'https://www.curseforge.com/minecraft/bukkit-plugins/command-shops', text: 'Latest (Spigot)', version: '1.0.0'},
        {id: 'curseforge', url: 'https://www.curseforge.com/minecraft/bukkit-plugins/command-shops', text: 'CurseForge (Spigot)', version: '1.0.0'},
        {id: 'hangar', url: 'https://hangar.papermc.io/chalk/Shops', text: 'Hangar (PaperMC)', version: '1.0.0'},
        {id: 'github', url: 'https://www.github.com/BrendonButler/Shops', text: 'GitHub'}
      ],
      license: {id: 'license', url: 'https://github.com/BrendonButler/Shops/blob/develop/LICENSE', text: 'GNU GPLv2'}
    },
    {
      projectSlug: 'project-2',
      type: 'website',
      logo: 'https://www.example.com/project2.png',
      title: 'Project 2',
      readme: 'This is a description of project 2.',
      shortDescription: 'This is a description of project 2.',
      url: 'https://www.example.com/project2',
      downloads: 200
    },
    {
      projectSlug: 'project-3',
      type: 'video',
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
              readme = {selectedProject?.readme}
              readmeLink = {selectedProject?.readmeLink}
              shortDescription = {selectedProject.shortDescription}
              image = {{source: selectedProject.logo, alt: selectedProject.title, title: selectedProject.title}}
              links = {selectedProject.links}
          />

          <aside id='side-cards'>
            <SideCard title={"Project Info"}>
              <table>
                <tbody>
                {selectedProject.downloads && <tr>
                  <td><strong>Downloads</strong></td>
                  <td>{selectedProject.downloads}</td>
                </tr>}
                {selectedProject.license && <tr>
                  <td><strong>License</strong></td>
                  <td><a href={selectedProject.license.url} title={selectedProject.license.id} target='_blank' rel='noopener noreferrer'>{selectedProject.license.text}</a></td>
                </tr>}
                </tbody>
              </table>
            </SideCard>

            {selectedProject.links && <SideCard title={"Additional Links"}>
              <ul>
                {selectedProject.links
                    ?.filter((link: Link) => link.id !== 'latest-download')
                    .map((link: Link, index: number) => (
                        <li key={index}><a href={link.url} target='_blank' rel='noopener noreferrer'>{link.text || link.id}</a></li>
                    ))}
              </ul>
            </SideCard>}
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