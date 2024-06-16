import { LoadingStatusTypes } from "../appTypes"
import { GroupLessonsType } from "../groups/groupsTypes"
import { TeachersType } from "../teachers/teachersTypes"
import { AuditoriesTypes } from "../auditories/auditoriesTypes"

export type ScheduleLessonInitialStateType = {
  // Виставлені ел. розкладу
  scheduleLessons: ScheduleLessonType[] | null

  // Якщо група об'єднана в потік - накладки всіх груп в потоці
  groupOverlay: ScheduleLessonType[] | null
  // Накладки викладачів
  teacherLessons: ScheduleLessonType[] | null
  // Накладки аудиторій
  auditoryOverlay: { id: number; name: string }[] | null

  // Навантаження (все)
  groupLoad: GroupLessonsType[] | null
  loadingStatus: LoadingStatusTypes
}

export type ScheduleLessonType = {
  id: number
  name: string
  date: Date
  lessonNumber: number
  semester: number
  hours: number
  type: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ"
  isRemote: boolean
  students: number
  replacement: TeachersType | null
  note: string
  group: { id: number; name: string }
  teacher: TeachersType
  auditory: AuditoriesTypes | null
  subgroupNumber: number | null
  specialization: string | null
}
