import React from 'react';
import axios from './axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContent from './components/snackBarWrapper';
export default class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    submitted: false,
    open: false,
  }
  queue = [];
  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  loginOnSubmit = () => {
    axios.post('/login', this.state.formData).then((res) => {
      this.queue.push({
        message:res.data.message,
        type : res.data.status,
        key: new Date().getTime(),
      });
      if (this.state.open) {
        this.setState({ open: false });
      } else {
        this.processQueue();
      }
      localStorage.setItem('isAuthenticated',true)
      if(res.data.status === 'success'){
        localStorage.setItem('isAuthenticated',true)
       this.props.history.push(`/home`)
      }
  }).catch((err) => {
    console.log(err);
  });
  }
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true,
      });
    }
  };
  render() {
    const { formData, submitted } = this.state;
    const { messageInfo = {} } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div >
          <Avatar >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
               Login
          </Typography>
          <ValidatorForm ref="form" onSubmit={this.loginOnSubmit}
          >
            <TextValidator
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={this.handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                 <TextValidator
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formData.password}
                    onChange={this.handleChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={submitted}> Sign dfdfd In</Button>
          </ValidatorForm>
          <Grid container>
            <Grid item xs>
              <Link  to="/signUp" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open} autoHideDuration={2000} onClose={this.handleClose} >
          <MySnackbarContent
            onClose={this.handleClose} variant={messageInfo.type}  message={messageInfo.message}/>
        </Snackbar>
      </Container>
    );
  }
}