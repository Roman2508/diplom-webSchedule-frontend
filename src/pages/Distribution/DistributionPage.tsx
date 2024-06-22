import React from "react"
import { useSelector } from "react-redux"
import { FilterOutlined } from "@ant-design/icons"
import { Grid, Divider, Tooltip, Typography, IconButton } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import { authSelector } from "../../store/auth/authSlice"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupLessonsType } from "../../store/groups/groupsTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { TeachersCategoryType } from "../../store/teachers/teachersTypes"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { getGroup, getGroupCategories } from "../../store/groups/groupsAsyncActions"
import { SelectGroupModal } from "../../components/DistributionPage/SelectGroupModal"
import { AccordionItemsList } from "../../components/AccordionItemsList/AccordionItemsList"
import { DistributionLessonsTable } from "../../components/DistributionPage/DistributionLessonsTable"
import DistributionTeachersToLessons from "../../components/DistributionPage/DistributionTeachersToLessons"

const DistributionPage = () => {
  const dispatch = useAppDispatch()

  const { auth } = useSelector(authSelector)
  const { teachersCategories, loadingStatus } = useSelector(teachersSelector)
  const { groupCategories, group, loadingStatus: groupsLoadingStatus } = useSelector(groupsSelector)

  const [selectedGroupId, setSelectedGroupId] = React.useState<number | null>(null)
  const [selectGroupModalVisible, setSelectGroupModalVisible] = React.useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<null | GroupLessonsType[]>(null)
  const [availableTeachersCategories, setAvailableTeachersCategories] = React.useState<TeachersCategoryType[]>([])

  React.useEffect(() => {
    dispatch(getTeachersCategories())

    if (!groupCategories) {
      dispatch(getGroupCategories())
    }
  }, [])

  React.useEffect(() => {
    if (selectedGroupId) {
      dispatch(getGroup(String(selectedGroupId)))
    }
  }, [selectedGroupId])

  React.useEffect(() => {
    if (!teachersCategories || !auth) return
    if (auth.access === "admin" || auth.access === "super_admin") {
      setAvailableTeachersCategories(teachersCategories)
    } else {
      const categories = teachersCategories.filter((el) => el.id === auth.department?.id)
      console.log(categories, auth)
      setAvailableTeachersCategories(categories)
    }
  }, [teachersCategories, auth])

  return (
    <>
      <SelectGroupModal
        open={selectGroupModalVisible}
        groupCategories={groupCategories}
        setOpen={setSelectGroupModalVisible}
        setSelectedGroupId={setSelectedGroupId}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Розподіл навантаження</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid item xs={4}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase", px: 2 }}
                >
                  {group.id ? `Навантаження групи: ${group.name}` : "Виберіть групу"}
                </Typography>

                <Tooltip title="Вибрати групу">
                  <IconButton onClick={() => setSelectGroupModalVisible(true)}>
                    <FilterOutlined />
                  </IconButton>
                </Tooltip>
              </div>

              <Divider />

              {/* DISTRIBUTION TABLE */}
              {!group.id && groupsLoadingStatus === LoadingStatusTypes.LOADING ? <LoadingSpinner /> : ""}
              {!group.id && groupsLoadingStatus !== LoadingStatusTypes.LOADING ? <EmptyCard /> : ""}
              {group.id ? (
                <DistributionLessonsTable
                  groupLoad={group.lessons}
                  selectedLesson={selectedLesson}
                  setSelectedLesson={setSelectedLesson}
                  groupsLoadingStatus={groupsLoadingStatus}
                />
              ) : (
                ""
              )}
              {/* // DISTRIBUTION TABLE */}
            </MainCard>
          </Grid>

          <Grid item xs={4} sx={{ mx: 2 }}>
            {/* DISTRIBUTION LESSONS */}
            <DistributionTeachersToLessons
              auth={auth}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              selectedTeacherId={selectedTeacherId}
            />
            {/* // DISTRIBUTION LESSONS */}
          </Grid>

          <Grid item xs={4} sx={{ borderRadius: "8px", border: "1px solid #e6ebf1", overflow: "hidden" }}>
            <MainCard>
              <Typography variant="button" sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}>
                Викладачі
              </Typography>
            </MainCard>

            {/* TEACHERS LIST */}
            {!teachersCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
            {!teachersCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
            {teachersCategories?.length && (
              <AccordionItemsList
                items={availableTeachersCategories}
                selectedItemId={selectedTeacherId}
                onSelectItem={setSelectedTeacherId}
              />
            )}
            {/* // TEACHERS LIST */}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { DistributionPage }
