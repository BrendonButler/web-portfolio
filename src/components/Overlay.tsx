import '../styles/components.less';
import React from 'react';
import { Theme, ThemeContext } from '../contexts/ThemeProvider';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button id='themeToggle' onClick={toggleTheme}>
      Toggle theme to {theme === Theme.Light ? 'dark' : 'light'}
    </button>
  );
};
