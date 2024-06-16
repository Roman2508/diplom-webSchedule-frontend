import SimpleBar from "../third-party/SimpleBar"
import { Navigation } from "../Navigation/Navigation"

const DrawerContent = () => {
  return (
    <SimpleBar
      sx={{
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Navigation />
    </SimpleBar>
  )
}

export default DrawerContent
