import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { FaQuestionCircle, FaRobot } from "react-icons/fa"; // Icons for Question and AI

const AiAssistance = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = () => {
    if (!query) return;

    setLoading(true);
    setResponse("");

    fetch("http://localhost:6778/medicine_ai/ask_medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }), // Send the query
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.answer || "No information found.");
        setLoading(false);
        setQuery("");
      })
      .catch((error) => {
        setResponse("Error fetching medicine information.");
        setLoading(false);
      });
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8", borderRadius: "12px" }}>
      <Card
        sx={{
          padding: 3,
          bgcolor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant='h4'
            sx={{
              fontWeight: "bold",
              color: "#4caf50",
              mb: 2,
              textAlign: "center",
            }}
          >
            <FaRobot style={{ marginRight: "8px" }} />
            AI Assistance (Chatbot)
          </Typography>

          <TextField
            label='Ask a question about medicines'
            variant='outlined'
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <FaQuestionCircle
                  style={{ marginRight: "8px", color: "#4caf50" }}
                />
              ),
            }}
          />

          <Button
            variant='contained'
            sx={{
              bgcolor: "#4caf50",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
              width: "100%",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
              transition: "background-color 0.3s ease",
            }}
            onClick={handleAskQuestion}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Ask"
            )}
          </Button>

          {response && (
            <Box sx={{ mt: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: "bold", mb: 1 }}>
                Response:
              </Typography>
              <Box
                sx={{
                  bgcolor: "#e8f5e9",
                  p: 2,
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography variant='body1' sx={{ fontStyle: "italic" }}>
                  {response}
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AiAssistance;
