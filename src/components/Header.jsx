import { Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const Header = () => {

  const { darkMode, toggleTheme } = useTheme()

  return (
    <header>
      <h1>Where in the world?</h1>

      <button type="button" onClick={toggleTheme} className="toggle">
        <Moon size={13} className={darkMode ? 'filled' : ''} />
        Dark Mode
      </button>
    </header>
  )
}

export default Header