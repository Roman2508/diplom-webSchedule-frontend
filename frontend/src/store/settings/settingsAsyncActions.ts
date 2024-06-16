import { createAsyncThunk } from "@reduxjs/toolkit"

import { settingsAPI } from "../../api/api"
import { SettingsType } from "./settingsTypes"
import { LoadingStatusTypes } from "../appTypes"
import { setLoadingStatus } from "./settingsSlice"
import { setAppAlert } from "../appStatus/appStatusSlice"
import {
  UpdateCallSchedulePayloadType,
  UpdateColorsPayloadType,
  UpdateSemesterTermsPayloadType,
} from "../../api/apiTypes"

export const getSettings = createAsyncThunk("settings/getSettings", async (_, thunkAPI): Promise<SettingsType> => {
  thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

  try {
    const { data } = await settingsAPI.getSettings()
    // thunkAPI.dispatch(setAppAlert({ message: "Налаштування завантажено", status: "success" }))
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

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (payload: SettingsType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.updateSettings(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування оновлено", status: "success" }))
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
  }
)

export const updateSemesterTerms = createAsyncThunk(
  "settings/updateSemesterTerms",
  async (payload: UpdateSemesterTermsPayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.updateSemesterTerms(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування оновлені", status: "success" }))
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
  }
)

export const updateCallSchedule = createAsyncThunk(
  "settings/updateCallSchedule",
  async (payload: UpdateCallSchedulePayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.updateCallSchedule(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування оновлені", status: "success" }))
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
  }
)

export const updateColors = createAsyncThunk(
  "settings/updateColors",
  async (payload: UpdateColorsPayloadType, thunkAPI): Promise<SettingsType> => {
    thunkAPI.dispatch(setLoadingStatus(LoadingStatusTypes.LOADING))

    try {
      const { data } = await settingsAPI.updateColors(payload)
      thunkAPI.dispatch(setAppAlert({ message: "Налаштування оновлені", status: "success" }))
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
  }
)
