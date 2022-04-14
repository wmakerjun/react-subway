import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LineDeleteButton({ onDelete, line }) {
  return (
    <IconButton
      edge="end"
      aria-label="delete"
      data-cy="line-delete-button"
      onClick={() => onDelete(line.id)}
    >
      <DeleteIcon />
    </IconButton>
  );
}
