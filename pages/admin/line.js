import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  List,
  Typography,
  Divider,
} from "@mui/material";
import Layout from "../../components/base/Layout";
import LineItem from "../../components/line/LineItem";
import LineCreateDialogButton from "../../components/line/LineCreateDialogButton";
import stationApi from "../../apis/stationApi";
import lineApi from "../../apis/lineApi";
import { HEAD, SNACKBAR_MESSAGES } from "../../constants";
import { snackbarState } from "../../states";
import CustomSnackbar from "../../components/shared/Snackbar";
import { useRecoilState } from "recoil";

export default function LineAdmin() {
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

  const onDelete = async (id) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await lineApi.delete(id);
      const lines = await lineApi.getAll();
      setLines([...lines]);
      setMessage(SNACKBAR_MESSAGES.LINE.DELETE.SUCCESS);
    } catch {
      setMessage(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  return (
    <Layout head={HEAD.LINE}>
      <Card sx={{ width: 500, borderTop: "8px solid #ffc107" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
            노선 관리
          </Typography>
          <Divider />
          <LineCreateDialogButton
            setLines={setLines}
            setSnackbar={setSnackbar}
            setMessage={setMessage}
          />
          <Box>
            <Typography variant="h6" sx={{ ml: 2 }}>
              노선 목록
            </Typography>
            <List data-cy="line-list">
              {lines.map((line) => (
                <LineItem
                  key={line.id}
                  line={line}
                  stations={stations}
                  onDelete={onDelete}
                  setLines={setLines}
                  setSnackbar={setSnackbar}
                  setMessage={setMessage}
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
