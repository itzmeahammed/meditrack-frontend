import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { FaFileUpload, FaCamera } from "react-icons/fa"; // File and Camera icons

const PrescriptionAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      console.log("Uploaded prescription:", file);
    }
  };

  const handleAnalyze = () => {
    if (!fileName) {
      alert("Please upload a prescription first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile); // not filename, real file

    fetch("http://localhost:6778/prescription/analyze_prescription", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Medicines Found:\n${data.medicines}`);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error analyzing prescription.");
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#f4f6f8",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: "#4caf50",
        }}
      >
        <FaCamera style={{ marginRight: "8px" }} />
        Prescription Analyzer
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        {/* File Upload Section */}
        <input
          type='file'
          accept='image/*'
          onChange={handleUpload}
          id='upload-prescription'
          style={{ display: "none" }}
        />
        <label htmlFor='upload-prescription'>
          <Button
            variant='outlined'
            sx={{
              bgcolor: "#fff",
              color: "#4caf50",
              borderColor: "#4caf50",
              padding: "10px 20px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e8f5e9",
              },
              marginBottom: "20px",
            }}
            component='span'
            startIcon={<FaFileUpload />}
          >
            Upload Prescription
          </Button>
        </label>
        {fileName && (
          <Typography
            variant='body2'
            sx={{ fontStyle: "italic", color: "#4caf50" }}
          >
            {`Uploaded File: ${fileName}`}
          </Typography>
        )}
      </Box>

      {/* Analyze Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant='contained'
          onClick={handleAnalyze}
          sx={{
            bgcolor: "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            fontWeight: "bold",
            width: "250px",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
          startIcon={
            loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              <FaCamera />
            )
          }
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Prescription"}
        </Button>
      </Box>
    </Box>
  );
};

export default PrescriptionAnalyzer;
