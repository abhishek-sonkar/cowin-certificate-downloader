import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormHelperText } from '@material-ui/core';
import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/abhishek-sonkar/" target="_blank">
        Abhishek Sonkar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  
  const [mobNum, setMobNum] = useState("");
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form align="center" className={classes.form} noValidate>
          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            autoFocus
            onChange={(e) => setMobNum(e.target.value)}
          />
          { props.loading ? <CircularProgress color="secondary" /> : null }
          <FormHelperText error={true}>{ props.err ? props.errText : null }</FormHelperText>
          <Button
            disabled={mobNum.length !== 10}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {props.getOtpHandler(mobNum)}}
          >
            Get OTP
          </Button>
          <Grid container>
            <Grid item xs align="center">
              <Link href="https://selfregistration.cowin.gov.in/" variant="body2" target="_blank">
                Not Registered?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}