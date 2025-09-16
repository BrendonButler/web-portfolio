import type { SideCardProps } from '../../types/Cards';
import Card from './Card';

const SideCard = ({ props, children }: { props: SideCardProps; children?: React.ReactNode }) => {
  return (
    <Card
      as='section'
      className='project-card side-card'
      id={'side-card_' + props.id}
      header={props.title && props.title}
      body={children && children}
    />
  );
};

export default SideCard;
