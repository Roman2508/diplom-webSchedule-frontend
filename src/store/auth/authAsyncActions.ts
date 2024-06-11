import { createAsyncThunk } from "@reduxjs/toolkit"

import { authAPI } from "../../api/api"
import { setLoadingStatus } from "./authSlice"
import { LoadingStatusTypes } from "../appTypes"
import { setAppAlert } from "../appStatus/appStatusSlice"
import { AuthLoginType, AuthMeType, AuthRegisterType } from "../../api/apiTypes"
import { AuthType } from "./authTypes"

export const authLogin = createAsyncThunk("auth/authLogin", async (payload: AuthLoginType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.login(payload)
    thunkAPI.dispatch(setAppAlert({ message: "Авторизований", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    window.localStorage.setItem("webSchedule-token", data.accessToken)
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})

export const authRegister = createAsyncThunk("auth/authRegister", async (payload: AuthRegisterType, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.register(payload)
    thunkAPI.dispatch(setAppAlert({ message: "Авторизований", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})

export const authMe = createAsyncThunk("auth/authMe", async (payload: AuthMeType, thunkAPI) => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.getMe(payload)
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any)?.response?.data?.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})

export const getUsers = createAsyncThunk("auth/getUsers", async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.getUsers()
    thunkAPI.dispatch(setAppAlert({ message: "Завантажено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})

export const updateUser = createAsyncThunk("auth/updateUser", async (payload: AuthType & { id: number }, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.updateUser(payload)
    thunkAPI.dispatch(setAppAlert({ message: "Користувача оновлено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id: number, thunkAPI) => {
  thunkAPI.dispatch(setAppAlert({ message: "Завантаження...", status: "info" }))
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await authAPI.deleteUser(id)
    thunkAPI.dispatch(setAppAlert({ message: "Користувача видалено", status: "success" }))
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.SUCCESS))
    return data
  } catch (error: any) {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.ERROR))
    thunkAPI.dispatch(
      setAppAlert({
        message: (error as any).response.data.message || error.message,
        status: "error",
      })
    )
    throw error
  }
})
