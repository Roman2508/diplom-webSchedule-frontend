// @ts-nocheck
import React, { forwardRef } from "react"
import { useTheme } from "@mui/material/styles"
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material"

import Highlighter from "./third-party/Highlighter"

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
}

interface IMainCardProps {
  border?: boolean
  boxShadow?: boolean
  contentSX?: object
  darkTitle?: boolean
  divider?: boolean
  elevation?: number
  secondary?: React.ReactNode
  shadow?: string
  sx?: object
  title?: React.ReactNode | string
  codeHighlight?: boolean
  content?: boolean
  children?: React.ReactNode
}

const MainCard = forwardRef<HTMLDivElement, IMainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    },
    ref
  ) => {
    const theme = useTheme()
    boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow:
            boxShadow && (!border || theme.palette.mode === "dark") ? shadow || theme.customShadows.z1 : "inherit",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "inherit",
          },
          "& pre": {
            m: 0,
            p: "16px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader sx={headerSX} titleTypographyProps={{ variant: "subtitle1" }} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
        )}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {/* card footer - clipboard & highlighter  */}
        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Highlighter codeHighlight={codeHighlight} main>
              {children}
            </Highlighter>
          </>
        )}
      </Card>
    )
  }
)

export default MainCard
