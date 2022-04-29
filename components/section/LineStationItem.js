import { ListItem, ListItemText } from "@mui/material";
import LineStationDeleteButton from "./LineStationDeleteButton";

export default function LineStationItem({ station, onDelete }) {
  return (
    <ListItem
      secondaryAction={
        <LineStationDeleteButton
          onDelete={onDelete}
          station={station}
        />
      }
    >
      <ListItemText primary={station.name}></ListItemText>
    </ListItem>
  );
}
