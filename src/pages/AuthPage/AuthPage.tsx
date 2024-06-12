import { Button, Divider, Typography } from "@mui/material"

import Logo from "../../assets/logo.svg"
import MainCard from "../../components/MainCard"
import AuthLogin from "../authentication/auth-forms/AuthLogin"
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const navigate = useNavigate()

  return (
    <MainCard
      sx={{
        top: "50%",
        left: "50%",
        maxWidth: "300px",
        position: "fixed",
        transform: "translate(-50%, -55%)",
        backgroundColor: "#fff !important",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "inherit",
          marginBottom: 12,
        }}
      >
        <img src={Logo} width={100} />
        <Typography sx={{ textAlign: "center", fontSize: 14, mt: 2 }} variant="overline">
          Розклад
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 2, mt: 1 }} variant="h4">
          Поліський національний <br />
          університет
        </Typography>

        <Divider />

        <AuthLogin />

        <Button variant="outlined" sx={{ minWidth: "100%", mt: 3 }} onClick={() => navigate("/view-schedule")}>
          Переглянути розклад
        </Button>
      </div>
    </MainCard>
  )
}

export { AuthPage }
