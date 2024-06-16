import dashboard from "./dashboard"

const menuItems = {
  items: [dashboard],
}

export type MenuItemType = (typeof menuItems.items)[0]

export default menuItems
