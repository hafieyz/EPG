import { createContext, useState } from 'react';

const ThemeContext = createContext(false);

const ThemeProvider = ({ children }) => {
  const [isLight, setLight] = useState(false);
  const toggleTheme = () => setLight(!isLight);

  return <ThemeContext.Provider value={{ isLight, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export { ThemeContext, ThemeProvider };
