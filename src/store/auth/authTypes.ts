import { LoadingStatusTypes } from "../appTypes"

export type InitialStateType = {
  auth: AuthType | null
  loadingStatus: LoadingStatusTypes
}

export type AuthType = {
  id: number
  fullName: string
  access: "admin" | "user"
  email: string
}
