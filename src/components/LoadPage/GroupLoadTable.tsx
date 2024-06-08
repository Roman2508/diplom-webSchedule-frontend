import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { groupLessonsByFields } from "../../utils/groupLessonsByFields"
import { GroupLessonsType } from "../../store/groups/groupsTypes"

interface IGroupLoadTableProps {
  lessons: GroupLessonsType[] | null
  //   selectedLesson: GroupLoadType[] | null
  //   setSelectedLesson: Dispatch<SetStateAction<GroupLoadType[] | null>>
}

const GroupLoadTable: React.FC<IGroupLoadTableProps> = ({ lessons }) => {
  //   const lessons = groupLessonsByFields(groupLoad ? groupLoad : [], { lessonName: true, semester: true })

  return (
    <Table sx={{ backgroundColor: "#fff" }}>
      <TableHead>
        <TableRow>
          <TableCell padding="none" align="left" sx={{ py: "8px" }}>
            №
          </TableCell>
          <TableCell padding="none" align="left" sx={{ py: "8px" }}>
            Назва дисципліни
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Семестр
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Тип
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: "8px" }}>
            Години
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {(lessons ? lessons : []).map((lesson, index) => (
          <TableRow
            key={lesson.id}
            // selected={lesson[0].id === (selectedLesson && selectedLesson[0].id)}
            // onClick={() => setSelectedLesson(lesson)}
            sx={{ "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" } }}
          >
            <TableCell padding="none" align="left" sx={{ py: "6px" }}>
              {index + 1}
            </TableCell>
            <TableCell padding="none" align="left" sx={{ py: "6px" }}>
              {lesson.name}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson.type}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson.semester}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: "6px" }}>
              {lesson.hours}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { GroupLoadTable }
