import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2"; // For displaying line charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement, // This is needed for Pie chart
} from "chart.js"; // Import chart.js components

// Registering necessary components from Chart.js (Ensure that registration happens only once)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
  Legend,
  ArcElement // Register ArcElement for pie chart slices
);

// Dummy chart data for the dashboard
const earningsData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Total Earnings",
      data: [1000, 1200, 1500, 1300, 1700, 1800, 2000],
      borderColor: "#4caf50", // Green color for earnings
      fill: false,
    },
  ],
};

const ordersData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Total Orders",
      data: [900, 1100, 1400, 1200, 1600, 1750, 1900],
      borderColor: "#ff5722", // Orange color for orders
      fill: false,
    },
  ],
};

const stockData = {
  labels: [
    "Medicine A",
    "Medicine B",
    "Medicine C",
    "Medicine D",
    "Medicine E",
  ],
  datasets: [
    {
      data: [400, 300, 200, 100, 50],
      backgroundColor: ["#4caf50", "#ff5722", "#2196f3", "#ffc107", "#9e9e9e"],
    },
  ],
};

const salesData = {
  labels: [
    "Neptune T-shirt",
    "Ribbed Tank Top",
    "Oversized T-shirt",
    "Cotton Hoodie",
    "Wool Sweater",
  ],
  datasets: [
    {
      label: "Sales",
      data: [952, 882, 1500, 800, 600],
      backgroundColor: "#2196f3",
    },
  ],
};

const promotionalSalesData = {
  labels: ["Spring Sale", "Black Friday", "New Year Sale", "Christmas Offer"],
  datasets: [
    {
      data: [2000, 5000, 3000, 1500],
      backgroundColor: ["#ff5722", "#4caf50", "#9e9e9e", "#ffc107"],
    },
  ],
};

// Define all your components for each tab (e.g., Dashboard, Add Product, etc.)
const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 3,
        padding: 1,
      }}
    >
      {/* Chart 1: Total Earnings */}
      <Card
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Total Earnings
          </Typography>
          <Line data={earningsData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      {/* Chart 2: Total Orders */}
      <Card
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Total Orders
          </Typography>
          <Line data={ordersData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      {/* Chart 3: Medicine Stock */}
      <Card
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Medicine Stock Analysis
          </Typography>
          <Pie data={stockData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      {/* Chart 4: Sales by Product */}
      <Card
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Sales by Product
          </Typography>
          <Bar data={salesData} options={{ responsive: true }} />
        </CardContent>
      </Card>

      {/* Chart 5: Promotional Sales */}
      <Card
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>
            Promotional Sales
          </Typography>
          <Pie data={promotionalSalesData} options={{ responsive: true }} />
        </CardContent>
      </Card>
    </Box>
  );
};

const AddProduct = () => <div>Add Product Page</div>;

const ViewProducts = () => <div>View Products Page</div>;

const AnalyzeStocks = () => <div>Analyze Stocks Page</div>;

export default Dashboard;
