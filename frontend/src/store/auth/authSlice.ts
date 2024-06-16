import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { AuthResponceType } from "../../api/apiTypes"
import { AuthType, InitialStateType } from "./authTypes"
import { authMe, authLogin, getUsers, updateUser, deleteUser } from "./authAsyncActions.ts"

const authInitialState: InitialStateType = {
  auth: null,
  users: [],
  loadingStatus: LoadingStatusTypes.NEVER,
}

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    logout(state) {
      state.auth = null
      window.localStorage.removeItem("webSchedule-token")
    },
  },
  extraReducers: (builder) => {
    /* authLogin */
    builder.addCase(authLogin.fulfilled, (state, action: PayloadAction<AuthResponceType>) => {
      state.auth = action.payload.user
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authMe */
    builder.addCase(authMe.fulfilled, (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* getUsers */
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<AuthType[]>) => {
      state.users = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* updateUser */
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<AuthType>) => {
      const newUsers = state.users.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.users = newUsers
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* deleteUser */
    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
      const newUsers = state.users.filter((el) => el.id !== action.payload)
      state.users = newUsers
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, logout } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
