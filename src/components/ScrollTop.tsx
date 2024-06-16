// @ts-nocheck

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const ScrollTop: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [pathname])

  return children || null
}

ScrollTop.propTypes = {
  children: PropTypes.node,
}

export default ScrollTop
