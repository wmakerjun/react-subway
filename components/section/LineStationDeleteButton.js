import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LineStationDeleteButton({ onDelete, station }) {
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      data-cy="section-delete-button"
      onClick={() => onDelete({ stationId: station.id })}
    >
      <DeleteIcon />
    </IconButton>
  );
}
