import { ReactNode } from 'react';
import { ProjectImage, ProjectLink, ProjectType } from '../../types/Project';
import Button from '../../types/Buttons';

interface CardProps {
  id: string;
  title?: string;
  children?: ReactNode;
}

export interface PreviewCardProps extends CardProps {
  projectType: ProjectType;
  image?: ProjectImage;
  shortDescription?: string;
  downloadButton?: Button;
}

export interface HeaderCardProps extends CardProps {
  image?: ProjectImage;
  shortDescription?: string;
  downloadButton?: Button;
}

export interface MainCardProps extends CardProps {
  image?: ProjectImage;
  readme?: string;
  readmeLink?: ProjectLink;
}

export interface SideCardProps extends CardProps {}
