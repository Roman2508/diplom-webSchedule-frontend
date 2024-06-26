// @ts-nocheck
import { Theme, styled } from "@mui/material/styles"
import { Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Logo from "../../assets/logo.svg"
import { Link } from "react-router-dom"

// ==============================|| DRAWER HEAD ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: open ? "flex-start" : "center",
    paddingLeft: theme.spacing(open ? 3 : 0),
  })
)

interface IDrawerHeaderProps {
  open: boolean
}

const DrawerHeader: React.FC<IDrawerHeaderProps> = ({ open }) => {
  const theme = useTheme()

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* <Logo /> */}

        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "5px", color: "inherit" }}>
          <img src={Logo} width={50} />
          <Typography sx={{ ml: 1 }}>Поліський університет</Typography>
        </Link>
      </Stack>
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
