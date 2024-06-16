import { ScheduleLessonType } from "../store/scheduleLessons/scheduleLessonsTypes"

export const findLessonsCountForLessonsTable = (
  name: string,
  groupId: number,
  type: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД",
  scheduleLessons: ScheduleLessonType[] | null
): number => {
  if (!scheduleLessons) return 0

  let matchingCount = 0

  scheduleLessons.forEach((el) => {
    const isNameSame = el.name === name
    const isGroupIdSame = el.group.id === groupId
    const isTypeSame = el.type === type

    if (isNameSame && isGroupIdSame && isTypeSame) {
      ++matchingCount
    }
  })

  return matchingCount * 2
}
