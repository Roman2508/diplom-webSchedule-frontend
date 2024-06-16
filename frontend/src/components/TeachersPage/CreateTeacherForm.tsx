// material-ui
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText } from "@mui/material"

// project import
import React from "react"
import { useSelector } from "react-redux"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { createTeacher, updateTeacher } from "../../store/teachers/teachersAsyncActions"

interface IAuditoriesFields {
  firstName: string
  middleName: string
  lastName: string
  category: number
}

interface ICreateTeacherFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingTeacher: TeachersType | null
}

const CreateTeacherForm: React.FC<ICreateTeacherFormProps> = ({
  isOpenInModal,
  editingTeacher,
  handleClose = () => {},
}) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IAuditoriesFields>({
    mode: "onBlur",
    defaultValues: editingTeacher ? { ...editingTeacher, category: editingTeacher.category.id } : {},
  })

  const onSubmit: SubmitHandler<IAuditoriesFields> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (isOpenInModal) {
        if (!editingTeacher) return
        await dispatch(updateTeacher({ ...data, id: editingTeacher.id }))
        handleClose()
        reset({ firstName: "", lastName: "", middleName: "" })
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createTeacher(data))
        reset({ firstName: "", lastName: "", middleName: "" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={
          isOpenInModal
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "0 20px",
              }
            : {}
        }
      >
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Вкажіть прізвище викладача" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="lastName">Прізвище*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="lastName"
                  type="lastName"
                  name="lastName"
                  placeholder="Прізвище"
                  error={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <FormHelperText error id="helper-text-lastName">
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Вкажіть ім'я викладача" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="firstName">Ім'я*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="firstName"
                  type="firstname"
                  name="firstName"
                  placeholder="Ім'я"
                  error={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <FormHelperText error id="helper-text-firstName">
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="middleName"
          control={control}
          rules={{ required: "Вкажіть по батькові" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="middleName">По батькові*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="middleName"
                  type="middleName"
                  name="middleName"
                  placeholder="По батькові"
                  error={Boolean(errors.middleName)}
                />
                {errors.middleName && (
                  <FormHelperText error id="helper-text-middleName">
                    {errors.middleName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Виберіть кафедру" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="category">Кафедра*</InputLabel>
                <TextField
                  select
                  fullWidth
                  {...field}
                  id="category"
                  sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                >
                  {(!teachersCategories ? [] : teachersCategories).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>

                {errors.category && (
                  <FormHelperText error id="helper-text-category">
                    {errors.category.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting || !teachersCategories || !teachersCategories.length}
        sx={{
          textTransform: "capitalize",
          width: "100%",
          p: "7.44px 15px",
          mt: 3,
        }}
      >
        {isOpenInModal && !isSubmitting ? "Оновити" : !isSubmitting ? "Створити" : "Завантаження..."}
      </Button>
    </form>
  )
}

export default CreateTeacherForm
