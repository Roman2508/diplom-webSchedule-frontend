import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import {
  getGroup,
  updateGroup,
  createGroup,
  deleteGroup,
  unpinTeacher,
  attachTeacher,
  getGroupCategories,
  updateGroupCategory,
  createGroupCategory,
  deleteGroupCategory,
  changeStudentsCount,
  createGroupLoadLesson,
  updateGroupLoadLesson,
  deleteGroupLoadLesson,
} from "./groupsAsyncActions"
import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { TeachersType } from "../teachers/teachersTypes"
import { ChangeStudentsCountType } from "../../api/apiTypes"
import { GroupCategoriesType, GroupLessonsType, GroupsInitialState, GroupsType } from "./groupsTypes"

const groupsInitialState: GroupsInitialState = {
  groupCategories: null,
  group: {
    id: 0,
    name: "",
    courseNumber: 1,
    yearOfAdmission: Number(new Date().getFullYear().toString()),
    students: 1,
    formOfEducation: "Денна",
    lessons: [],
    category: null,
  },
  loadingStatus: LoadingStatusTypes.NEVER,
}

const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    clearGroupData(state) {
      state.group = groupsInitialState.group
    },
  },
  extraReducers: (builder) => {
    /* getGroupCategories */
    builder.addCase(getGroupCategories.fulfilled, (state, action: PayloadAction<GroupCategoriesType[]>) => {
      state.groupCategories = action.payload
    })

    /* createGroupCategory */
    builder.addCase(createGroupCategory.fulfilled, (state, action: PayloadAction<GroupCategoriesType>) => {
      state.groupCategories?.push(action.payload)
    })

    /* updateGroupCategory */
    builder.addCase(updateGroupCategory.fulfilled, (state, action: PayloadAction<GroupCategoriesType>) => {
      if (!state.groupCategories) return

      const newCategories = state.groupCategories.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }

        return el
      })

      state.groupCategories = newCategories
    })

    /* deleteGroupCategory */
    builder.addCase(deleteGroupCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const newCategories = state.groupCategories.filter((el) => el.id !== action.payload)

      state.groupCategories = newCategories
    })

    /* --- groups --- */

    /* getGroup */
    builder.addCase(getGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      state.group = action.payload
    })

    /* createGroup */
    builder.addCase(createGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category?.id) {
          return { ...el, groups: [...el.groups, action.payload] }
        }

        return el
      })

      state.groupCategories = newGroups
    })

    /* updateGroup */
    builder.addCase(updateGroup.fulfilled, (state, action: PayloadAction<GroupsType>) => {
      if (!state.groupCategories) return

      const newGroups = state.groupCategories.map((el) => {
        if (el.id === action.payload.category?.id) {
          const newGroups = el.groups.map((group) => {
            if (group.id === action.payload.id) {
              return action.payload
            }

            return group
          })

          return { ...el, groups: newGroups }
        }

        return el
      })
      state.group = action.payload
      state.groupCategories = newGroups
    })

    /* deleteGroup */
    builder.addCase(deleteGroup.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.groupCategories) return

      const updatedCategories = state.groupCategories.map((el) => {
        const newGroups = el.groups.filter((group) => group.id !== action.payload)

        return { ...el, groups: newGroups }
      })

      state.groupCategories = updatedCategories
    })

    /* createGroupLoadLesson */
    builder.addCase(createGroupLoadLesson.fulfilled, (state, action: PayloadAction<GroupLessonsType>) => {
      if (!state.group.lessons) return
      const lessons = [...state.group.lessons, action.payload]
      state.group.lessons = lessons
    })

    /* updateGroupLoadLesson */
    builder.addCase(updateGroupLoadLesson.fulfilled, (state, action: PayloadAction<GroupLessonsType>) => {
      if (!state.group.lessons) return
      const lessons = state.group.lessons.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.group.lessons = lessons
    })

    /* deleteGroupLoadLesson */
    builder.addCase(deleteGroupLoadLesson.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.group.lessons) return
      const lessons = state.group.lessons.filter((el) => el.id !== action.payload)
      state.group.lessons = lessons
    })

    /* attachTeacher */
    builder.addCase(
      attachTeacher.fulfilled,
      (state, action: PayloadAction<{ lessonId: number; teacher: TeachersType }>) => {
        if (!state.group.lessons) return

        const lessons = state.group.lessons.map((el) => {
          if (el.id === action.payload.lessonId) {
            return { ...el, teacher: action.payload.teacher }
          }

          return el
        })

        state.group.lessons = lessons
      }
    )

    /* unpinTeacher */
    builder.addCase(unpinTeacher.fulfilled, (state, action: PayloadAction<{ lessonId: number }>) => {
      if (!state.group.lessons) return

      const lessons = state.group.lessons.map((el) => {
        if (el.id === action.payload.lessonId) {
          return { ...el, teacher: null }
        }

        return el
      })

      state.group.lessons = lessons
    })

    /* changeStudentsCount */
    builder.addCase(changeStudentsCount.fulfilled, (state, action: PayloadAction<ChangeStudentsCountType>) => {
      if (!state.group.lessons) return

      const { name, type, semester, students } = action.payload

      const lessons = state.group.lessons.map((el) => {
        if (el.name === name && el.type === type && el.semester === semester) {
          return { ...el, students }
        }

        return el
      })

      state.group.lessons = lessons
    })
  },
})

export const groupsSelector = (state: RootState) => state.groups

export const { setLoadingStatus, clearGroupData } = groupsSlice.actions

export default groupsSlice.reducer
