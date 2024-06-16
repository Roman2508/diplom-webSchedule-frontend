import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import menuSlice from "./menu/menuSlice"
import authSlice from "./auth/authSlice"
import groupsSlice from "./groups/groupsSlice"
import teachersSlice from "./teachers/teachersSlice"
import settingsSlice from "./settings/settingsSlice"
import appStatusSlice from "./appStatus/appStatusSlice"
import auditoriesSlise from "./auditories/auditoriesSlise"
import scheduleLessonsSlice from "./scheduleLessons/scheduleLessonsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    menu: menuSlice,
    groups: groupsSlice,
    teachers: teachersSlice,
    settings: settingsSlice,
    appStatus: appStatusSlice,
    auditories: auditoriesSlise,
    scheduleLessons: scheduleLessonsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
