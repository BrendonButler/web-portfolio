import { GitHubRepository } from './GitHubProjects';

export enum ProjectType {
  GITHUB = 'GITHUB',
  PHOTO = 'PHOTO',
  VIDEO = 'VIDEO',
  WEBSITE = 'WEBSITE',
  OTHER = 'OTHER'
}

export default interface Project {
  projectSlug: string;
  type: ProjectType;
  logo: string;
  title: string;
  owner: string;
  branch?: string;
  readme?: string;
  shortDescription: string;
  url: string;
  downloads: number;
  license?: ProjectLink;
  developmentStarted?: Date;
  publishedOn?: Date;
  lastUpdated?: Date;
  links?: ProjectLink[];
  gitHubRepository?: GitHubRepository;
}

export interface ProjectImage {
  source: string;
  alt: string;
  title: string;
}

export interface ProjectLink {
  id: string;
  url: string;
  text?: string;
  version?: string;
}
