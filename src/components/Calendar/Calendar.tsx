import React from "react"
import dayjs from "dayjs"
import uk from "dayjs/locale/uk"
import updateLocale from "dayjs/plugin/updateLocale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as CalendarComponent, dayjsLocalizer, Event } from "react-big-calendar"

dayjs.locale(uk)

dayjs.extend(updateLocale)

dayjs.updateLocale("uk", {
  // formats: ["DD.MM.YYYY", "HH.mm"],
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопада",
    "Грудня",
  ],
})

const localizer = dayjsLocalizer(dayjs)

export const customDayjs = dayjs

interface ICalendarProps {
  events?: Event[]
  onClick?: (e: Event) => void
  selectable?: boolean
  heigth?: string
  onSelectLessonsTime?: React.Dispatch<React.SetStateAction<Date | null>>
}

const Calendar: React.FC<ICalendarProps> = ({ events = [], onClick = () => {}, onSelectLessonsTime }) => {
  const eventStyleGetter = (event: any) => {
    const style = {
      cursor: "pointer",
      backgroundColor: "#" + event.hexColor,
      color: "#fff",
      borderRadius: "0px",
      fontSize: "12px",
      opacity: 0.8,
      border: "0px",
      display: "block",
      width: "100%",
      minWidth: "100%",
    }
    return { style: style }
  }

  React.useEffect(() => {
    return () => onSelectLessonsTime && onSelectLessonsTime(null)
  }, [])

  const today = new Date()

  return (
    <div>
      <CalendarComponent
        selectable={true}
        onSelectEvent={onClick}
        onDoubleClickEvent={onClick}
        localizer={localizer}
        events={events}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        views={["week"]}
        startAccessor="start"
        endAccessor="end"
        min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
        max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14)}
        culture={"fr"}
        messages={{
          next: "Наступний тиждень",
          previous: "Попередній тиждень",
          today: "Сьогодні",
          week: "Тиждень",
        }}
      />
    </div>
  )
}

export default Calendar
