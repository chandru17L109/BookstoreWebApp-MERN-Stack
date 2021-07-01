import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(props.open);
  const [message, setMessage] = React.useState(props.message);
   const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal} = state;
  
//   useEffect(()=>{
//     setTimeout(()=>{
//         setOpen(false)
//         console.log("open",open)
//     },2000)
//   },[open])

  console.log("props",props)


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      
    // <div className={classes.root}>
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    // </div>
  );
}