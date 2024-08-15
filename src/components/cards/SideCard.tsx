import { SideCardProps } from './Cards';

const SideCard = ({ props, children }: { props: SideCardProps; children?: React.ReactNode }) => {
  return (
    <section className='project-card side-card' id={'side-card_' + props.id}>
      {props.title && <h3>{props.title}</h3>}
      {children && children}
    </section>
  );
};

export default SideCard;
