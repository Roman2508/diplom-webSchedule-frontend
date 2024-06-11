import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Divider, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { Button, Stack, InputLabel, OutlinedInput, FormHelperText, CircularProgress } from "@mui/material"

import "./view-timetable-page.css"
import { useAppDispatch } from "../../store/store"

const data = [
  {
    id: 1,
    day: "Понеділок",
    date: "01.06.24",
    lessons: [
      { id: 1, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 2, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 3, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
    ],
  },
  {
    id: 1,
    day: "Вівторок",
    date: "01.06.24",
    lessons: [
      { id: 1, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 2, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 3, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
    ],
  },
  {
    id: 1,
    day: "Середа",
    date: "01.06.24",
    lessons: [
      { id: 1, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 2, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
      { id: 3, name: "Інформаційна безпека (Лаб)", auditory: "85а", teacher: "Молодецька К.В" },
    ],
  },
]

const ViewTimetablePage = () => {
  const dispatch = useAppDispatch()

  const [alignment, setAlignment] = React.useState<string | null>("left")

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment)
  }

  const {
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ fullName: string; email: string; password: string }>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<{ fullName: string; email: string; password: string }> = async (data) => {
    try {
      // await dispatch(updateUser({ ...data, access: editedUser.access, id: editedUser.id }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ maxWidth: "900px", justifyContent: "center", p: 0 }}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", gap: 20 }}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => {
                  return (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <InputLabel htmlFor="fullName">Факультет*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        {...field}
                        type="text"
                        id="fullName"
                        name="fullName"
                        sx={{ width: "350px" }}
                        error={Boolean(errors.fullName)}
                      />
                      {errors.fullName && (
                        <FormHelperText error id="helper-text-fullName">
                          {errors.fullName.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => {
                  return (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <InputLabel htmlFor="fullName">Група*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        {...field}
                        type="text"
                        id="fullName"
                        name="fullName"
                        sx={{ width: "350px" }}
                        error={Boolean(errors.fullName)}
                      />
                      {errors.fullName && (
                        <FormHelperText error id="helper-text-fullName">
                          {errors.fullName.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => {
                  return (
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <InputLabel htmlFor="fullName">Викладач*</InputLabel>
                      <OutlinedInput
                        fullWidth
                        {...field}
                        type="text"
                        id="fullName"
                        name="fullName"
                        sx={{ width: "350px" }}
                        error={Boolean(errors.fullName)}
                      />
                      {errors.fullName && (
                        <FormHelperText error id="helper-text-fullName">
                          {errors.fullName.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
              <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                <ToggleButton value="left" aria-label="left aligned" sx={{ padding: "7px 11px" }}>
                  Семестр 1
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered" sx={{ padding: "7px 11px" }}>
                  Семестр 2
                </ToggleButton>
              </ToggleButtonGroup>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ textTransform: "capitalize", p: "7.44px 15px" }}
              >
                {!isSubmitting ? "Показати розклад" : <CircularProgress size={20} color="secondary" />}
              </Button>
            </div>
          </form>

          <Divider sx={{ my: 5 }} />

          <div>
            {data.map((el) => (
              <div className="view-timetable__day-box">
                <Typography>
                  {el.day} ({el.date})
                </Typography>

                {el.lessons.map((lesson) => (
                  <div className="view-timetable__lesson-box">
                    <div className="view-timetable__lesson-number">1</div>
                    <div className="view-timetable__lesson-call">08:30 - 09:50</div>
                    <div className="view-timetable__lesson-details">
                      {lesson.name}
                      <br />
                      {lesson.auditory}
                      <br />
                      {lesson.teacher}
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export { ViewTimetablePage }
