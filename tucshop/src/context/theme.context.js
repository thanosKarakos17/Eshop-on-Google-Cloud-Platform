import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({children}){
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const isSystemThemeDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setDark(isSystemThemeDark === true);
      }, []);

      return(
        <ThemeContext.Provider value={{dark, setDark}}>
            {children}
        </ThemeContext.Provider>
      );
}