import axios, { InternalAxiosRequestConfig } from "axios"

import {
  AuthMeType,
  AuthLoginType,
  AuthResponceType,
  AuthRegisterType,
  CreatePlanPayloadType,
  UpdateGroupPayloadType,
  ChangeStudentsCountType,
  UpdateColorsPayloadType,
  CreateSubjectPayloadType,
  CreateTeacherPayloadType,
  UpdateTeacherPayloadType,
  AttachTeacherPayloadType,
  UpdateGroupLoadLessonType,
  CreateGroupLoadLessonType,
  CreateAuditoryPayloadType,
  UpdateAuditoryPayloadType,
  GetGroupOverlayPayloadType,
  CopyDaySchedulePayloadType,
  CopyWeekSchedulePayloadType,
  AddGroupToStreamPayloadType,
  UpdateEntityNamePayloadType,
  CreateReplacementPayloadType,
  UpdateSubjectNamePayloadType,
  UpdateCallSchedulePayloadType,
  AddLessonsToStreamPayloadType,
  UpdateSubjectHoursPayloadType,
  GetScheduleLessonsPayloadType,
  GetAuditoryOverlayPayloadType,
  UpdateSemesterTermsPayloadType,
  CreateSpecializationPayloadType,
  UpdateSpecializationPayloadType,
  DeleteSpecializationPayloadType,
  CreateScheduleLessonsPayloadType,
  DeleteGroupFromStreamPayloadType,
  CreateTeacherCategoryPayloadType,
  UpdateTeacherCategoryPayloadType,
  UpdateScheduleLessonsPayloadType,
  UpdateAuditoryCategoryPayloadType,
  DeleteLessonFromStreamPayloadType,
  DeleteGroupFromStreamResponseType,
  FindLessonsForSchedulePayloadType,
  ViewSchedulePayloadType,
} from "./apiTypes"
import { AuthType } from "../store/auth/authTypes"
import { StreamsType } from "../store/streams/streamsTypes"
import { SettingsType } from "../store/settings/settingsTypes"
import { ScheduleLessonType } from "../store/scheduleLessons/scheduleLessonsTypes"
import { TeachersCategoryType, TeachersType } from "../store/teachers/teachersTypes"
import { PlanType, PlansCategoriesType, PlansType } from "../store/plans/plansTypes"
import { GroupCategoriesType, GroupLessonsType, GroupsType } from "../store/groups/groupsTypes"
import { AuditoriesTypes, AuditoryCategoriesTypes } from "../store/auditories/auditoriesTypes"

const instanse = axios.create({ baseURL: "http://localhost:7777/" })

instanse.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem("webSchedule-token")

  if (config.headers && token) {
    config.headers.Authorization = String(`Bearer ${token}`)
  }

  return config
})

