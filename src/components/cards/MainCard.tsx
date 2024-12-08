import { MainCardProps } from './Cards';
import { ReactNode } from 'react';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import Project from '../../types/Project';

const MainCard = ({
  props,
  project,
  children
}: {
  props: MainCardProps;
  project: Project;
  children?: ReactNode;
}) => (
  <section id={props.id} className='project-card main-card'>
    <article>
      {project.readme && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.readme}</ReactMarkdown>
      )}
    </article>
  </section>
);

export default MainCard;
