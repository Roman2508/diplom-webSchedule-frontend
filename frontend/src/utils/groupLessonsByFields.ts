import { GroupLessonsType } from "../store/groups/groupsTypes"

interface IGroupByProps {
  lessonName?: boolean
  semester?: boolean
  groupName?: boolean
  subgroups?: boolean
}

export const groupLessonsByFields = (lessons: GroupLessonsType[], groupBy: IGroupByProps): GroupLessonsType[][] => {
  const groupedLessons: Record<string, GroupLessonsType[]> = {}

  lessons.forEach((subject) => {
    const key1 = groupBy.lessonName ? subject.name : ""
    const key2 = groupBy.semester ? subject.semester : ""
    const key3 = groupBy.groupName ? subject.group.name : ""

    const key = key1 + key2 + key3

    if (!groupedLessons[key]) {
      groupedLessons[key] = []
    }

    groupedLessons[key].push(subject)
  })
  return Object.values(groupedLessons)
}
