import { LoadingStatusTypes } from "../appTypes"
import { TeachersType } from "../teachers/teachersTypes"

export type GroupsInitialState = {
  groupCategories: GroupCategoriesType[] | null
  group: GroupsType
  loadingStatus: LoadingStatusTypes
}

export type GroupCategoriesType = {
  id: number
  name: string
  groups: GroupsShortType[]
}

export type GroupsType = {
  id: number
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  formOfEducation: "Денна" | "Заочна"
  category: { id: number; name: string } | null
  lessons: GroupLessonsType[] | null
}

export type GroupsShortType = Pick<GroupsType, "id" | "name" | "courseNumber" | "students">

export type GroupFormType = {
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  category: { value: string; label: string }
  formOfEducation: { value: string; label: string }
}

export type GroupLoadStreamType = {
  id: number
  name: string
  groups: { id: number; name: string }[]
  lessons: { id: number; name: string }[]
}

export type GroupLessonsType = {
  id: number
  name: string
  semester: number
  type: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД"
  hours: number
  group: { id: number; name: string }
  teacher: TeachersType | null
}

// Pick || Omit
