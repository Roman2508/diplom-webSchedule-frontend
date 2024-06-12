// @ts-nocheck
import { customDayjs } from "../components/Calendar/Calendar"
import { ScheduleLessonType } from "../store/scheduleLessons/scheduleLessonsTypes"

function getDayName(dateString: Date) {
  const date = new Date(dateString)
  const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
  return days[date.getDay()]
}

const getDaysForViewSchedule = (lessons: ScheduleLessonType[]) => {
  const grouped = {}

  lessons.forEach((lesson) => {
    const date = lesson.date
    if (!grouped[date]) {
      const d = customDayjs(date).format("DD.MM.YYYY")

      grouped[date] = {
        dayName: getDayName(date),
        date: d,
        lessons: [],
      }
    }
    grouped[date].lessons.push(lesson)
  })

  return Object.values(grouped)
}

export { getDaysForViewSchedule }
