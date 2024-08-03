import Project, { ProjectType } from './Project';

interface GitHubProjectProps {
  owner: string;
  projectSlug: string;
  branch?: string;
}

const rawUserContentLink: string = 'https://raw.githubusercontent.com';

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
    this.title = project.title;
    this.type = project.type;
    this.url = project.url;
  }

  getProjectLink() {
    return `${rawUserContentLink}/${this.owner}/${this.projectSlug}`;
  }

  getProjectBranchLink() {
    return `${this.getProjectLink()}/${this.branch}`;
  }

  async fetchProjectFile(fileOrPath: string): Promise<any> {
    return fetch(`${this.getProjectBranchLink()}/${fileOrPath}`)
      .then(response => response.text())
      .then(data => data);
  }
}

export default GitHubProject;