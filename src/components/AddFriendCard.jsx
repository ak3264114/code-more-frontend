import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddFriendCard = ({ onClick }) => (
  <Paper 
    elevation={3} 
    className="bg-slate-800 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors duration-300"
    onClick={onClick}
    sx={{ height: '100%', minHeight: '200px' }}
  >
    <Box className="text-center p-4">
      <AddIcon style={{ fontSize: 60 }} className="text-green-500 mb-2" />
      <Typography variant="h6">Add Friend</Typography>
    </Box>
  </Paper>
);

export default AddFriendCard;