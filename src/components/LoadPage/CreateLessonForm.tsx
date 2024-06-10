import {
  Grid,
  Stack,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  Autocomplete,
  OutlinedInput,
  FormHelperText,
} from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

// project import
import { useAppDispatch } from "../../store/store"
import { GroupLessonsType } from "../../store/groups/groupsTypes"
import { autocompleteLessonsData } from "./autocompleteLessonsData"
import {
  createGroupLoadLesson,
  deleteGroupLoadLesson,
  updateGroupLoadLesson,
} from "../../store/groups/groupsAsyncActions"

interface ICreateLessonFormProps {
  selectedGroupId?: number
  editableLesson: GroupLessonsType | null
  setEditableLesson: Dispatch<SetStateAction<GroupLessonsType | null>>
}

interface ICreateLessonFields {
  name: string
  type: string
  hours: number
  semester: number
}

const CreateLessonForm: React.FC<ICreateLessonFormProps> = ({ selectedGroupId, editableLesson, setEditableLesson }) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ICreateLessonFields>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      type: "ЛК",
      hours: 1,
      semester: 1,
    },
  })

  const onSubmit: SubmitHandler<ICreateLessonFields> = async (data) => {
    try {
      if (editableLesson) {
        await dispatch(updateGroupLoadLesson({ ...data, lessonId: editableLesson.id }))
        handleChangeEditing()
        return
      }

      if (!selectedGroupId) {
        return alert("Виберіть групу")
      }

      await dispatch(createGroupLoadLesson({ ...data, groupId: selectedGroupId }))
      handleChangeEditing()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeEditing = () => {
    setEditableLesson(null)
    reset({ name: "", hours: 1, semester: 1, type: "ЛК" })
  }

  const onDeleteLesson = () => {
    if (!editableLesson) return
    if (window.confirm("Ви дійсно хочете видалити елемент навантаження?")) {
      dispatch(deleteGroupLoadLesson(editableLesson.id))
    }
  }

  React.useEffect(() => {
    if (!editableLesson) return
    setValue("name", editableLesson.name)
    setValue("hours", editableLesson.hours)
    setValue("semester", editableLesson.semester)
    setValue("type", editableLesson.type)
  }, [editableLesson])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Це обов'язкове поле" }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="name">Назва*</InputLabel>
              <OutlinedInput
                fullWidth
                id="name"
                {...field}
                // value={values.firstname}
                name="name"
                // onBlur={handleBlur}
                // onChange={handleChange}
                placeholder="Назва дисципліни"
                error={Boolean(errors.name)}
              />
              {/*   {errors.name && (
                <FormHelperText error id="helper-text-name">
                  {errors.name.message}
                </FormHelperText>
              )} */}
              {/* <Autocomplete
                    // disablePortal
                    id="name"
                    // {...field}
                    ref={field.ref}
                    inputValue={field.value}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    options={autocompleteLessonsData}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={field.value}
                        type="text"
                        error={Boolean(errors.name)}
                        sx={{
                          ".OutlinedInput": { padding: "7.5px 4px 0 5px" },
                          ".MuiOutlinedInput-root": { padding: "3px 9px" },
                        }}
                      />
                    )}
                  /> */}
            </Stack>
          )
        }}
      />

      <Controller
        name="type"
        control={control}
        rules={{ required: "Це обов'язкове поле" }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="type">Вид навантаження*</InputLabel>
              <TextField
                select
                {...field}
                fullWidth
                id="type"
                sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
              >
                {[
                  { label: "Лекції", value: "ЛК" },
                  { label: "Практичні", value: "ПЗ" },
                  { label: "Лабораторні", value: "ЛАБ" },
                  { label: "Семінари", value: "СЕМ" },
                  { label: "Екзамен", value: "ЕКЗ" },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          )
        }}
      />

      <Controller
        name="semester"
        control={control}
        rules={{
          required: "Це обов'язкове поле",
          min: { value: 1, message: "Семестр не може бути менше 1" },
          max: { value: 2, message: "Семестр не може бути більше 2" },
        }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="semester">Семестр*</InputLabel>
              <OutlinedInput
                id="semester"
                type="number"
                {...field}
                name="semester"
                fullWidth
                error={Boolean(errors.name)}
              />
              {errors.semester && (
                <FormHelperText error id="helper-text-name">
                  {errors.semester.message}
                </FormHelperText>
              )}
            </Stack>
          )
        }}
      />

      <Controller
        name="hours"
        control={control}
        rules={{ required: "Це обов'язкове поле" }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="hours">Кількість годин*</InputLabel>
              <OutlinedInput id="hours" type="number" {...field} name="hours" fullWidth error={Boolean(errors.name)} />
              {/* {errors.name && (
                <FormHelperText error id="helper-text-name">
                  {errors.name.message}
                </FormHelperText>
              )} */}
            </Stack>
          )
        }}
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
        sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
      >
        {!isSubmitting && !editableLesson && "Створити"}
        {!isSubmitting && editableLesson && "Оновити"}
        {isSubmitting && "Завантаження..."}
      </Button>

      {editableLesson && (
        <>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            disabled={isSubmitting}
            onClick={handleChangeEditing}
            sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
          >
            Відмінити
          </Button>

          <Button
            type="submit"
            color="error"
            variant="outlined"
            disabled={isSubmitting}
            onClick={onDeleteLesson}
            sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
          >
            Видалити
          </Button>
        </>
      )}
    </form>
  )
}

export { CreateLessonForm }
