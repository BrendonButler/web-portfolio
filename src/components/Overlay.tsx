import '../styles/components.less';
import React from 'react';
import { Theme, ThemeContext } from '../contexts/ThemeProvider';
import SocialIcon, { SocialIconType } from './socials/SocialIcon';
import githubDark from '../assets/socials/github-mark.svg';
import githubLight from '../assets/socials/github-mark-white.svg';
import linkedIn from '../assets/socials/linkedin.png';
import '@theme-toggles/react/css/Classic.css';
import { Classic } from '@theme-toggles/react';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <Classic
      duration={750}
      reversed
      toggled={theme === Theme.Dark}
      toggle={toggleTheme}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    />
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
  const socialIcon: SocialIconType[] = [
    {
      link: 'https://www.linkedin.com/in/brendon-butler',
      alt: 'LinkedIn',
      lightIcon: linkedIn,
      darkIcon: linkedIn,
      size: socialIconSize
    },
    {
      link: 'https://www.github.com/BrendonButler',
      alt: 'GitHub',
      lightIcon: githubDark,
      darkIcon: githubLight,
      size: socialIconSize
    }
  ];

  return (
    <div id='overlay'>
      <ThemeToggleButton />
      <div id='socials'>
        {socialIcon.map((icon: SocialIconType) => (
          <SocialIcon key={icon.link} {...icon} />
        ))}
      </div>
    </div>
  );
};
