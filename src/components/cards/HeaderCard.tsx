import { HeaderCardProps } from './Cards';

const HeaderCard = ({ props, selectProject, children }: {
  props: HeaderCardProps,
  selectProject: (project: undefined) => void,
  children?: React.ReactNode
}) => {
  return (
      <article id={props.id} className="project-card header-card">
        {props.image && (
            <img src={props.image.source} alt={props.image.alt} title={props.image.title} />
        )}
        <div className={'project-card-info'}>
          <div className={'project-card-title'}>
          <span id={'back-button'} onClick={() => selectProject(undefined)}>
            ..
          </span>
            {props.title && <h2>{props.title}</h2>}
          </div>
          {props.shortDescription && <p>{props.shortDescription}</p>}
        </div>
        {children && children}
      </article>
  )
}

export default HeaderCard;