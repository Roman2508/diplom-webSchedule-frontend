import React from "react"
import { useSelector } from "react-redux"
import { HexColorInput, HexColorPicker } from "react-colorful"
import { MuiColorInput } from "mui-color-input"
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import debounce from "lodash.debounce"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { CustomDatePicker } from "../../components/CustomDatePicker"
import { settingsSelector } from "../../store/settings/settingsSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { updateCallSchedule, updateColors, updateSemesterTerms } from "../../store/settings/settingsAsyncActions"
import AuthRegister from "../authentication/auth-forms/AuthRegister"
import { deleteUser, getUsers } from "../../store/auth/authAsyncActions"
import { authSelector } from "../../store/auth/authSlice"
import { AuthType } from "../../store/auth/authTypes"

const lessons = ["1", "2", "3", "4", "5", "6", "7"] as const

const colorsInitialState = {
  ["Лекції"]: "#fffffff" as string,
  ["Практичні"]: "#fffffff" as string,
  ["Лабораторні"]: "#fffffff" as string,
  ["Семінари"]: "#fffffff" as string,
  ["Екзамен"]: "#fffffff" as string,
} as const

const semesterTermsInitialState = {
  firstSemesterStart: "09.01.2023",
  firstSemesterEnd: "12.24.2023",
  secondSemesterStart: "02.01.2024",
  secondSemesterEnd: "06.30.2024",
}

const callScheduleInitialState = {
  ["1"]: { start: "08:30", end: "09:50" },
  ["2"]: { start: "10:00", end: "11:20" },
  ["3"]: { start: "12:00", end: "13:20" },
  ["4"]: { start: "13:30", end: "14:50" },
  ["5"]: { start: "15:00", end: "16:20" },
  ["6"]: { start: "16:30", end: "17:50" },
  ["7"]: { start: "18:00", end: "19:20" },
}

