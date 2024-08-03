import { MainCardProps } from './Cards';
import { useEffect, useState } from 'react';
import Project, { ProjectType } from '../../types/Project';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import GitHubProject from '../../types/GitHubProjects';

const MainCard = ({ props, project, children }: { props: MainCardProps, project: Project, children?: React.ReactNode }) => {
  const [readme, setReadme] = useState(props.readme ? props.readme : '');
  const gitHubProject = project && props.projectType === ProjectType.GITHUB ? new GitHubProject(project) : undefined;

  useEffect((): void => {
    if (!readme && gitHubProject) {
      gitHubProject.fetchProjectFile('README.md')
        .then((readme: string) => setReadme(readme))
        .catch((error: any) => console.error('Error:', error));
    }
  }, [props?.readme]);

  return (
      <section id={props.id} className="project-card main-card">
        <article>
          {readme && (
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
          )}
        </article>
      </section>
  )
}

export default MainCard;