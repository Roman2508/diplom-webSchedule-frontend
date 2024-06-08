import React, { Dispatch, SetStateAction } from "react"
import { CloseSquareOutlined, LeftSquareOutlined } from "@ant-design/icons"
import { Grid, Stack, Tooltip, TextField, Typography, IconButton, InputLabel } from "@mui/material"

import EmptyCard from "../EmptyCard/EmptyCard"
import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { GroupLessonsType } from "../../store/groups/groupsTypes"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { sortLessonsByLessonType } from "../../utils/sortLessonsByLessonType"
import { attachTeacher, unpinTeacher } from "../../store/groups/groupsAsyncActions"

export type AttachmentTypes = "attach-one" | "unpin-one"

interface IDistributionTeachersToLessonsProps {
  selectedTeacherId: number | null
  selectedLesson: GroupLessonsType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLessonsType[] | null>>
}

const DistributionTeachersToLessons: React.FC<IDistributionTeachersToLessonsProps> = ({
  selectedLesson,
  setSelectedLesson,
  selectedTeacherId,
}) => {
  const dispatch = useAppDispatch()

  const onAttachTeacher = async (lessonId: number) => {
    if (!selectedTeacherId) return alert("Виберіть викладача")
    const { payload } = await dispatch(attachTeacher({ lessonId, teacherId: selectedTeacherId }))
    const data = payload as { lessonId: number; teacher: TeachersType }
    setSelectedLesson((prev) => {
      if (prev) {
        return prev.map((lesson) => {
          if (lesson.id === data.lessonId) {
            return { ...lesson, teacher: data.teacher }
          }
          return lesson
        })
      }

      return prev
    })
  }

  const onUnpinTeacher = async (lessonId: number) => {
    const { payload } = await dispatch(unpinTeacher(lessonId))
    const data = payload as { lessonId: number }
    setSelectedLesson((prev) => {
      if (prev) {
        return prev.map((lesson) => {
          if (lesson.id === data.lessonId) {
            return { ...lesson, teacher: null }
          }
          return lesson
        })
      }

      return prev
    })
  }

  return (
    <Grid item xs={12} sx={{ mb: 2 }}>
      <MainCard>
        <Typography
          variant="button"
          sx={{
            textAlign: "center",
            display: "block",
            textTransform: "uppercase",
            mb: 2.6,
          }}
        >
          {selectedLesson ? selectedLesson[0].name : "Виберіть дисципліну"}
        </Typography>

        <form autoComplete="off">
          {!selectedLesson && <EmptyCard />}

          {selectedLesson &&
            sortLessonsByLessonType(selectedLesson).map((lesson) => {
              const teacher = lesson.teacher ? getLastnameAndInitials(lesson.teacher) : ""

              return (
                <Stack
                  spacing={1}
                  key={lesson.id}
                  sx={{ mt: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                  <Typography sx={{ mt: "8px !important", mr: "8px !important" }}>Годин</Typography>

                  <TextField
                    name={lesson.typeEn}
                    size="small"
                    placeholder=""
                    value={lesson.hours}
                    InputProps={{ readOnly: true, disableUnderline: true }}
                    sx={{
                      maxWidth: "45px",
                      mr: "8px !important",
                      "& .MuiInputBase-root": { p: 0 },
                      "& input": { textAlign: "center", cursor: "default" },
                    }}
                  />

                  <Typography sx={{ mt: "8px !important", mr: "8px !important" }}>Викладач</Typography>

                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    size="small"
                    placeholder=""
                    value={teacher}
                    sx={{ mr: "8px !important", "& .MuiInputBase-root": { p: 0 } }}
                  />
                  <Tooltip title="Прикріпити викладача">
                    <IconButton onClick={() => onAttachTeacher(lesson.id)}>
                      <LeftSquareOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Відкріпити викладача">
                    <IconButton onClick={() => onUnpinTeacher(lesson.id)} disabled={!teacher}>
                      <CloseSquareOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )
            })}
        </form>
      </MainCard>
    </Grid>
  )
}

export default DistributionTeachersToLessons