const SettingsPage = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)
  const { users } = useSelector(authSelector)

  const [activeTab, setActiveTab] = React.useState(0)
  const [isFetching, setIsFetching] = React.useState(false)
  const [colors, setColors] = React.useState(colorsInitialState)
  const [editedUser, setEditedUser] = React.useState<null | AuthType>(null)
  const [callSchedule, setCallSchedule] = React.useState(callScheduleInitialState)
  const [semesterTerms, setSemesterTerms] = React.useState(semesterTermsInitialState)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    if (newValue !== 1) {
      setEditedUser(null)
    }
  }

  const handleChangeEditedUser = (event: SelectChangeEvent) => {
    const id = Number(event.target.value)
    const user = users.find((el) => el.id === id)
    if (user) setEditedUser(user)
  }

  const handleChangeColor = (type: string, newColor: string) => {
    setColors((prev) => ({ ...prev, [type]: newColor }))
  }

  const handleChangeSemesterTerms = (key: keyof typeof semesterTermsInitialState, value: string) => {
    setSemesterTerms((prev) => ({ ...prev, [key]: value }))
  }

  const handleChangeCallSchedule = (key: (typeof lessons)[number], value: "start" | "end", newTime: string) => {
    setCallSchedule((prev) => ({ ...prev, [key]: { ...prev[key], [value]: newTime } }))
  }

  const onDeleteUser = async () => {
    if (!editedUser) return alert("Виберіть користувача, якого потрібно видалити")

    if (window.confirm("Ви дійсно хочете видалити користувача?")) {
      try {
        setIsFetching(true)
        await dispatch(deleteUser(editedUser.id))
        setEditedUser(null)
      } finally {
        setIsFetching(false)
      }
    }
  }

  const fetchColors = async () => {
    try {
      setIsFetching(true)
      const payload = {
        lectures: colors["Лекції"],
        practical: colors["Практичні"],
        laboratory: colors["Лабораторні"],
        seminars: colors["Семінари"],
        exams: colors["Екзамен"],
      }
      await dispatch(updateColors(payload))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchCallSchedule = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateCallSchedule(callSchedule))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchSemesterTerms = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateSemesterTerms(semesterTerms))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (!settings) return
    setColors((prev) => {
      return {
        ...prev,
        ["Лекції"]: settings.colors.lectures,
        ["Практичні"]: settings.colors.practical,
        ["Лабораторні"]: settings.colors.laboratory,
        ["Семінари"]: settings.colors.seminars,
        ["Екзамен"]: settings.colors.exams,
      }
    })
    setSemesterTerms((prev) => ({
      ...prev,
      firstSemesterStart: settings.firstSemesterStart,
      firstSemesterEnd: settings.firstSemesterEnd,
      secondSemesterStart: settings.secondSemesterStart,
      secondSemesterEnd: settings.secondSemesterEnd,
    }))
    setCallSchedule((prev) => ({ ...prev, ...settings.callSchedule }))
  }, [settings])

  React.useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (!settings) return <LoadingSpinner />

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto 40px" }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Налаштування</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", pt: "24px !important" }}>
          <Grid item xs={6} sx={{ mr: 2 }}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Терміни навчання
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Перший семестр
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <CustomDatePicker
                  label="Початок"
                  value={semesterTerms.firstSemesterStart}
                  setValue={(e) => handleChangeSemesterTerms("firstSemesterStart", e)}
                />
                <CustomDatePicker
                  label="Кінець"
                  value={semesterTerms.firstSemesterEnd}
                  setValue={(e) => handleChangeSemesterTerms("firstSemesterEnd", e)}
                />
              </div>

              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Другий семестр
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <CustomDatePicker
                  label="Початок"
                  value={semesterTerms.secondSemesterStart}
                  setValue={(e) => handleChangeSemesterTerms("secondSemesterStart", e)}
                />
                <CustomDatePicker
                  label="Кінець"
                  value={semesterTerms.secondSemesterEnd}
                  setValue={(e) => handleChangeSemesterTerms("secondSemesterEnd", e)}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={isFetching}
                  onClick={fetchSemesterTerms}
                  sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3, maxWidth: "315px" }}
                >
                  {isFetching ? "Завантаження..." : "Зберегти"}
                </Button>
              </div>
            </MainCard>

            <MainCard sx={{ mt: 2, "& .MuiCardContent-root": { px: 1 }, textAlign: "center" }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Налаштування кольорів
              </Typography>

              {(["Лекції", "Практичні", "Лабораторні", "Семінари", "Екзамен"] as const).map((el) => {
                return (
                  <div
                    key={el}
                    style={{
                      gap: "16px",
                      display: "flex",
                      marginBottom: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 1, width: "90px" }}>
                      {el}
                    </Typography>
                    <MuiColorInput value={colors[el]} onChange={(newColor) => handleChangeColor(el, newColor)} />
                  </div>
                )
              })}

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                onClick={fetchColors}
                disabled={isFetching}
                sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3, maxWidth: "370px" }}
              >
                {isFetching ? "Завантаження..." : "Зберегти"}
              </Button>
            </MainCard>
          </Grid>

          <Grid item xs={6}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Розклад дзвінків
              </Typography>

              {lessons.map((el) => {
                return (
                  <div
                    key={el}
                    style={{
                      gap: "16px",
                      display: "flex",
                      marginBottom: "6px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h4" sx={{ textAlign: "center", mt: 1 }}>
                      {el}.
                    </Typography>

                    <CustomDatePicker
                      type="time"
                      label="Початок"
                      value={callSchedule[el].start}
                      setValue={(newTime) => handleChangeCallSchedule(el, "start", newTime)}
                    />
                    <CustomDatePicker
                      type="time"
                      label="Кінець"
                      value={callSchedule[el].end}
                      setValue={(newTime) => handleChangeCallSchedule(el, "end", newTime)}
                    />
                  </div>
                )
              })}

              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={isFetching}
                  onClick={fetchCallSchedule}
                  sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3, maxWidth: "350px" }}
                >
                  {isFetching ? "Завантаження..." : "Зберегти"}
                </Button>
              </div>
            </MainCard>

            <MainCard sx={{ mt: 2, "& .MuiCardContent-root": { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Користувачі
              </Typography>

              <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "center" }}>
                <Tabs value={activeTab} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Створити" />
                  <Tab label="Оновити" />
                  <Tab label="Видалити" />
                </Tabs>
              </Box>
              {activeTab === 0 && <AuthRegister editedUser={null} />}

              {activeTab === 1 && (
                <div>
                  <FormControl fullWidth sx={{ my: 3 }}>
                    <InputLabel id="demo-simple-select-label">Користувачі</InputLabel>
                    <Select
                      label="Користувачі"
                      onChange={handleChangeEditedUser}
                      value={editedUser ? String(editedUser.id) : ""}
                    >
                      {users.map((el) => (
                        <MenuItem value={el.id}>{el.fullName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Divider />

                  <AuthRegister editedUser={editedUser} />
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <FormControl fullWidth sx={{ my: 3 }}>
                    <InputLabel id="demo-simple-select-label">Користувачі</InputLabel>
                    <Select
                      label="Користувачі"
                      onChange={handleChangeEditedUser}
                      value={editedUser ? String(editedUser.id) : ""}
                    >
                      {users.map((el) => (
                        <MenuItem value={el.id}>{el.fullName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Divider />

                  <Button
                    type="submit"
                    color="error"
                    variant="outlined"
                    disabled={isFetching || !editedUser}
                    onClick={onDeleteUser}
                    sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
                  >
                    {!isFetching ? "Видалити" : <CircularProgress size={20} color="secondary" />}
                  </Button>
                </div>
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export { SettingsPage }
