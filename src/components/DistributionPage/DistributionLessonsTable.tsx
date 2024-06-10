import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import { groupLessonsByFields } from "../../utils/groupLessonsByFields"
import { GroupLessonsType } from "../../store/groups/groupsTypes"
import EmptyCard from "../EmptyCard/EmptyCard"
import { LoadingStatusTypes } from "../../store/appTypes"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

interface IDistributionLessonsTableProps {
  groupLoad: GroupLessonsType[] | null
  groupsLoadingStatus: LoadingStatusTypes
  selectedLesson: GroupLessonsType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLessonsType[] | null>>
}

const DistributionLessonsTable: React.FC<IDistributionLessonsTableProps> = ({
  groupLoad,
  selectedLesson,
  setSelectedLesson,
  groupsLoadingStatus,
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
        {!groupLoad?.length && groupsLoadingStatus !== LoadingStatusTypes.LOADING && (
          <TableRow>
            <TableCell padding="none" colSpan={4} align="left" sx={{ py: "6px" }}>
              <EmptyCard />
            </TableCell>
          </TableRow>
        )}

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
