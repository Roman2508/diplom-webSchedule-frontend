import {
  Button,
  Stack,
  InputLabel,
  IconButton,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"

import { emailPattern } from "./emailPattern"
import { useAppDispatch } from "../../store/store"
import { AuthType } from "../../store/auth/authTypes"
import { authRegister, updateUser } from "../../store/auth/authAsyncActions"

interface IAuthRegisterProps {
  editedUser: AuthType | null
}

const AuthRegister: React.FC<IAuthRegisterProps> = ({ editedUser }) => {
  const dispatch = useAppDispatch()

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
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ fullName: string; email: string; password: string }>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<{ fullName: string; email: string; password: string }> = async (data) => {
    try {
      if (editedUser) {
        await dispatch(updateUser({ ...data, access: editedUser.access, id: editedUser.id }))
      } else {
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

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Пароль обов`язковий",
          minLength: { value: 6, message: "Мін. довжина паролю - 6 символів" },
          maxLength: { value: 20, message: "Макс. довжина паролю - 20 символів" },
        }}
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
        disabled={!watch("fullName") || !watch("email") || !watch("password")}
        sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
      >
        {!isSubmitting ? "Зареєструвати" : <CircularProgress size={20} color="secondary" />}
      </Button>
    </form>
  )
}

export default AuthRegister
