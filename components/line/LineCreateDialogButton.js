import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SwatchesPicker } from "react-color";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import lineApi from "../../apis/lineApi";
import stationApi from "../../apis/stationApi";

export default function LineCreateDialogButton({ setLines }) {
  const [open, setOpen] = useState(false);
  const [stations, setStations] = useState([]);
  const [name, setName] = useState("");
  const [distance, setDistance] = useState(0);
  const [upStationId, setUpStationId] = useState("");
  const [downStationId, setDownStationId] = useState("");
  const [extraFare, setExtraFare] = useState(0);
  const [color, setColor] = useState("");

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
      await lineApi.create({
        name,
        distance,
        upStationId,
        downStationId,
        extraFare,
        color,
      });
      const lines = await lineApi.getAll();
      setLines([...lines]);
    } catch (e) {
      throw new Error(e);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "relative",
          top: "-25px",
        }}
      >
        <Fab color="primary" aria-label="add" onClick={onOpen} size="medium">
          <AddIcon />
        </Fab>
      </Box>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ p: 2 }}>
          <DialogTitle sx={{ textAlign: "center" }}>노선 생성</DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent sx={{ p: 3 }}>
              <FormControl sx={{ my: 1 }} fullWidth>
                <TextField
                  label="이름"
                  type="text"
                  variant="outlined"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl sx={{ my: 1 }} fullWidth>
                <InputLabel id="up-station-label">상행 종점</InputLabel>
                <Select
                  labelId="up-station-label"
                  label="상행 종점"
                  value={upStationId}
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
                <InputLabel id="down-station-label">하행 종점</InputLabel>
                <Select
                  labelId="down-station-label"
                  value={downStationId}
                  label="하행 종점"
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
                    className="color-picker"
                    onChangeComplete={(color) => setColor(color.hex)}
                  />
                </Box>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" type="submit" disableElevation>
                생성
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
