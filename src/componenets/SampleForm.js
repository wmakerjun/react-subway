import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

export function SampleForm() {
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${address}/api/stations`);
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <form sx={{ mt: 8 }} onSubmit={handleSubmit}>
          <TextField
            label="서버 주소"
            value={address}
            onInput={(e) => setAddress(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{ mt: 1 }}
            variant="contained"
            disableElevation
          >
            제출
          </Button>
        </form>
      </Box>
    </>
  );
}
