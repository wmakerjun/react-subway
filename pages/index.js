import Layout from "../components/base/Layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { apiUrlState, snackbarState } from "../states";
import CustomSnackbar from "../components/shared/Snackbar";
import { SNACKBAR_MESSAGES } from "../constants";

export default function Home() {
  const [apiUrl, setApiUrl] = useRecoilState(apiUrlState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [message, setMessages] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setApiUrl(e.target.url.value);
      setMessages(SNACKBAR_MESSAGES.API.SUCCESS);
    } catch (e) {
      setMessages(SNACKBAR_MESSAGES.COMMON.FAIL);
    } finally {
      setSnackbar(true);
    }
  };

  return (
    <Layout>
      <Card sx={{ width: 500, borderTop: "8px solid #ffc107" }}>
        <CardMedia
          component="img"
          height="140"
          image="https://image.ytn.co.kr/general/jpg/2016/1030/201610301500061364_img_0.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h6" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
            지하철 노선 관리
          </Typography>
          <Box sx={{ p: 2 }}>
            <Typography>
              지하철 노선 관리 페이지에 오신것을 환영합니다. 🎉
            </Typography>

            <form onSubmit={onSubmit}>
              <Box sx={{ mb: 1 }}>
                <FormControl variant="outlined" sx={{ width: "100%", mt: 2 }}>
                  <TextField
                    label="ip 주소"
                    type="text"
                    variant="outlined"
                    defaultValue={apiUrl || ""}
                    name="url"
                  />
                </FormControl>
                <Button
                  sx={{ width: "100%", height: "40px", mt: 1 }}
                  size="small"
                  variant="contained"
                  disableElevation
                  type="submit"
                >
                  업데이트
                </Button>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
      <CustomSnackbar message={message} />
    </Layout>
  );
}
