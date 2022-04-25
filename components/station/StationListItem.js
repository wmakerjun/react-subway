import { IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StationListItem({ station, onDelete }) {
  return (
    <ListItem
      secondaryAction={
        <div>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(station.id)}
            data-cy="station-delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      }
    >
      <ListItemText primary={station.name} />
    </ListItem>
  );
}
