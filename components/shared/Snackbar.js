import { Snackbar } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import { snackbarState } from "../../states";

export default function CustomSnackbar({ message = "asd" }) {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  return (
    <Snackbar
      open={snackbar}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={handleClose}
      message={message}
    />
  );
}
