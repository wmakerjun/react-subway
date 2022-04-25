import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import LineDeleteButton from "./LineDeleteButton";
import LineEditDialogButton from "./LineEditDialogButton";

export default function LineItem({
  line,
  onDelete,
  setLines,
  setSnackbar,
  setMessage,
}) {
  return (
    <>
      <ListItem
        secondaryAction={
          <div>
            <LineEditDialogButton
              line={line}
              setLines={setLines}
              setSnackbar={setSnackbar}
              setMessage={setMessage}
            />
            <LineDeleteButton onDelete={onDelete} line={line} />
          </div>
        }
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          <DirectionsSubwayIcon sx={{ color: line.color }} />
        </ListItemIcon>
        <ListItemText primary={line.name}></ListItemText>
      </ListItem>
    </>
  );
}
