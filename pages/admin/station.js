import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/base/Layout";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import StationListItem from "../../components/station/StationListItem";
import stationApi from "../../apis/stationApi";
import { HEAD, SNACKBAR_MESSAGES } from "../../constants";
import CustomSnackbar from "../../components/shared/Snackbar";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../states";

export default function StationAdmin() {
  const [name, setName] = useState("");
  const [stations, setStations] = useState([]);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [message, setMessages] = useState("");

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
      await stationApi.create({ name });
      const response = await stationApi.getAll();
      setStations([...response]);
      setMessages(SNACKBAR_MESSAGES.STATION.CREATE.SUCCESS);
    } catch (e) {
      setMessages(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setName("");
      setSnackbar(true);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await stationApi.delete({ id });
      const response = await stationApi.getAll();
      setStations([...response]);
      setMessages(SNACKBAR_MESSAGES.STATION.DELETE.SUCCESS);
    } catch {
      setMessages(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  return (
    <Layout head={HEAD.STATION}>
      <Card sx={{ width: 500, borderTop: "8px solid #ffc107" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
            역 관리
          </Typography>
          <form onSubmit={onSubmit}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", mb: 1 }}>
                <TextField
                  label="역 이름"
                  data-cy="station-name-input"
                  sx={{ m: 1, width: "100%" }}
                  size="small"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsSubwayIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  sx={{ height: "40px", mt: 1 }}
                  size="small"
                  variant="contained"
                  disableElevation
                  type="submit"
                  disabled={name.length < 1}
                >
                  추가
                </Button>
              </Box>
            </FormControl>
          </form>

          <Divider />
          <Box>
            <Typography sx={{ mt: 4, mb: 2, ml: 2 }} variant="h6">
              지하철 역 목록
            </Typography>
            <List data-cy="station-list">
              {stations?.length > 0 &&
                stations.map((station, index) => (
                  <StationListItem
                    key={index}
                    station={station}
                    onDelete={onDelete}
                  />
                ))}
            </List>
          </Box>
        </CardContent>
      </Card>
      <CustomSnackbar message={message} />
    </Layout>
  );
}
