import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FaEye, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

const OrderHistory = () => {
  // Dummy order data
  const orders = [
    {
      id: 1,
      date: "2023-10-12",
      product: "Medicine A",
      quantity: 10,
      totalPrice: "$200",
    },
    {
      id: 2,
      date: "2023-10-15",
      product: "Medicine B",
      quantity: 5,
      totalPrice: "$125",
    },
    {
      id: 3,
      date: "2023-10-20",
      product: "Medicine C",
      quantity: 8,
      totalPrice: "$240",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order History");
    XLSX.writeFile(wb, "order_history.xlsx");
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", p: 3 }}>
      <Typography variant='h4' sx={{ fontWeight: "bold", mb: 3 }}>
        Order History
      </Typography>

      {/* Loader */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Order Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Product
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Total Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>
                  {/* Icons for actions */}
                  <IconButton
                    onClick={() => handleViewDetails(order)}
                    sx={{
                      color: "#4caf50",
                      "&:hover": {
                        color: "#388e3c",
                      },
                    }}
                  >
                    <FaEye />
                  </IconButton>
                  <IconButton
                    onClick={handleDownload}
                    sx={{
                      color: "#ff5722",
                      "&:hover": {
                        color: "#e64a19",
                      },
                    }}
                  >
                    <FaDownload />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
          onClick={handleDownload}
        >
          Export Order History
        </Button>
      </Box>

      {/* Modal Popup for Order Details */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant='h6'>Order ID: {selectedOrder.id}</Typography>
              <Typography>Date: {selectedOrder.date}</Typography>
              <Typography>Product: {selectedOrder.product}</Typography>
              <Typography>Quantity: {selectedOrder.quantity}</Typography>
              <Typography>Total Price: {selectedOrder.totalPrice}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderHistory;
