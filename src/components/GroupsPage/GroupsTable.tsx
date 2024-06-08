import { Link as RouterLink } from "react-router-dom"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction, useState } from "react"

// material-ui
import {
  Box,
  Link,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  SortDirection,
  TableContainer,
} from "@mui/material"
import { useAppDispatch } from "../../store/store"
import { GroupCategoriesType, GroupsShortType } from "../../store/groups/groupsTypes"

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

interface IHeadCells {
  id: string
  align: "center" | "left" | "right" | "inherit" | "justify"
  disablePadding: boolean
  label: string
}

const headCells: IHeadCells[] = [
  {
    id: "trackingNo",
    align: "center",
    disablePadding: false,
    label: "Назва",
  },
  {
    id: "name",
    align: "center",
    disablePadding: true,
    label: "Курс",
  },
  {
    id: "fat",
    align: "center",
    disablePadding: false,
    label: "Студентів",
  },
  {
    id: "carbs",
    align: "center",
    disablePadding: false,

    label: "Дії",
  },
]

// ==============================|| ORDER TABLE - HEADER ||============================== //

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ order, orderBy }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? (order as SortDirection) : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// ==============================|| ORDER TABLE ||============================== //

interface IGroupsTableProps {
  groups: GroupsShortType[]
  onDeleteEntity: (type: "category" | "group", id: number) => void
  setActiveGroupCategory: Dispatch<SetStateAction<GroupCategoriesType | null>>
}

const GroupsTable: React.FC<IGroupsTableProps> = ({ groups, onDeleteEntity, setActiveGroupCategory }) => {
  const dispatch = useAppDispatch()

  const [order] = useState("asc")
  const [orderBy] = useState("trackingNo")
  const [selected] = useState([])

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-of-type": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {groups.map((group, index) => {
              const isItemSelected = isSelected(group.id)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={group.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left" sx={{ p: "4px 12px" }}>
                    <Link color="secondary" component={RouterLink} to={`/groups/${group.id}`}>
                      {group.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center" sx={{ p: "4px 12px" }}>
                    {group.courseNumber}
                  </TableCell>
                  <TableCell align="center" sx={{ p: "4px 12px" }}>
                    {group.students}
                  </TableCell>
                  <TableCell align="center" sx={{ p: "4px 12px" }}>
                    <Link component={RouterLink} to={`/groups/${group.id}`}>
                      <Tooltip title="Редагувати групу">
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    <Tooltip title="Видалити групу">
                      <IconButton sx={{ ml: "5px" }} onClick={() => onDeleteEntity("group", group.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export { GroupsTable }
