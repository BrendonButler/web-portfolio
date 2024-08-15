import React from 'react';
import Project, { ProjectLink } from '../../types/Project';
import MainCard from '../../components/cards/MainCard';
import HeaderCard from '../../components/cards/HeaderCard';
import Button from '../../types/Buttons';
import DownloadButton from '../../components/buttons/DownloadButton';
import SideCard from '../../components/cards/SideCard';
import { GitHubRepoDetailsSideCard } from '../../components/cards/GitHubCards';

function ProjectDetails({
  project,
  selectProject
}: {
  project: Project;
  selectProject: (project: Project | undefined) => void;
}) {
  const downloadLink: ProjectLink | undefined = project.links?.find(
    (link: ProjectLink): boolean => link.id === 'latest-download'
  );
  const downloadButton: Button | undefined = downloadLink && {
    id: downloadLink.id,
    class: 'latest-download',
    text: downloadLink.text || 'Download',
    subText: downloadLink.version,
    tooltip: 'Download the latest version',
    active: true,
    onClick: () => window.open(downloadLink.url, '_blank', 'noopener noreferrer')
  };

  return (
    <div id='project'>
      <HeaderCard
        props={{
          id: project.projectSlug,
          image: {
            source: project.logo,
            alt: project.title,
            title: project.title
          },
          title: project.title,
          shortDescription: project.shortDescription
        }}
        selectProject={selectProject}>
        {downloadButton && (
          <div className={'project-card-links'}>
            <DownloadButton button={downloadButton} />
          </div>
        )}
      </HeaderCard>

      <div id={'project-panel'}>
        <MainCard
          props={{
            id: project.projectSlug,
            title: project.title,
            readme: project?.readme
          }}
          project={project}
        />

        <aside className='side-cards'>
          {project.gitHubRepository && (
            <GitHubRepoDetailsSideCard
              props={{
                id: project.projectSlug,
                repository: project.gitHubRepository
              }}
            />
          )}

          {project.links && (
            <SideCard
              props={{
                id: project.projectSlug,
                title: 'Additional Links'
              }}>
              <ul>
                {project.links
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
  );
}

export default ProjectDetails;
