import { useState, useEffect, createContext, useContext } from "react";

const ThemeContext = createContext()

export const useTheme = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) => {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
  
}