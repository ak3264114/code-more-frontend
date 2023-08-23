import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataContext } from '../Context/DataContext';
import { useContext } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const SnackBar = () => {
    const {snackOpen , snackType , snackMessage ,setSnackOpen} = useContext(DataContext)

    const handleClose = () => {
      setSnackOpen(false);
    };
  return (
    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snackType?snackType :"info"} sx={{ width: "300px" }}>
        {snackMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
