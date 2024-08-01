import ProjectLink from './ProjectLink';

export default interface Project {
  projectSlug: string;
  type: string;
  logo: string;
  title: string;
  readme?: string;
  readmeLink?: string;
  shortDescription: string;
  url: string;
  downloads: number;
  license?: ProjectLink;
  developmentStarted?: Date;
  publishedOn?: Date;
  lastUpdated?: Date;
  links?: ProjectLink[];
}
