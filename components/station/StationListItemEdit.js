import { Box, Button, FormControl, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";

export default function ({ onEditHandler, toggleEditMode, station }) {
  const [name, setName] = useState(station.name);

  return (
    <ListItem sx={{ pl: 1 }}>
      <form onSubmit={onEditHandler} data-id={station.id}>
        <FormControl variant="outlined" sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", mb: 1 }}>
            <TextField
              label="역 이름"
              sx={{ m: 1, width: "100%" }}
              size="small"
              name="name"
              className="station-name-edit-input"
              defaultValue={station.name}
              onChange={(e) => onEditName(e.target.value)}
              focused
            />
            <Button
              sx={{ height: "40px", mt: 1 }}
              size="small"
              variant="contained"
              disableElevation
              type="submit"
            >
              확인
            </Button>
            <Button
              sx={{ height: "40px", mt: 1, ml: 1 }}
              size="small"
              disableElevation
              type="button"
              onClick={() => toggleEditMode()}
            >
              취소
            </Button>
          </Box>
        </FormControl>
      </form>
    </ListItem>
  );
}
