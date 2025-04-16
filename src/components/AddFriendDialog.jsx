import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Button,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

const AddFriendDialog = ({ 
  open, 
  onClose, 
  userName, 
  newFriendData, 
  onInputChange, 
  onAddFriend 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <PersonAddIcon className="mr-2" />
            Add Coding Friend
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Your Username"
              value={userName}
              disabled
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Friend's Profile URL"
              name="friendsId"
              value={newFriendData.friendsId}
              onChange={onInputChange}
              placeholder="https://leetcode.com/username"
              fullWidth
              variant="outlined"
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Platform"
              name="sitename"
              value={newFriendData.sitename}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="leetcode">LeetCode</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onAddFriend} 
          variant="contained" 
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Add Friend
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriendDialog;