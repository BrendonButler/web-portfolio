import React from 'react';
import '../styles/projects.less';
import { useSearchParams } from 'react-router-dom';

interface Project {
  projectSlug: string;
  logo: string;
  title: string;
  shortDescription: string;
  url: string;
  downloads: number;
}

function Projects() {
  // TODO: Fetch projects from an API or database
  const projects: Project[] = [
    {
      projectSlug: 'shops-spigot-plugin',
      logo: 'https://hangarcdn.papermc.io/avatars/project/1237.webp?v=1',
      title: 'Shops (Spigot/Paper)',
      shortDescription: 'This is a description of project 1.',
      url: 'https://hangar.papermc.io/chalk/Shops',
      downloads: 100
    },
    {
      projectSlug: 'project-2',
      logo: 'https://www.example.com/project2.png',
      title: 'Project 2',
      shortDescription: 'This is a description of project 2.',
      url: 'https://www.example.com/project2',
      downloads: 200
    },
    {
      projectSlug: 'project-3',
      logo: 'https://www.example.com/project3.png',
      title: 'Project 3',
      shortDescription: 'This is a description of project 3.',
      url: 'https://www.example.com/project3',
      downloads: 300
    }
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setProject] = React.useState<Project | undefined>(undefined);

  const selectProject = (project: Project | undefined) => {
    setProject(project);
    setSearchParams(project ? {id: project.projectSlug} : {});
  }

  React.useEffect(() => {
    const projectSlug: string | null = searchParams.get('id');

    if (projectSlug) {
      const project: Project | undefined = projects.find((project: Project) => project.projectSlug === projectSlug);

      if (project) {
        selectProject(project);
      }
    }
  }, [searchParams]);

  return selectedProject ? (
      <div id='project'>
        <button onClick={() => selectProject(undefined)}>&#xab;</button>
        <section id='project-panel'>
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.shortDescription}</p>
        </section>
        <aside id='project-aside'>
          <img src={selectedProject.logo} alt={selectedProject.title} />
          <a href={selectedProject.url} target='_blank' rel='noopener noreferrer'>
            {selectedProject.url}
          </a>
          <span className='downloads'>{selectedProject.downloads} downloads</span>
        </aside>
      </div>
  ) : (
      <div id='project-list'>
        {projects.map((project: Project, index: number) => (
            <li key={index} className='project-minimal' onClick={() => selectProject(project)}>
              <img src={project.logo} alt={project.title} />
              <div className='project-minimal-info'>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <a href={project.url} target='_blank' rel='noopener noreferrer'>
                  {project.url}
                </a>
                <span className='downloads'>{project.downloads} downloads</span>
              </div>
            </li>
        ))}
      </div>
  );
}

export default Projects;