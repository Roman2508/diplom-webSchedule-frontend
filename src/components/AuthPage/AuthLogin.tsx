import {
  Stack,
  Button,
  InputLabel,
  IconButton,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"

import { emailPattern } from "./emailPattern.ts"
import { useAppDispatch } from "../../store/store"
import { AuthType } from "../../store/auth/authTypes.ts"
import { authLogin } from "../../store/auth/authAsyncActions.ts"

const AuthLogin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ email: string; password: string }>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    try {
      const { payload } = await dispatch(authLogin(data))
      // @ts-ignore
      const user = payload.user as AuthType

      if (user.access === "admin" || user.access === "super_admin") {
        navigate("/groups")
      } else {
        navigate("/load")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          disabled={!watch("email") || !watch("password")}
          sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 2 }}
        >
          {!isSubmitting ? "Увійти" : <CircularProgress size={20} color="secondary" />}
        </Button>
      </form>
    </div>
  )
}

export default AuthLogin
