import React from "react"
import { useSelector } from "react-redux"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { Grid, Divider, Typography, List, ListItemButton, ListItemText, Collapse, Paper } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupLoadTable } from "../../components/LoadPage/GroupLoadTable"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { CreateLessonForm } from "../../components/LoadPage/CreateLessonForm"
import { GroupLessonsType, GroupsShortType } from "../../store/groups/groupsTypes"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { getGroup, getGroupCategories } from "../../store/groups/groupsAsyncActions"
import { SelectGroupModal } from "../../components/DistributionPage/SelectGroupModal"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"

const LoadPage = () => {
  const dispatch = useAppDispatch()

  const { groupCategories, group, loadingStatus } = useSelector(groupsSelector)

  const [openCategoryId, setOpenCategoryId] = React.useState<number | null>(null)
  const [selectedGroup, setSelectedGroup] = React.useState<GroupsShortType | null>(null)

  const handleOpenCategory = (id: number) => {
    if (id === openCategoryId) {
      setOpenCategoryId(null)
    } else {
      setOpenCategoryId(id)
    }
  }

  React.useEffect(() => {
    dispatch(getTeachersCategories())

    if (!groupCategories) {
      dispatch(getGroupCategories())
    }
  }, [])

  React.useEffect(() => {
    if (selectedGroup) {
      dispatch(getGroup(String(selectedGroup.id)))
    }
  }, [selectedGroup])

  return (
    <>
      <Grid container sx={{ justifyContent: "center", maxWidth: "1300px", margin: "0 auto" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item sx={{ flex: 1 }}>
              <Typography variant="h5">Навчальне навантаження</Typography>
            </Grid>
            {selectedGroup && (
              <Grid item>
                <Typography variant="h5">{"Група: " + selectedGroup.name}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start", pt: 4 }}>
          <Grid item xs={4}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1, pb: 0 } }}>
              <Typography sx={{ mb: 2, textAlign: "center" }}>ГРУПИ</Typography>

              <List>
                {groupCategories ? (
                  groupCategories.map((category) => {
                    return (
                      <React.Fragment key={category.id}>
                        <Divider />
                        <ListItemButton onClick={() => handleOpenCategory(category.id)}>
                          <ListItemText
                            sx={{
                              mr: 1,
                              "& span": { whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis" },
                            }}
                            primary={category.name}
                          />
                          {category.id === openCategoryId ? <UpOutlined /> : <DownOutlined />}
                        </ListItemButton>
                        <Divider />
                        <Collapse in={category.id === openCategoryId} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {category.groups.map((group) => (
                              <React.Fragment key={group.id}>
                                <ListItemButton
                                  sx={{ py: "4px", pl: 5 }}
                                  selected={group.id === selectedGroup?.id}
                                  onClick={() => setSelectedGroup(group)}
                                >
                                  <ListItemText primary={group.name} />
                                </ListItemButton>
                                <Divider />
                              </React.Fragment>
                            ))}
                          </List>
                        </Collapse>
                      </React.Fragment>
                    )
                  })
                ) : (
                  <LoadingSpinner />
                )}
              </List>
            </MainCard>
          </Grid>

          <Grid item xs={3} sx={{ mx: 2 }}>
            <MainCard sx={{ px: 2, "& .MuiCardContent-root": { px: 1 } }}>
              <CreateLessonForm editingLesson={null} selectedGroupId={selectedGroup?.id} />
            </MainCard>
          </Grid>

          <Grid item xs={5} sx={{ borderRadius: "8px", border: "1px solid #e6ebf1", overflow: "hidden" }}>
            <MainCard>
              <Typography variant="button" sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}>
                Навчальне навантаження групи
              </Typography>
            </MainCard>

            <Paper>
              {!group.id && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
              {!Boolean(group.lessons?.length) && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
              {Boolean(group.lessons?.length) && <GroupLoadTable lessons={group.lessons} />}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { LoadPage }
