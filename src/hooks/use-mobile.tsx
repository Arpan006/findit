
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isAndroid, setIsAndroid] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Check if running on mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < MOBILE_BREAKPOINT
      setIsMobile(isMobileDevice)
      
      // Check if on Android
      const userAgent = navigator.userAgent.toLowerCase()
      const isAndroidDevice = userAgent.indexOf("android") > -1
      setIsAndroid(isAndroidDevice)
    }
    
    // Run on mount
    checkMobile()
    
    // Add event listener for window resize
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile()
    }
    
    // Modern event listener approach
    mql.addEventListener("change", onChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return { isMobile, isAndroid }
}

// This function is a wrapper around useIsMobile that returns just the boolean
// for backward compatibility with code that expects just a boolean
export function useIsMobileBoolean(): boolean {
  const { isMobile } = useIsMobile()
  return isMobile
}
