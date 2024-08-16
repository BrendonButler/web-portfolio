import React from 'react';
import { Theme, ThemeContext } from '../../contexts/ThemeProvider';

export interface SocialIconType {
  link: string;
  alt: string;
  lightIcon: string;
  darkIcon: string;
  size?: number;
}

const SocialIcon: React.FC<SocialIconType> = ({
  link,
  alt,
  lightIcon,
  darkIcon,
  size
}: {
  link: string;
  alt: string;
  lightIcon: string;
  darkIcon: string;
  size?: number;
}) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      <img src={theme === Theme.Dark ? lightIcon : darkIcon} alt={alt} width={size} />
    </a>
  );
};

export default SocialIcon;
