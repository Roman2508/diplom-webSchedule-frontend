import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { groupLessonsByFields } from "../../utils/groupLessonsByFields"
import { GroupLessonsType } from "../../store/groups/groupsTypes"

interface IDistributionLessonsTableProps {
  groupLoad: GroupLessonsType[] | null
  selectedLesson: GroupLessonsType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLessonsType[] | null>>
}

const DistributionLessonsTable: React.FC<IDistributionLessonsTableProps> = ({
  groupLoad,
  selectedLesson,
  setSelectedLesson,
}) => {
  const lessons = groupLessonsByFields(groupLoad ? groupLoad : [], { lessonName: true, semester: true })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="none" align="left" sx={{ py: "8px" }}>
            Назва дисципліни
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Тип
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Семестр
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Години
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {lessons.map((lesson, index) => (
          <TableRow
            key={index}
            selected={lesson[0].id === (selectedLesson && selectedLesson[0].id)}
            onClick={() => setSelectedLesson(lesson)}
            sx={{ "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" } }}
          >
            <TableCell padding="none" align="left" sx={{ py: "6px" }}>
              {lesson[0].name}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson[0].type}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson[0].semester}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson[0].hours}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { DistributionLessonsTable }
