import React from "react"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import Calendar from "../../components/TimetablePage/Calendar"
import { customDayjs } from "../../components/Calendar/Calendar"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { settingsSelector } from "../../store/settings/settingsSlice"
import LessonsTable from "../../components/TimetablePage/LessonsTable"
import { clearGroupOverlay } from "../../store/scheduleLessons/scheduleLessonsSlice"
import { TimetablePageHeader } from "../../components/TimetablePage/TimetablePageHeader"
import { CopyTheScheduleModal } from "../../components/TimetablePage/CopyTheScheduleModal"
import { getLastSelectedDataToLocalStorage } from "../../utils/getLastSelectedDataToLocalStorage"
import { authSelector } from "../../store/auth/authSlice"
import { useNavigate } from "react-router-dom"

export interface ISelectedLesson {
  id: number
  name: string
  students: number
  totalHours: number
  teacher: TeachersType
  group: { id: number; name: string }
  type: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД"
}

const TimetablePage = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { auth } = useSelector(authSelector)
  const { settings } = useSelector(settingsSelector)

  const [weeksCount, setWeeksCount] = React.useState(0)
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(1)
  const [selectedSemester, setSelectedSemester] = React.useState<1 | 2>(1)
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<null | number>(null)
  const [selectedAuditoryId, setSelectedAuditoryId] = React.useState<number | null>(null)
  const [isPossibleToCreateLessons, setIsPossibleToCreateLessons] = React.useState(true)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
  const [copyTheScheduleModalVisible, setCopyTheScheduleModalVisible] = React.useState(false)
  const [scheduleType, setScheduleType] = React.useState<"group" | "teacher" | "auditory">("group")

  React.useEffect(() => {
    if (!auth) return

    if (auth.access === "deans_office" || auth.access === "department_chair") {
      navigate("/load")
    }
  }, [auth])

  // set weeks count in current semester
  React.useEffect(() => {
    if (!settings) return
    const { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd } = settings
    const { lastOpenedSemester } = getLastSelectedDataToLocalStorage()

    if (!lastOpenedSemester || lastOpenedSemester === 1) {
      const endDate = customDayjs(firstSemesterEnd)
      const weeksCount = endDate.diff(firstSemesterStart, "week", true)
      const roundedUp = Math.ceil(weeksCount)
      setWeeksCount(roundedUp + 1)
      setSelectedSemester(1)
      return
    }

    if (lastOpenedSemester === 2) {
      const endDate = customDayjs(secondSemesterEnd)
      const weeksCount = endDate.diff(secondSemesterStart, "week", true)
      const roundedUp = Math.ceil(weeksCount)
      setWeeksCount(roundedUp + 1)
      setSelectedSemester(lastOpenedSemester)
    }
  }, [settings, selectedSemester])

  React.useEffect(() => {
    if (!selectedLesson) return
    dispatch(clearGroupOverlay())
  }, [selectedLesson])

  return (
    <>
      <CopyTheScheduleModal
        settings={settings}
        groupId={selectedItemId}
        open={copyTheScheduleModalVisible}
        selectedSemester={selectedSemester}
        setOpen={setCopyTheScheduleModalVisible}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
        <Grid item xs={12}>
          <TimetablePageHeader
            weeksCount={weeksCount}
            scheduleType={scheduleType}
            selectedItemId={selectedItemId}
            setScheduleType={setScheduleType}
            selectedSemester={selectedSemester}
            setSelectedItemId={setSelectedItemId}
            currentWeekNumber={currentWeekNumber}
            setSelectedSemester={setSelectedSemester}
            setCurrentWeekNumber={setCurrentWeekNumber}
            setSelectedAuditoryId={setSelectedAuditoryId}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", pt: "24px !important" }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ pb: 0, "& .MuiCardContent-root": { p: "0 !important", overflow: "auto" } }}>
              <LessonsTable
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
                setSelectedLesson={setSelectedLesson}
                setSelectedTeacherId={setSelectedTeacherId}
                setIsPossibleToCreateLessons={setIsPossibleToCreateLessons}
              />
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Calendar
                weeksCount={weeksCount}
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
                currentWeekNumber={currentWeekNumber}
                selectedTeacherId={selectedTeacherId}
                setSelectedLesson={setSelectedLesson}
                selectedAuditoryId={selectedAuditoryId}
                setCurrentWeekNumber={setCurrentWeekNumber}
                setSelectedAuditoryId={setSelectedAuditoryId}
                isPossibleToCreateLessons={isPossibleToCreateLessons}
                setCopyTheScheduleModalVisible={setCopyTheScheduleModalVisible}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { TimetablePage }
