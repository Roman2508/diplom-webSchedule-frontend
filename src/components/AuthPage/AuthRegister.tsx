import {
  Stack,
  Select,
  Button,
  MenuItem,
  InputLabel,
  IconButton,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"

import { emailPattern } from "./emailPattern"
import { useAppDispatch } from "../../store/store"
import { AuthType } from "../../store/auth/authTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { authRegister, updateUser } from "../../store/auth/authAsyncActions"

interface IAuthRegisterProps {
  editedUser: AuthType | null
}

interface IRegisterFields {
  fullName: string
  email: string
  password: string
  access: "super_admin" | "admin" | "deans_office" | "department_chair"
  department?: number
}

const AuthRegister: React.FC<IAuthRegisterProps> = ({ editedUser }) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEventHandler<HTMLButtonElement>) => {
    // @ts-ignore
    event.preventDefault()
  }

  const {
    watch,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IRegisterFields>({ mode: "onBlur" })

  const onSubmit: SubmitHandler<IRegisterFields> = async (data) => {
    try {
      if (editedUser) {
        const payload = { ...data, id: editedUser.id, department: data.department ? data.department : null }
        // @ts-ignore
        await dispatch(updateUser(payload))
      } else {
        if (!data.password) {
          setError("password", { message: "Довжина паролю може бути від 6 до 20 символів" })
        }
        await dispatch(authRegister(data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editedUser) return
    setValue("fullName", editedUser.fullName)
    setValue("email", editedUser.email)
    setValue("access", editedUser.access)

    if (editedUser.department) {
      setValue("department", editedUser.department.id)
    }
  }, [editedUser])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="fullName"
        control={control}
        rules={{
          required: "Ім'я обов'язкове",
        }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="fullName">Ім'я*</InputLabel>
              <OutlinedInput
                fullWidth
                {...field}
                type="text"
                id="fullName"
                name="fullName"
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
        name="access"
        control={control}
        // rules={{ required: "Роль користувача обов`язковий" }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="access">Роль</InputLabel>
              <Select {...field} id="access" defaultValue={"admin"}>
                {[
                  { value: "admin", label: "Адміністртор" },
                  { value: "super_admin", label: "Супер адміністртор" },
                  { value: "department_chair", label: "Зав. кафедри" },
                  { value: "deans_office", label: "Деканат" },
                ].map((el) => (
                  <MenuItem value={el.value} key={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          )
        }}
      />

      {(watch("access") === "department_chair" || watch("access") === "deans_office") && (
        <Controller
          name="department"
          control={control}
          // rules={{ required: "Кафедра обов`язкова для зав. кафедри та деканату" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="department">Кафедра</InputLabel>
                <Select {...field} id="department">
                  {(teachersCategories ? teachersCategories : []).map((el) => (
                    <MenuItem value={el.id} key={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )
          }}
        />
      )}

      <Controller
        name="email"
        control={control}
        rules={{
          required: "E-mail обов`язковий",
          pattern: { value: emailPattern, message: "Невірний формат пошти" },
        }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="email">E-mail*</InputLabel>
              <OutlinedInput id="email" type="text" {...field} name="email" fullWidth error={Boolean(errors.email)} />
              {errors.email && (
                <FormHelperText error id="helper-text-email">
                  {errors.email.message}
                </FormHelperText>
              )}
            </Stack>
          )
        }}
      />

      {/* {
     required: "Пароль обов`язковий",
     minLength: { value: 6, message: "Мін. довжина паролю - 6 символів" },
     maxLength: { value: 20, message: "Макс. довжина паролю - 20 символів" },
   } */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="password">Пароль*</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                {...field}
                name="password"
                fullWidth
                error={Boolean(errors.password)}
                sx={{ pr: 0 }}
                endAdornment={
                  <InputAdornment position="end">
                    {/* @ts-ignore */}
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error id="helper-text-password">
                  {errors.password.message}
                </FormHelperText>
              )}
            </Stack>
          )
        }}
      />

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={!watch("fullName") || !watch("email") || (!editedUser && watch("password").length < 6)}
        sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
      >
        {!isSubmitting ? "Зареєструвати" : <CircularProgress size={20} color="secondary" />}
      </Button>
    </form>
  )
}

export default AuthRegister
