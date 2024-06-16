import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { GroupLessonsType } from "../../store/groups/groupsTypes"

interface IGroupLoadTableProps {
  lessons: GroupLessonsType[] | null
  editableLesson: GroupLessonsType | null
  setEditableLesson: Dispatch<SetStateAction<GroupLessonsType | null>>
}

const GroupLoadTable: React.FC<IGroupLoadTableProps> = ({ lessons, editableLesson, setEditableLesson }) => {
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
        {(lessons ? lessons : []).map((lesson, index) => (
          <TableRow
            key={lesson.id}
            onClick={() => setEditableLesson(lesson)}
            selected={lesson.id === editableLesson?.id}
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
