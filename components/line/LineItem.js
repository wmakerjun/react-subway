import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import LineDeleteButton from "./LineDeleteButton";
import LineEditDialogButton from "./LineEditDialogButton";

export default function LineItem({ line, onDelete, setLines }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <div>
            <LineEditDialogButton line={line} setLines={setLines} />
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
