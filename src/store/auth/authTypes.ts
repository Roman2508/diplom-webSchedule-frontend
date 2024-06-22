import { LoadingStatusTypes } from "../appTypes"
import { TeachersCategoryType } from "../teachers/teachersTypes"

export type InitialStateType = {
  auth: AuthType | null
  users: AuthType[]
  loadingStatus: LoadingStatusTypes
}

export type AuthType = {
  id: number
  fullName: string
  access: "super_admin" | "admin" | "deans_office" | "department_chair"
  email: string
  department: TeachersCategoryType | null
}
