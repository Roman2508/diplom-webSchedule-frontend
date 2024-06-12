import { Outlet } from "react-router-dom"

import "./minimal-layout.css"
import Logo from "../../assets/logo.svg"

const MinimalLayout = () => (
  <div className="blur-wrapper">
    <div className="blur-logo-bg">
      <img src={Logo} />
    </div>

    <Outlet />
  </div>
)

export default MinimalLayout
