import React, { useEffect } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultTheme: ThemeContextType = {
  theme: Theme.Light,
  toggleTheme: (): void => {}
};

export const ThemeContext = React.createContext<ThemeContextType>(defaultTheme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme.theme);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  };

  useEffect((): void => {
    document.documentElement.dataset.theme = `${theme}`;
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