export const auditoriesAPI = {
  /* categories */
  getAuditoryCategories() {
    return instanse.get<AuditoryCategoriesTypes[]>("/auditory-categories")
  },
  createAuditoryCategory(name: string) {
    return instanse.post<AuditoryCategoriesTypes>("/auditory-categories", {
      name,
    })
  },
  updateAuditoryCategory(payload: UpdateAuditoryCategoryPayloadType) {
    return instanse.patch<AuditoryCategoriesTypes>(`/auditory-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  async deleteAuditoryCategory(id: number) {
    return instanse.delete<number>(`/auditory-categories/${id}`)
  },

  /* auditories */

  createAuditory(payload: CreateAuditoryPayloadType) {
    return instanse.post<AuditoriesTypes>("/auditories", payload)
  },
  updateAuditory(payload: UpdateAuditoryPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<AuditoriesTypes>(`/auditories/${id}`, rest)
  },
  deleteAuditory(id: number) {
    return instanse.delete<number>(`/auditories/${id}`)
  },
}

export const teachersAPI = {
  /* categories */
  getTeachersCategories() {
    return instanse.get<TeachersCategoryType[]>(`/teacher-categories/`)
  },
  createTeacherCategory(payload: CreateTeacherCategoryPayloadType) {
    return instanse.post("/teacher-categories/", { name: payload.name })
  },
  updateTeacherCategory(payload: UpdateTeacherCategoryPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch<TeachersCategoryType>(`/teacher-categories/${id}`, rest)
  },
  deleteTeacherCategory(id: number) {
    return instanse.delete<number>(`/teacher-categories/${id}`)
  },

  /* teachers */
  createTeacher(payload: CreateTeacherPayloadType) {
    return instanse.post("/teachers", payload)
  },
  updateTeacher(payload: UpdateTeacherPayloadType) {
    const { id, ...rest } = payload

    return instanse.patch(`/teachers/${id}`, rest)
  },
  handleTeacherVisible(id: number) {
    return instanse.patch<{ id: number }>(`/teachers/handle-visible/${id}`)
  },
  deleteTeacher(id: number) {
    return instanse.delete(`/teachers/${id}`)
  },
}

export const plansAPI = {
  /* categories */
  getPlansCategories() {
    return instanse.get<PlansCategoriesType[]>("/plan-categories")
  },
  createPlanCategory(payload: { name: string }) {
    return instanse.post<PlansCategoriesType>("/plan-categories", payload)
  },
  updatePlanCategory(payload: { name: string; id: number }) {
    return instanse.patch<PlansCategoriesType>(`/plan-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlanCategory(id: number) {
    return instanse.delete<number>(`/plan-categories/${id}`)
  },

  /* plans */
  createPlan(payload: CreatePlanPayloadType) {
    return instanse.post<PlansType>("/plans", payload)
  },
  updatePlan(payload: { name: string; id: number }) {
    return instanse.patch<PlansType>(`/plans/${payload.id}`, {
      name: payload.name,
    })
  },
  deletePlan(id: number) {
    return instanse.delete<number>(`/plans/${id}`)
  },
}

export const planSubjectsAPI = {
  getSubjects(id: number) {
    return instanse.get<PlanType>(`/plans/${id}`)
  },
  createSubject(payload: CreateSubjectPayloadType) {
    return instanse.post<any>("/plan-subjects", payload)
  },
  updateSubjectName(payload: UpdateSubjectNamePayloadType) {
    return instanse.patch<{ id: number; name: string; cmk: number }[]>("/plan-subjects/name", payload)
  },
  updateSubjectHours(payload: UpdateSubjectHoursPayloadType) {
    const { id, ...data } = payload
    return instanse.patch<any>(`/plan-subjects/hours/${id}`, data)
  },
  deleteSubject(id: number) {
    return instanse.delete<number>(`/plan-subjects/${id}`)
  },
}

export const groupsAPI = {
  /* categories */
  getGroupsCategories() {
    return instanse.get<GroupCategoriesType[]>(`/group-categories`)
  },
  createGroupCategory(payload: string) {
    return instanse.post<GroupCategoriesType>("/group-categories", { name: payload })
  },
  updateGroupCategory(payload: UpdateEntityNamePayloadType) {
    return instanse.patch<GroupCategoriesType>(`/group-categories/${payload.id}`, {
      name: payload.name,
    })
  },
  deleteGroupCategory(id: number) {
    return instanse.delete<number>(`/group-categories/${id}`)
  },

  /* Groups */
  getGroup(id: string) {
    return instanse.get<GroupsType>(`/groups/${id}`)
  },

  createGroup(payload: UpdateGroupPayloadType) {
    return instanse.post<GroupsType>("/groups", payload)
  },
  updateGroup(payload: UpdateGroupPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<GroupsType>(`/groups/${id}`, rest)
  },
  deleteGroup(id: number) {
    return instanse.delete<number>(`/groups/${id}`)
  },
  handleGroupVisible(id: number) {
    return instanse.patch<{ id: number; isHide: boolean }>(`/groups/handle-visible/${id}`)
  },

  createSpecialization(payload: CreateSpecializationPayloadType) {
    return instanse.post<string[]>(`/groups/specialization`, payload)
  },

  updateSpecialization(payload: UpdateSpecializationPayloadType) {
    return instanse.patch<string[]>(`/groups/specialization`, payload)
  },

  deleteSpecialization(payload: DeleteSpecializationPayloadType) {
    return instanse.delete<string[]>(`/groups/specialization/${payload.groupId}/${payload.name}`)
  },
}

export const groupLoadLessonsAPI = {
  /* group load */
  findLessonsForSchedule(payload: FindLessonsForSchedulePayloadType) {
    const { semester, itemId, scheduleType } = payload
    return instanse.get<GroupLessonsType[]>(`/group-load-lessons/${semester}/${scheduleType}/${itemId}`)
  },

  create(payload: CreateGroupLoadLessonType) {
    return instanse.post<GroupLessonsType>("/group-load-lessons", payload)
  },

  update(payload: UpdateGroupLoadLessonType) {
    return instanse.patch<GroupLessonsType>("/group-load-lessons", payload)
  },

  delete(id: number) {
    return instanse.delete<number>(`/group-load-lessons/${id}`)
  },

  /* Students */
  changeStudentsCount(payload: ChangeStudentsCountType) {
    return instanse.patch<ChangeStudentsCountType>("/group-load-lessons/students", payload)
  },

  /* teachers */
  attachTeacher(payload: AttachTeacherPayloadType) {
    return instanse.patch<{ lessonId: number; teacher: TeachersType }>(
      `/group-load-lessons/attach-teacher/${payload.lessonId}/${payload.teacherId}`
    )
  },

  unpinTeacher(lessonId: number) {
    return instanse.patch<{ lessonId: number }>(`/group-load-lessons/unpin-teacher/${lessonId}`)
  },
}

export const streamsAPI = {
  getStreams() {
    return instanse.get<StreamsType[]>("/streams")
  },
  createStream(payload: { name: string }) {
    return instanse.post<StreamsType>("/streams", payload)
  },
  updateStreamName(payload: UpdateEntityNamePayloadType) {
    const { id, name } = payload
    return instanse.patch<StreamsType>(`/streams/name/${id}`, { name })
  },
  deleteStream(id: number) {
    return instanse.delete<number>(`/streams/${id}`)
  },

  /* groups (add or delete) */
  addGroupToStream(payload: AddGroupToStreamPayloadType) {
    const { groupId, streamId } = payload
    return instanse.patch<StreamsType>(`/streams/group/add/${streamId}`, { groupId })
  },
  deleteGroupFromStream(payload: DeleteGroupFromStreamPayloadType) {
    const { groupId, streamId } = payload
    return instanse.delete<DeleteGroupFromStreamResponseType>(`/streams/group/remove/${streamId}/${groupId}`)
  },

  /* lessons (get, add or delete)  */
  getStreamLessonsByGroupId(id: number) {
    return instanse.get<GroupLessonsType[]>(`/group-load-lessons/${id}`)
  },

  addLessonToStream(payload: AddLessonsToStreamPayloadType) {
    return instanse.patch<GroupLessonsType[]>(`/streams/lesson/add/${payload.streamId}`, payload)
  },
  deleteLessonFromStream(payload: DeleteLessonFromStreamPayloadType) {
    return instanse.patch<GroupLessonsType[]>(`/streams/lesson/remove`, payload)
  },
}

export const scheduleLessonsAPI = {
  getLessons(payload: GetScheduleLessonsPayloadType) {
    const { semester, type, id } = payload
    return instanse.get<ScheduleLessonType[]>(`/schedule-lessons/${semester}/${type}/${id}`)
  },
  viewSchedule(payload: ViewSchedulePayloadType) {
    const { semester, teacher, group } = payload
    return instanse.get<ScheduleLessonType[]>(`/schedule-lessons/view/${semester}/${teacher}/${group}`)
  },
  getAuditoryOverlay(payload: GetAuditoryOverlayPayloadType) {
    const { date, lessonNumber, auditoryId } = payload
    return instanse.get<{ id: number; name: string }[]>(
      `/schedule-lessons/overlay/${date}/${lessonNumber}/${auditoryId}`
    )
  },
  getGroupOverlay(payload: GetGroupOverlayPayloadType) {
    const { semester, groupId } = payload
    return instanse.get<ScheduleLessonType[]>(`/schedule-lessons/${semester}/group/${groupId}`)
  },
  create(payload: CreateScheduleLessonsPayloadType) {
    return instanse.post<ScheduleLessonType>(`/schedule-lessons`, payload)
  },

  copyWeekSchedule(payload: CopyWeekSchedulePayloadType) {
    return instanse.post<ScheduleLessonType[]>(`/schedule-lessons/copy-week`, payload)
  },
  copyDaySchedule(payload: CopyDaySchedulePayloadType) {
    return instanse.post<ScheduleLessonType[]>(`/schedule-lessons/copy-day`, payload)
  },

  createReplacement(payload: CreateReplacementPayloadType) {
    return instanse.patch<ScheduleLessonType>(`/schedule-lessons/replacement`, payload)
  },
  deleteReplacement(id: number) {
    return instanse.delete<number>(`/schedule-lessons/replacement/${id}`)
  },

  update(payload: UpdateScheduleLessonsPayloadType) {
    const { id, ...rest } = payload
    return instanse.patch<ScheduleLessonType>(`/schedule-lessons/${id}`, rest)
  },
  delete(id: number) {
    return instanse.delete<number>(`/schedule-lessons/${id}`)
  },
}

export const settingsAPI = {
  getSettings() {
    return instanse.get<SettingsType>(`/settings/${1}`)
  },
  updateSettings(payload: SettingsType) {
    const { id, ...rest } = payload
    return instanse.patch<SettingsType>(`/settings/${id}`, rest)
  },
  updateColors(payload: UpdateColorsPayloadType) {
    return instanse.patch<SettingsType>(`/settings/colors`, payload)
  },
  updateCallSchedule(payload: UpdateCallSchedulePayloadType) {
    return instanse.patch<SettingsType>(`/settings/call-schedule`, payload)
  },
  updateSemesterTerms(payload: UpdateSemesterTermsPayloadType) {
    return instanse.patch<SettingsType>(`/settings/semester-terms`, payload)
  },
}

export const authAPI = {
  login(payload: AuthLoginType) {
    return instanse.post<AuthResponceType>("/auth/login", payload)
  },
  register(payload: AuthRegisterType) {
    return instanse.post<AuthResponceType>("/auth/register", payload)
  },
  getMe(payload: AuthMeType) {
    return instanse.post<AuthType>("/auth/me", payload)
  },

  getUsers() {
    return instanse.get<AuthType[]>("/users")
  },
  updateUser(payload: AuthType & { id: number }) {
    const { id, ...data } = payload
    return instanse.patch<AuthType>(`/users/${id}`, data)
  },
  deleteUser(id: number) {
    return instanse.delete<number>(`/users/${id}`)
  },
}
