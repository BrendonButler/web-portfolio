import '../styles/components.less';
import React from 'react';
import { Theme, ThemeContext } from '../contexts/ThemeProvider';
import SocialIcon, { SocialIconType } from './socials/SocialIcon';
import linkedInPath from '../../public/assets/socials/linkedin.png';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button id='theme-toggle' onClick={toggleTheme}>
      {theme !== Theme.Dark ? '🌞' : '🌚'}
    </button>
  );
};

export interface OverlayProps {
  socialIconSize?: number;
}

export const Overlay: React.FC<OverlayProps> = ({
  socialIconSize
}: {
  socialIconSize?: number;
}) => {
  const socialIcons: SocialIconType[] = [
    {
      link: 'https://www.linkedin.com/in/brendon-butler',
      alt: 'LinkedIn',
      lightIcon: linkedInPath,
      darkIcon: linkedInPath,
      size: socialIconSize
    },
    {
      link: 'https://www.github.com/BrendonButler',
      alt: 'GitHub',
      lightIcon: './assets/socials/github-mark.svg',
      darkIcon: './assets/socials/github-mark-white.svg',
      size: socialIconSize
    }
  ];

  return (
    <div id='overlay'>
      <ThemeToggleButton />
      <div id='socials'>
        {socialIcons.map((icon: SocialIconType) => (
          <SocialIcon key={icon.link} {...icon} />
        ))}
      </div>
    </div>
  );
};
