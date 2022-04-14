import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../../components/base/Layout";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const HEAD = {
  title: "역 관리",
  keywords: "지하철, 노선도, 지하철 노선도, 역 관리",
  description: "지하철 노선도 역 관리 페이지.",
};

export default function Station() {
  const [stations, setStations] = useState([]);

  return (
    <Layout head={HEAD}>
      <h1 className="title">역 관리</h1>
      <Card sx={{ maxWidth: 500, borderTop: "8px solid #ffc107" }}>
        <CardContent>
          <FormControl variant="outlined" sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <TextField
                label="역 이름"
                id="outlined-start-adornment"
                sx={{ m: 1, width: "100%" }}
                size="small"
                focused
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
              >
                추가
              </Button>
            </Box>
          </FormControl>

          <Divider />
          <Box>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              지하철 목록
            </Typography>
            <List>
              <ListItem
                secondaryAction={
                  <div>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{ marginRight: "2px" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              >
                <ListItemText primary="교대" />
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
      <style jsx global>{`
        .form-container {
          display: flex;
        }
      `}</style>
    </Layout>
  );
}
