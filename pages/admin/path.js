import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Layout from "../../components/base/Layout";
import stationApi from "../../apis/stationApi";
import pathApi from "../../apis/pathApi";
import PathResult from "../../components/path/PathResult";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HEAD, SNACKBAR_MESSAGES } from "../../constants";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../states";
import CustomSnackbar from "../../components/shared/Snackbar";

export default function PathAdmin() {
  const [stations, setStations] = useState([]);
  const [sourceStationId, setSourceStationId] = useState("");
  const [targetStationId, setTargetStationId] = useState("");
  const [age, setAge] = useState(0);
  const [pathResult, setPathResult] = useState("");
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await stationApi.getAll();
      setStations([...response]);
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await pathApi.getShortestPath({
        sourceId: sourceStationId,
        targetId: targetStationId,
        age
      });
      setPathResult({ ...response });
      setMessage(SNACKBAR_MESSAGES.PATH.FIND.SUCCESS);
    } catch {
      setMessage(SNACKBAR_MESSAGES.PATH.FIND.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  return (
    <Layout head={HEAD.PATH}>
      <Card sx={{ width: 500, borderTop: "8px solid #ffc107" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
            경로 검색
          </Typography>
          <Box>
            <form onSubmit={onSubmit}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <FormControl sx={{ mr: 1 }} fullWidth>
                  <InputLabel id="source-station-label">출발역</InputLabel>
                  <Select
                    labelId="source-station-label"
                    label="출발역"
                    value={sourceStationId}
                    onChange={(e) => setSourceStationId(e.target.value)}
                    required
                  >
                    {stations.map((station) => (
                      <MenuItem value={station.id} key={station.id}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <ArrowForwardIcon />
                <FormControl sx={{ ml: 1 }} fullWidth>
                  <InputLabel id="target-station-label">도착역</InputLabel>
                  <Select
                    labelId="target-station-label"
                    label="도착역"
                    value={targetStationId}
                    onChange={(e) => setTargetStationId(e.target.value)}
                    required
                  >
                    {stations.map((station) => (
                      <MenuItem value={station.id} key={station.id}>
                        {station.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <FormControl sx={{ my: 1 }} fullWidth>
                <TextField
                  type="number"
                  name="age"
                  label="나이"
                  variant="outlined"
                  defaultValue={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%" }}
                disableElevation
                disabled={!(sourceStationId && targetStationId)}
              >
                검색
              </Button>
            </form>
            <Divider />
            {pathResult && <PathResult pathResult={pathResult} />}
          </Box>
        </CardContent>
      </Card>
      <CustomSnackbar message={message} />
    </Layout>
  );
}
