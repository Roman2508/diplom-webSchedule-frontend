import { SettingOutlined } from "@ant-design/icons"
// assets
import { DashboardOutlined } from "@ant-design/icons"
import { ApartmentOutlined } from "@ant-design/icons"
import { ProfileOutlined } from "@ant-design/icons"
import { BookOutlined } from "@ant-design/icons"
import { GroupOutlined } from "@ant-design/icons"
import { AppstoreOutlined } from "@ant-design/icons"
import { ReadOutlined } from "@ant-design/icons"
import { UserOutlined } from "@ant-design/icons"
import { CalendarOutlined } from "@ant-design/icons"
import { FormOutlined } from "@ant-design/icons"
import { FileSearchOutlined } from "@ant-design/icons"

// icons
const icons = {
  DashboardOutlined,
  ApartmentOutlined,
  ProfileOutlined,
  BookOutlined,
  GroupOutlined,
  AppstoreOutlined,
  ReadOutlined,
  UserOutlined,
  CalendarOutlined,
  FormOutlined,
  FileSearchOutlined,
  SettingOutlined,
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "groups",
      title: "Групи",
      type: "item",
      url: "/groups",
      icon: icons.ApartmentOutlined,
      breadcrumbs: false,
    },
    {
      id: "teachers",
      title: "Викладачі",
      type: "item",
      url: "/teachers",
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: "auditories",
      title: "Аудиторії",
      type: "item",
      url: "/auditories",
      icon: icons.AppstoreOutlined,
      breadcrumbs: false,
    },
    {
      id: "load",
      title: "Навчальне навантаження",
      type: "item",
      url: "/load",
      icon: icons.ReadOutlined,
      breadcrumbs: false,
    },
    {
      id: "distribution",
      title: "Розподіл навантаження",
      type: "item",
      url: "/distribution",
      icon: icons.ProfileOutlined,
      breadcrumbs: false,
    },
    {
      id: "timetable",
      title: "Розклад",
      type: "item",
      url: "/timetable",
      icon: icons.CalendarOutlined,
      breadcrumbs: false,
    },
    {
      id: "view-timetable",
      title: "Перегляд розкладу",
      type: "item",
      url: "/view-schedule",
      icon: icons.CalendarOutlined,
      breadcrumbs: false,
    },
    {
      id: "settings",
      title: "Налаштування",
      type: "item",
      url: "/settings",
      icon: icons.SettingOutlined,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
