import type { MainCardProps } from './Cards';
import type { ReactNode } from 'react';
import type Project from '../../types/Project';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';

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
