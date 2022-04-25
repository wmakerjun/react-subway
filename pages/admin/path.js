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
} from "@mui/material";
import Layout from "../../components/base/Layout";
import stationApi from "../../apis/stationApi";
import pathApi from "../../apis/pathApi";
import PathResult from "../../components/path/PathResult";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HEAD } from "../../constants";

export default function PathAdmin() {
  const [stations, setStations] = useState([]);
  const [sourceStationId, setSourceStationId] = useState("");
  const [targetStationId, setTargetStationId] = useState("");
  const [pathResult, setPathResult] = useState("");

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
      });
      setPathResult({ ...response });
    } catch (e) {
      throw new Error(e);
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
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%" }}
                disableElevation
                disabled={!sourceStationId || !targetStationId}
              >
                검색
              </Button>
            </form>
            <Divider />
            {pathResult && <PathResult pathResult={pathResult} />}
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}
