import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataContext } from '../Context/DataContext';
import { useContext } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const SnackBar = () => {
    const {snackOpen, setSnackOpen} = useContext(DataContext)

    const handleClose = () => {
      setSnackOpen(false);
    };
  return (
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      <Alert onClose={handleClose} severity={snackOpen?.type || "info"}>
        {snackOpen?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
