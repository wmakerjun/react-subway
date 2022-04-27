import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  List,
  Typography,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import Layout from "../../components/base/Layout";
import SectionCreateDialogButton from "../../components/section/SectionCreateDialogButton";
import LineStationItem from "../../components/section/LineStationItem";
import lineApi from "../../apis/lineApi";
import { stationApi } from "../../apis";
import { HEAD, SNACKBAR_MESSAGES } from "../../constants";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../states";
import CustomSnackbar from "../../components/shared/Snackbar";

export default function Section() {
  const [line, setLine] = useState({});
  const [stations, setStations] = useState([]);
  const [lines, setLines] = useState([]);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const stationResponse = await stationApi.getAll();
      const lineResponse = await lineApi.getAll();
      setStations([...stationResponse]);
      setLines([...lineResponse]);
    };
    fetchData();
  }, []);

  const onDelete = async ({ stationId }) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await lineApi.deleteLineStation({
        lineId: line.id,
        stationId: stationId,
      });
      setMessage(SNACKBAR_MESSAGES.SECTION.DELETE.SUCCESS);
      const lineResponse = await lineApi.get(line.id);
      setLine({ ...lineResponse });
    } catch {
      setMessage(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  const onChangeLine = async (e) => {
    try {
      const lineResponse = await lineApi.get(e.target.value);
      await setLine({ ...lineResponse });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Layout head={HEAD.SECTION}>
      <Card sx={{ width: 500, borderTop: "8px solid #ffc107" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
            구간 관리
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="line">노선을 선택해주세요</InputLabel>
            <Select
              labelId="line"
              label="노선을 선택해주세요"
              value={line.id || ""}
              onChange={onChangeLine}
              data-cy="line-select"
            >
              {lines.map((line) => (
                <MenuItem value={line.id} key={line.id} data-cy="line-item">
                  {line.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {line && (
            <List data-cy="section-list">
              <Box
                sx={{
                  backgroundColor: line.color,
                  py: 1,
                  px: 2,
                  borderRadius: "5px",
                  mb: 3,
                }}
              >
                <Typography variant="h6">{line.name}</Typography>
              </Box>
              {line.stations?.length > 0 && (
                <>
                  <SectionCreateDialogButton
                    line={line}
                    stations={stations}
                    setLine={setLine}
                    setSnackbar={setSnackbar}
                    setMessage={setMessage}
                  />
                  {line.stations.map((station) => (
                    <LineStationItem
                      key={station.id}
                      station={station}
                      onDelete={onDelete}
                    />
                  ))}
                </>
              )}
            </List>
          )}
        </CardContent>
      </Card>
      <CustomSnackbar message={message} />
    </Layout>
  );
}
