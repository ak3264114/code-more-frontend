import React from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography 
} from "@mui/material";

const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirm Removal</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to remove this friend from your list?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;