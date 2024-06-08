// material-ui
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
import { Controller, SubmitHandler, useForm } from "react-hook-form"

// project import
import { useAppDispatch } from "../../store/store"
import { autocompleteLessonsData } from "./autocompleteLessonsData"
import { createGroupLoadLesson } from "../../store/groups/groupsAsyncActions"

interface ICreateLessonFormProps {
  editingLesson: null
  selectedGroupId?: number
}

interface ICreateLessonFields {
  name: string
  type: string
  hours: number
  semester: number
}

const CreateLessonForm: React.FC<ICreateLessonFormProps> = ({ editingLesson, selectedGroupId }) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
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
    console.log(data)
    try {
      if (!selectedGroupId) {
        return alert("Виберіть групу")
      }
      // Якщо форму відкрито в модалці - оновлення викладача
      //   if (isOpenInModal) {
      //     if (!editingAuditoryCategory) return
      //     await dispatch(updateAuditoryCategory({ id: editingAuditoryCategory.id, name: data.name }))
      //     handleClose()
      //     reset({ name: "" })
      //   } else {
      // Якщо форму відкрито НЕ в модалці - створення викладача

      await dispatch(createGroupLoadLesson({ ...data, groupId: selectedGroupId }))
      reset({ name: "" })

      //   }
    } catch (error) {
      console.log(error)
    }
  }

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
              {errors.name && (
                <FormHelperText error id="helper-text-name">
                  {errors.name.message}
                </FormHelperText>
              )}
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
        {/* {isOpenInModal && !isSubmitting ? "Оновити" : !isSubmitting ? "Створити" : "Завантаження..."} */}
        {!isSubmitting ? "Створити" : "Завантаження..."}
      </Button>
    </form>
  )
}

export { CreateLessonForm }
