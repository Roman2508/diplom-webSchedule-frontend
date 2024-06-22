import React from "react"
import { List } from "@mui/material"
import { useSelector } from "react-redux"

import NavItem from "./NavItem"
import menuItems from "../../menu-items"
import { authSelector } from "../../store/auth/authSlice"

const Navigation: React.FC = () => {
  const { drawerOpen } = useSelector((state: any) => state.menu)
  const { auth } = useSelector(authSelector)

  const [menuList, setMenuList] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!auth) return
    const items = menuItems.items[0].children

    if (auth.access === "admin" || auth.access === "super_admin") {
      setMenuList(items)
      return
    }
    if (auth.access === "deans_office" || auth.access === "department_chair") {
      const departmentItems = items.filter(
        (el) => el.title === "Навчальне навантаження" || el.title === "Розподіл навантаження"
      )
      setMenuList(departmentItems)
    }
  }, [auth])

  return (
    <>
      {[menuList].map((item, index) => (
        <List key={index} sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
          {item.map((menuItem) => (
            <NavItem key={menuItem.id} item={menuItem} level={1} />
          ))}
        </List>
      ))}
    </>
  )
}

export { Navigation }
