import React from "react"
import { useSelector } from "react-redux"
import { Grid, Typography } from "@mui/material"

import {
  deleteTeacher,
  handleTeacherVisible,
  getTeachersCategories,
  deleteTeacherCategory,
} from "../../store/teachers/teachersAsyncActions"
import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import CreateTeacherForm from "../../components/TeachersPage/CreateTeacherForm"
import UpdateTeacherModal from "../../components/TeachersPage/UpdateTeacherModal"
import { AccordionItemsList } from "../../components/AccordionItemsList/AccordionItemsList"
import CreateTeachersCategoryForm from "../../components/TeachersPage/CreateTeachersCategoryForm"
import UpdateTeachersCategoryForm from "../../components/TeachersPage/UpdateTeachersCategoryForm"
import { useNavigate } from "react-router-dom"
import { authSelector } from "../../store/auth/authSlice"

// ==============================|| PLANS ||============================== //

const TeachersPage = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { auth } = useSelector(authSelector)
  const { teachersCategories, loadingStatus } = useSelector(teachersSelector)

  const [isUpdateTeacherModalOpen, setIsUpdateTeacherModalOpen] = React.useState(false)
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = React.useState(false)
  const [editingTeacher, setEditingTeacher] = React.useState<TeachersType | null>(null)
  const [editingTeacherCategory, setEditingTeacherCategory] = React.useState<{
    id: number
    name: string
  } | null>(null)

  React.useEffect(() => {
    dispatch(getTeachersCategories())
  }, [])

  React.useEffect(() => {
    if (!auth) return

    if (auth.access === "deans_office" || auth.access === "department_chair") {
      navigate("/load")
    }
  }, [auth])

  const onDeleteTeacher = (id: number) => {
    try {
      if (window.confirm("Ви дійсно хочете видалити викладача?")) {
        dispatch(deleteTeacher(id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteTeacherCategory = (id: number, teachersCount: number) => {
    try {
      if (!window.confirm("Ви дійсно хочете видалити категорію?")) return

      if (teachersCount > 0) {
        alert("В категорії не повинно бути викладачів")
      } else {
        dispatch(deleteTeacherCategory(id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeVisible = (id: number) => {
    dispatch(handleTeacherVisible(id))
  }

  return (
    <>
      <UpdateTeacherModal
        editingTeacher={editingTeacher}
        open={isUpdateTeacherModalOpen}
        setOpen={setIsUpdateTeacherModalOpen}
      />
      <UpdateTeachersCategoryForm
        open={isUpdateCategoryModalOpen}
        setOpen={setIsUpdateCategoryModalOpen}
        editingTeacherCategory={editingTeacherCategory}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        {/* Категорії (відділення) */}
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">Викладачі</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} md={10} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid
            item
            xs={8}
            sx={{ borderRadius: "8px", backgroundColor: "#fff", border: "1px solid #e6ebf1", overflow: "hidden" }}
          >
            {/* TEACHERS LIST */}
            {!teachersCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
            {!teachersCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
            {!!teachersCategories?.length && (
              <AccordionItemsList
                accordionType={"teacher"}
                items={teachersCategories}
                /* @ts-ignore */
                onEditItem={setEditingTeacher}
                onDeleteItem={onDeleteTeacher}
                onChangeVisible={onChangeVisible}
                onEditMainItem={setEditingTeacherCategory}
                onDeleteMainItem={onDeleteTeacherCategory}
                setIsUpdateItemModalOpen={setIsUpdateTeacherModalOpen}
                setIsUpdateCategoryModalOpen={setIsUpdateCategoryModalOpen}
              />
            )}
            {/* // TEACHERS LIST */}
          </Grid>

          <Grid item xs={4} sx={{ ml: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}>
                  Додати нового викладача
                </Typography>

                <CreateTeacherForm editingTeacher={null} />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}>
                  Додати нову кафедру
                </Typography>

                <CreateTeachersCategoryForm editingTeacherCategory={null} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { TeachersPage }
