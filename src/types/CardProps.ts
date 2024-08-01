import ProjectLink from './ProjectLink';
import Image from './ProjectImage';

export default interface CardProps {
  id?: string;
  title?: string;
  readme?: string;
  readmeLink?: string;
  shortDescription?: string;
  image?: Image;
  links?: ProjectLink[];
}
