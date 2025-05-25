import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { FaRobot, FaRegPaperPlane } from "react-icons/fa";

const AnalyzeStocks = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:6778/product/view_products"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(token);

  const handleUserInput = () => {
    if (userInput.trim()) {
      setMessages([...messages, { sender: "user", text: userInput }]);
      setUserInput("");
      setLoading(true);

      fetch("http://localhost:6778/analyze/analyze_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: products.map((product) => ({
            productName: product.productName,
            stock: product.stock,
          })),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: data.analysisResult },
          ]);
          setLoading(false);
        })
        .catch((error) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Error analyzing stock levels." },
          ]);
          setLoading(false);
        });
    }
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", p: 3, maxWidth: "800px", margin: "auto" }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        <FaRobot style={{ marginRight: "8px", fontSize: "30px" }} />
        Chatbot: Analyze Stocks
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          p: 3,
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: message.sender === "user" ? "row-reverse" : "row",
              mb: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: message.sender === "user" ? "#4caf50" : "#ccc",
                color: "black",
                textAlign: "left",
                borderRadius: "16px",
                padding: "8px 16px",
                maxWidth: "75%",
              }}
            >
              {message.text}
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          variant='outlined'
          fullWidth
          sx={{
            mr: 1,
            borderRadius: "16px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          placeholder='Ask a question about the stock...'
        />
        <IconButton
          onClick={handleUserInput}
          sx={{
            bgcolor: "#4caf50",
            color: "#fff",
            padding: "12px",
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "#388e3c",
            },
          }}
        >
          <FaRegPaperPlane />
        </IconButton>
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant='contained'
          sx={{
            bgcolor: "#ff5722",
            color: "#fff",
            padding: "12px 24px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
          onClick={handleUserInput}
        >
          Analyze Now
        </Button>
      </Box>
    </Box>
  );
};

export default AnalyzeStocks;
