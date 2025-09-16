import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';
import type { ProjectImage, ProjectLink, ProjectType } from './Project';
import type Button from './Buttons';

export type CardElement = 'div' | 'article' | 'section' | 'aside' | 'header' | 'main' | 'footer';

export type CardProps<T extends CardElement = 'div'> = {
  as?: T;
  header?: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export interface PreviewCardProps extends HTMLAttributes<HTMLElement> {
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
