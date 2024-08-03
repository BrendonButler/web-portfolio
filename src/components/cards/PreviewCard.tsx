import { PreviewCardProps } from './Cards';

const PreviewCard = (props: PreviewCardProps ) => {
  return (
    <article id={props.id} className="preview-card">
      {props.image && (
        <img src={props.image.source} alt={props.image.alt} title={props.image.title} />
      )}
      <div className="preview-card-info">
        {props.title && <h2>{props.title}</h2>}
        {props.shortDescription && <p>{props.shortDescription}</p>}
      </div>
      { props.children && props.children }
    </article>
  )
}

export default PreviewCard;