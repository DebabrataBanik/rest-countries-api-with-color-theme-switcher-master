import { useState, useEffect } from "react";

export default function useNavigation(){
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePathChange)
    return () => window.removeEventListener('popstate', handlePathChange)
  }, [])

  const navigate = (url) => {
    window.history.pushState({}, '', url)
    // trigger popstate so other hook instances update their state
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return { currentPath, navigate }
}