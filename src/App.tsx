import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"

import "./App.css"
import ThemeCustomization from "./themes"
import MainLayout from "./layout/MainLayout"
import ScrollTop from "./components/ScrollTop"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch } from "./store/store"
import { LoadPage } from "./pages/Load/LoadPage"
import MinimalLayout from "./layout/MinimalLayout"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import { authMe } from "./store/auth/authAsyncActions"
import { GroupsPage } from "./pages/Groups/GroupsPage"
import FullGroupPage from "./pages/FullGroup/FullGroupPage"
import { TeachersPage } from "./pages/Teachers/TeachersPage"
import { SettingsPage } from "./pages/Settings/SettingsPage"
import { DefaultPage } from "./pages/DefaultPage/DefaultPage"
import { TimetablePage } from "./pages/Timetable/TimetablePage"
import { AuditoriesPage } from "./pages/Auditories/AuditoriesPage"
import { DistributionPage } from "./pages/Distribution/DistributionPage"
import { ViewTimetablePage } from "./pages/ViewTimetablePage/ViewTimetablePage"

// const DashboardDefault = Loadable(lazy(() => import("./pages/dashboard")))

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = window.localStorage.getItem("webSchedule-token")

    if (token) {
      dispatch(authMe({ token }))
    } else {
      navigate("/")
    }
  }, [])

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<GroupsPage />} path="/groups" />
            <Route element={<FullGroupPage />} path="/groups/:id" />
            <Route element={<FullGroupPage />} path="/groups/create/:categoryId" />
            <Route element={<TeachersPage />} path="/teachers" />
            <Route element={<AuditoriesPage />} path="/auditories" />
            <Route element={<LoadPage />} path="/load" />
            <Route element={<DistributionPage />} path="/distribution" />
            <Route element={<TimetablePage />} path="/timetable" />
            <Route element={<SettingsPage />} path="/settings" />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route element={<DefaultPage />} path="/" />
            <Route element={<AuthPage />} path="/auth" />
            <Route element={<ViewTimetablePage />} path="/view-schedule" />
          </Route>
        </Routes>
      </ScrollTop>
    </ThemeCustomization>
  )
}

export default App
