import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CheckDataset() {
  const [datasetId, setDatasetId] = useState("");
  const [datasetRes, setDatasetRes] = useState("");
  const { user } = useStore();
  const navigate = useNavigate();

  const getRepoMetadata = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://huggingface.co/api/datasets/${datasetId}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setDatasetRes(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      setDatasetRes(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (!user) {
      console.error("User not logged in");
      navigate("/");
      return;
    }
  }, [user]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6">Dataset Repo ID:</Typography>
      <TextField
        value={datasetId}
        placeholder="username/dataset"
        onChange={(e) => setDatasetId(e.target.value)}
      />
      <Button variant="contained" type="submit" onClick={getRepoMetadata}>
        Check
      </Button>
      {datasetRes && <Typography component="pre">{datasetRes}</Typography>}
    </Box>
  );
}
