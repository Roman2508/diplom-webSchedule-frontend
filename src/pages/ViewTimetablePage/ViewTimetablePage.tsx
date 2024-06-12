import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Button, Stack, InputLabel, CircularProgress } from "@mui/material"
import { Grid, Paper, Select, Divider, MenuItem, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material"

import "./view-timetable-page.css"
import Logo from "../../assets/logo.svg"
import { useAppDispatch } from "../../store/store"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupsShortType } from "../../store/groups/groupsTypes"
import { settingsSelector } from "../../store/settings/settingsSlice"
import { getSettings } from "../../store/settings/settingsAsyncActions"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import { getDaysForViewSchedule } from "../../utils/getDaysForViewSchedule"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { viewSchedule } from "../../store/scheduleLessons/scheduleLessonsAsyncActions"
import { TeachersCategoryType, TeachersType } from "../../store/teachers/teachersTypes"
import { scheduleLessonsSelector } from "../../store/scheduleLessons/scheduleLessonsSlice"

const ViewTimetablePage = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)
  const { groupCategories } = useSelector(groupsSelector)
  const { scheduleLessons } = useSelector(scheduleLessonsSelector)

  const [semester, setSemester] = React.useState<"1" | "2">("1")
  const [groups, setGroups] = React.useState<GroupsShortType[]>([])
  const [teachers, setTeachers] = React.useState<TeachersType[]>([])
  const [selectedSchedule, setSelectedSchedule] = React.useState<any>(null)

  const handleSelectSemester = (_: React.MouseEvent<HTMLElement>, newAlignment: "1" | "2") => {
    setSemester(newAlignment)
  }

  const {
    watch,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<{ category: number; group: number; teacher: number }>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<{ category: number; group: number; teacher: number }> = async (data) => {
    try {
      await dispatch(viewSchedule({ group: data.group, teacher: data.teacher, semester: Number(semester) }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeCategory = (categoryId: number): void => {
    if (!groupCategories) return
    const selectedCategory = groupCategories.find((el) => el.id === categoryId)
    if (!selectedCategory) return
    setGroups(selectedCategory.groups)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(getSettings())
      dispatch(getGroupCategories())
      const { payload } = await dispatch(getTeachersCategories())
      const teachers = (payload as TeachersCategoryType[]).map((el) => el.teachers).flat()
      setTeachers(teachers)
    }

    fetchData()
  }, [])

  React.useEffect(() => {
    if (!scheduleLessons) return

    console.log(getDaysForViewSchedule(scheduleLessons))
    setSelectedSchedule(getDaysForViewSchedule(scheduleLessons))
  }, [scheduleLessons])

  return (
    <Paper className="view-timetable-container">
      <Link to="/auth">
        <Button sx={{ position: "absolute", right: 20, top: 40 }} variant="outlined">
          Авторизуватись
        </Button>
      </Link>

      <div className="view-timetable-inner">
        <img src={Logo} width={100} />
        <Typography sx={{ textAlign: "center", fontSize: 14, mt: 2 }} variant="overline">
          Розклад
        </Typography>
        <Typography sx={{ textAlign: "center", mb: 2, mt: 1 }} variant="h4">
          Поліський національний університет
        </Typography>

        <Divider />

        <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="view-timetable__filter-row">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        <InputLabel htmlFor="category">Факультет</InputLabel>
                        <Select
                          fullWidth
                          {...field}
                          type="text"
                          id="category"
                          name="category"
                          onChange={(e) => {
                            field.onChange(e)
                            handleChangeCategory(Number(e.target.value))
                          }}
                          className="view-timetable-select"
                          sx={{ width: "350px" }}
                        >
                          <MenuItem value="0">Всі</MenuItem>
                          {(!groupCategories ? [] : groupCategories).map((category) => (
                            <MenuItem value={category.id}>{category.name}</MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    )
                  }}
                />
                <Controller
                  name="group"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        <InputLabel htmlFor="group">Група</InputLabel>
                        <Select
                          fullWidth
                          {...field}
                          type="text"
                          id="group"
                          name="group"
                          className="view-timetable-select"
                          sx={{ width: "350px" }}
                        >
                          <MenuItem value="0">Всі</MenuItem>
                          {groups.map((group) => (
                            <MenuItem value={group.id}>{group.name}</MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    )
                  }}
                />
              </div>

              <div className="view-timetable__filter-row" style={{ alignItems: "flex-end" }}>
                <Controller
                  name="teacher"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        <InputLabel htmlFor="teacher">Викладач</InputLabel>
                        <Select
                          fullWidth
                          {...field}
                          type="text"
                          id="teacher"
                          name="teacher"
                          sx={{ width: "350px" }}
                          value={watch("teacher")}
                          className="view-timetable-select"
                        >
                          {/* <MenuItem value={teacher.id}>{getLastnameAndInitials(teacher)}</MenuItem> */}
                          <MenuItem value="0">Всі</MenuItem>
                          {teachers.map((teacher) => (
                            <MenuItem
                              value={teacher.id}
                            >{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</MenuItem>
                          ))}
                        </Select>
                      </Stack>
                    )
                  }}
                />
                <ToggleButtonGroup value={semester} exclusive onChange={handleSelectSemester}>
                  <ToggleButton value="1" className="view-timetable__filter-semester">
                    Семестр 1
                  </ToggleButton>
                  <ToggleButton value="2" className="view-timetable__filter-semester">
                    Семестр 2
                  </ToggleButton>
                </ToggleButtonGroup>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className="view-timetable__filter-button"
                  disabled={(!watch("group") && !watch("teacher")) || isSubmitting}
                  sx={{ textTransform: "capitalize", p: "7.44px 15px", mt: 3, width: "155px" }}
                >
                  {!isSubmitting ? "Показати розклад" : <CircularProgress size={20} color="secondary" />}
                </Button>
              </div>
            </form>

            <Divider sx={{ my: 5 }} />

            <div>
              {(selectedSchedule ? selectedSchedule : []).map((el: any) => (
                <div key={el.date} className="view-timetable__day-box">
                  <Typography>
                    {el.dayName} ({el.date})
                  </Typography>

                  {el.lessons.map((lesson: any) => {
                    const lessonCall = settings
                      ? // @ts-ignore
                        settings.callSchedule[String(lesson.lessonNumber)]
                      : { start: "", end: "" }

                    return (
                      <div className="view-timetable__lesson-box" key={lesson.lessonNumber}>
                        <div className="view-timetable__lesson-number">{lesson.lessonNumber}</div>
                        <div className="view-timetable__lesson-call">
                          <p style={{ margin: 0 }}>
                            {lessonCall.start} - {lessonCall.end}
                          </p>
                        </div>
                        <div className="view-timetable__lesson-details">
                          {lesson.name} | {lesson.group.name}
                          <br />
                          {lesson.auditory ? `Аудиторія: ${lesson.auditory.name}` : "Дистанційно"}
                          <br />
                          Викладач {getLastnameAndInitials(lesson.teacher)}
                          <br />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export { ViewTimetablePage }
