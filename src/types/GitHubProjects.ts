import Project, { ProjectImage, ProjectLink, ProjectType } from './Project';

interface OwnerResponse {
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface Owner {
  name: string;
  avatar: ProjectImage;
  url: string;
}

interface LicenseResponse {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface License {
  name: string;
  shortHand: string;
  url: string;
}

interface GitHubRepositoryResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: OwnerResponse;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: LicenseResponse;
  topics: string[];
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  subscribers_count: number;
}

export interface GitHubRepository {
  title: string;
  description: string;
  url: ProjectLink;
  created: Date;
  updated: Date;
  lastPushed: Date;
  stargazers: number;
  watchers: number;
  language: string;
  license: License;
  tags: string[];
  forks: number;
  openIssues: number;
  subscribers: number;
}

interface GitHubProjectProps {
  owner: string;
  projectSlug: string;
  branch?: string;
}

const gitHubLink: string = 'https://github.com';
const rawUserContentLink: string = 'https://raw.githubusercontent.com';
const apiGitHubLink: string = 'https://api.github.com/repos';

class GitHubProject implements Project, GitHubProjectProps {
  owner: string;
  projectSlug: string;
  branch: string;
  downloads: number;
  logo: string;
  shortDescription: string;
  title: string;
  type: ProjectType;
  url: string;

  constructor(project: Project) {
    this.owner = project.owner;
    this.projectSlug = project.projectSlug;
    this.branch = project.branch || 'main';
    this.downloads = project.downloads;
    this.logo = project.logo;
    this.shortDescription = project.shortDescription;
    this.title = project.title || project.projectSlug;
    this.type = project.type;
    this.url = project.url;
  }

  getProjectLink(): string {
    return `${gitHubLink}/${this.owner}/${this.projectSlug}`;
  }

  getProjectBranchLink(): string {
    return `${this.getProjectLink()}/blob/${this.branch}`;
  }

  getRawUserContentLink(): string {
    return `${rawUserContentLink}/${this.owner}/${this.projectSlug}/${this.branch}`;
  }

  async fetchProjectFile(fileOrPath: string): Promise<any> {
    return fetch(`${this.getRawUserContentLink()}/${fileOrPath}`)
      .then((response: Response) => response.text())
      .then((data: string) => data);
  }

  async fetchGitHubRepository(): Promise<GitHubRepository | null> {
    return fetch(`${apiGitHubLink}/${this.owner}/${this.projectSlug}`)
      .then((response: Response) => response.json())
      .then((data: GitHubRepositoryResponse) => {
        const license: License = {
          name: data.license.name,
          shortHand: data.license.spdx_id,
          url: `${this.getProjectBranchLink()}/LICENSE`
        };
        const owner: Owner = {
          name: data.owner.login,
          avatar: {
            source: data.owner.avatar_url,
            alt: data.owner.login,
            title: data.owner.login
          },
          url: data.owner.html_url
        };
        return {
          title: data.name,
          description: data.description,
          owner: owner,
          url: { id: data.html_url, url: data.html_url, text: data.name },
          created: new Date(data.created_at),
          updated: new Date(data.updated_at),
          lastPushed: new Date(data.pushed_at),
          stargazers: data.stargazers_count,
          watchers: data.watchers_count,
          language: data.language,
          license: license,
          tags: data.topics,
          forks: data.forks_count,
          openIssues: data.open_issues,
          subscribers: data.subscribers_count
        };
      })
      .catch((error): null => {
        console.error('Error:', error);
        return null;
      });
  }
}

export default GitHubProject;
