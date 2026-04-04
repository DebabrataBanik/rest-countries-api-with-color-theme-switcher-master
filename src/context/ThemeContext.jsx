import { useState, useLayoutEffect, createContext, useContext } from "react";

const ThemeContext = createContext()

export const useTheme = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) => {

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if(saved) return saved === 'dark'
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  })

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
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