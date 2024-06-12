import React from "react"
import { useNavigate } from "react-router-dom"
import { Paper, Divider, Typography, Button } from "@mui/material"

import Logo from "../../assets/logo.svg"
import "../ViewTimetablePage/view-timetable-page.css"

const DefaultPage = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = window.localStorage.getItem("webSchedule-token")
    if (token) navigate("/groups")
  }, [])

  return (
    <Paper
      className="view-timetable-container"
      sx={{ position: "fixed !important", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="view-timetable-inner">
        <img src={Logo} width={100} />
        <Typography sx={{ textAlign: "center", fontSize: 14, mt: 2 }} variant="overline">
          Розклад
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 2, mt: 1 }} variant="h4">
          Поліський національний університет
        </Typography>

        <Divider />

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 15 }}>
          <Button variant="outlined" sx={{ minWidth: "300px" }} onClick={() => navigate("/auth")}>
            Авторизуватись
          </Button>
          <Button variant="outlined" sx={{ minWidth: "300px" }} onClick={() => navigate("/view-schedule")}>
            Переглянути розклад
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export { DefaultPage }
