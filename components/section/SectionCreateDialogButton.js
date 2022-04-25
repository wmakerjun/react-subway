import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import lineApi from "../../apis/lineApi";
import AddIcon from "@mui/icons-material/Add";
import { SNACKBAR_MESSAGES } from "../../constants";

export default function SectionCreateDialogButton({
  line,
  stations = [],
  setLine,
  setSnackbar,
  setMessage,
}) {
  const [open, setOpen] = useState(false);
  const [distance, setDistance] = useState(0);
  const [upStationId, setUpStationId] = useState("");
  const [downStationId, setDownStationId] = useState("");

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await lineApi.addLineStations({
        lineId: line.id,
        data: {
          upStationId,
          downStationId,
          distance,
        },
      });
      setMessage(SNACKBAR_MESSAGES.SECTION.CREATE.SUCCESS);
      const data = await lineApi.get(line.id);
      setLine({ ...data });
      onClose();
    } catch {
      setMessage(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: "10px",
          top: "30px",
        }}
      >
        <Fab color="primary" aria-label="add" onClick={onOpen} size="medium">
          <AddIcon />
        </Fab>
      </Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{line.name}의 구간 생성</DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <FormControl sx={{ my: 1 }} fullWidth>
              <InputLabel id="up-station-label">상행 종점</InputLabel>
              <Select
                labelId="up-station-label"
                label="상행 종점"
                value={upStationId}
                onChange={(e) => setUpStationId(e.target.value)}
                data-cy="up-station-select"
                required
              >
                {stations.map((station) => (
                  <MenuItem
                    value={station.id}
                    key={station.id}
                    data-cy="up-station-item"
                  >
                    {station.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ my: 1 }} fullWidth>
              <InputLabel id="down-station-label">하행 종점</InputLabel>
              <Select
                labelId="down-station-label"
                value={downStationId}
                label="하행 종점"
                onChange={(e) => setDownStationId(e.target.value)}
                data-cy="down-station-select"
                required
              >
                {stations.map((station) => (
                  <MenuItem
                    value={station.id}
                    key={station.id}
                    data-cy="down-station-item"
                  >
                    {station.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ my: 1 }} fullWidth>
              <TextField
                type="number"
                name="distance"
                label="거리"
                variant="outlined"
                onChange={(e) => setDistance(Number(e.target.value))}
                required
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit">생성</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
