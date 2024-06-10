import {
  Box,
  Grid,
  List,
  Paper,
  Stack,
  Popper,
  Avatar,
  Tooltip,
  Typography,
  ButtonBase,
  IconButton,
  CardContent,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ClickAwayListener,
} from "@mui/material"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import { LogoutOutlined } from "@ant-design/icons"
import { useAppDispatch } from "../../../../../store/store"
import { authSelector, logout } from "../../../../../store/auth/authSlice"

import MainCard from "../../../../../components/MainCard"
import Transitions from "../../../../../components/@extended/Transitions"

const Profile = () => {
  const theme = useTheme()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)

  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    /* @ts-ignore */
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const onLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти з акаунта?")) {
      dispatch(logout())
      navigate("/auth")
    }
  }

  const iconBackColorOpen = "grey.300"

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
          <Typography variant="subtitle1">{auth ? auth.fullName : ""}</Typography>
        </Stack>
      </ButtonBase>

      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  /* @ts-ignore */
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
                            <Stack>
                              <Typography variant="subtitle1">{auth ? auth.fullName : ""}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {auth ? auth.email : ""}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Вийти з акаунта">
                            <IconButton size="large" color="secondary" onClick={onLogout}>
                              <LogoutOutlined />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <List
                        component="nav"
                        sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32, color: theme.palette.grey[500] } }}
                      >
                        <ListItemButton onClick={onLogout}>
                          <ListItemIcon>
                            <LogoutOutlined />
                          </ListItemIcon>
                          <ListItemText primary="Вийти з акаунта" />
                        </ListItemButton>
                      </List>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  )
}

export default Profile
