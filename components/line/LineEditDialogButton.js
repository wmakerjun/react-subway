import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SwatchesPicker } from "react-color";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import lineApi from "../../apis/lineApi";
import stationApi from "../../apis/stationApi";
import { SNACKBAR_MESSAGES } from "../../constants";

export default function LineEditDialogButton({
  line,
  setLines,
  setSnackbar,
  setMessage,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(line.name);
  const [stations, setStations] = useState([]);
  const [distance, setDistance] = useState(line.distance);
  const [upStationId, setUpStationId] = useState(line.upStationId);
  const [downStationId, setDownStationId] = useState(line.downStationId);
  const [extraFare, setExtraFare] = useState(line.extraFare);
  const [color, setColor] = useState(line.color);

  const onOpen = async () => {
    try {
      setOpen(true);
      const response = await stationApi.getAll();
      setStations([...response]);
    } catch (e) {
      throw new Error(e);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await lineApi.update(line.id, {
        name,
        distance,
        upStationId,
        extraFare,
        downStationId,
        color,
      });
      setMessage(SNACKBAR_MESSAGES.LINE.UPDATE.SUCCESS);
      const lines = await lineApi.getAll();
      setLines([...lines]);
    } catch (e) {
      setMessage(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
      onClose();
    }
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="delete"
        sx={{ marginRight: "2px" }}
        data-cy="line-edit-button"
        onClick={() => onOpen()}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ p: 2 }}>
          <DialogTitle sx={{ textAlign: "center" }}>노선 수정</DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent sx={{ p: 3 }}>
              <FormControl sx={{ my: 1 }} fullWidth>
                <TextField
                  label="이름"
                  type="text"
                  variant="outlined"
                  name="name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel id="up-station-label">상행 종점 *</InputLabel>
                <Select
                  labelId="up-station-label"
                  label="상행 종점 *"
                  value={upStationId || ""}
                  onChange={(e) => setUpStationId(e.target.value)}
                  required
                >
                  {stations.map((station) => (
                    <MenuItem
                      value={station.id}
                      key={station.id}
                      className="up-station-item"
                    >
                      {station.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel id="down-station-label">하행 종점 *</InputLabel>
                <Select
                  labelId="down-station-label"
                  value={downStationId || ""}
                  label="하행 종점 *"
                  onChange={(e) => setDownStationId(e.target.value)}
                  required
                >
                  {stations.map((station) => (
                    <MenuItem value={station.id} key={station.id}>
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
                  defaultValue={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ my: 1 }} fullWidth>
                <TextField
                  type="number"
                  name="extraFare"
                  label="추가 요금"
                  variant="outlined"
                  defaultValue={extraFare}
                  onChange={(e) => setExtraFare(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ my: 1 }} fullWidth>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="색상"
                    value={color}
                    variant="outlined"
                    required
                    disabled
                  />
                  <Typography sx={{ my: 1 }}>
                    노선의 색상을 아래 팔레트에서 선택해주세요.
                  </Typography>
                  <SwatchesPicker
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                  />
                </Box>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" type="submit" disableElevation>
                수정
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
