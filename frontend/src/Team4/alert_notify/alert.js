import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars(props) {
      const [open, setOpen] = React.useState(props.open);
      const [message,] = React.useState(props.message);

      const [state, ] = React.useState({
        vertical: 'top',
        horizontal: 'center',
      });

      const { vertical, horizontal} = state;

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      return (
          <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              {message}
            </Alert>
          </Snackbar>
  );
}