import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import {
  getSettings,
  updateCallSchedule,
  updateColors,
  updateSemesterTerms,
  updateSettings,
} from "./settingsAsyncActions"
import { SettingsInitialStateType, SettingsType } from "./settingsTypes"

const settingsInitialState: SettingsInitialStateType = {
  settings: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* getSettings */
    builder.addCase(getSettings.fulfilled, (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload
    })

    /* updateSettings */
    builder.addCase(updateSettings.fulfilled, (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload
    })

    /* updateColors */
    builder.addCase(updateColors.fulfilled, (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload
    })

    /* updateCallSchedule */
    builder.addCase(updateCallSchedule.fulfilled, (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload
    })

    /* updateSemesterTerms */
    builder.addCase(updateSemesterTerms.fulfilled, (state, action: PayloadAction<SettingsType>) => {
      state.settings = action.payload
    })
  },
})

export const settingsSelector = (state: RootState) => state.settings

export const { setLoadingStatus } = settingsSlice.actions

export default settingsSlice.reducer
