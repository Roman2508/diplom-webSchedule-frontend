import { GroupLessonsType } from "../store/groups/groupsTypes"

export const sortLessonsByLessonType = (selectedLesson: GroupLessonsType[]): GroupLessonsType[] => {
  if (!selectedLesson) return []
  const sortOrder = ["ЛК", "ПЗ", "ЛАБ", "СЕМ", "ЕКЗ", "КОНС", "МЕТОД"]
  const lessonsCopy = JSON.parse(JSON.stringify(selectedLesson))

  lessonsCopy.sort((a: GroupLessonsType, b: GroupLessonsType) => {
    return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type)
  })

  return lessonsCopy
}
