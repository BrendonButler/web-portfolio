import type { MainCardProps } from '../../types/Cards';
import type Project from '../../types/Project';
import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import Card from './Card';

const MainCard = ({ props, project }: { props: MainCardProps; project: Project }) => (
  <Card
    as='section'
    id={'side-card_' + props.id}
    className='project-card main-card'
    body={
      <article>
        {project.readme && (
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.readme}</ReactMarkdown>
        )}
      </article>
    }
  />
);

export default MainCard;
