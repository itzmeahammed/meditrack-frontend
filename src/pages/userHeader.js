import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const UserHeader = ({ username }) => {
  return (
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          User Dashboard
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: "bold", color: "#333" }}>
          {username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
