import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { AuthResponceType } from "../../api/apiTypes"
import { AuthType, InitialStateType } from "./authTypes"
import { authMe, authLogin, authRegister } from "./authAsyncActions.ts"

const authInitialState: InitialStateType = {
  auth: null,
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

    /* authRegister */
    builder.addCase(authRegister.fulfilled, (state, action: PayloadAction<AuthResponceType>) => {
      state.auth = action.payload.user
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* authMe */
    builder.addCase(authMe.fulfilled, (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus, logout } = authSlice.actions

export default authSlice.reducer

export const authSelector = (state: RootState) => state.auth
