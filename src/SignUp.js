import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import axios from './axios';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContent from './components/snackBarWrapper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
const styles2 = theme => ({
  close: {
    padding: theme.spacing(0.5),
  }
});

class SignUp extends React.Component {
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.formData.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }
  state = {
    formData: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      user_behaviour: '',
      age: '',
      city: '',
      gender: 'male',
      marital_status: 'nevermarried'
    },
    submitted: false,
    open: false,
  }
  queue = [];
  handleChange = (event) => {
    const { formData } = this.state;
    //const name = event = 'age' ? event : event.target.name;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
    console.log(this.state.formData);
  }

  loginOnSubmit = (e) => {
    console.log(this.state.formData);
    axios.post('/register', this.state.formData).then((res) => {
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
        if(res.data.status === 'success'){
          this.props.history.push(`/`)
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
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => {
    this.processQueue();
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
            Sign Up
          </Typography>
          <ValidatorForm ref="form" onSubmit={event => {
            this.loginOnSubmit(event)
          }}>
            <TextValidator
              label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth
              name="firstname"
              value={formData.firstname}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth
              name="lastname"
              value={formData.lastname}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
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
              errorMessages={['this field is required']}
            />
            <TextValidator
              label="Confirm Password"
              name="confirm_password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.confirm_password}
              onChange={this.handleChange}
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', 'password mismatch']}
            />
            <FormControl >
              <FormLabel >Gender</FormLabel>
              <RadioGroup
                aria-label="Gender"
                name="gender"
                value={formData.gender}
                onChange={this.handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <TextValidator
              label="Age"
              variant="outlined"
              margin="normal"
              fullWidth
              name="age"
              type="number"
              max='3'
              value={formData.age}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextValidator
              label="City"
              variant="outlined"
              margin="normal"
              fullWidth
              name="city"
              value={formData.city}
              onChange={this.handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <SelectValidator
              label="What best describes your motivation to join this forum?"
              name="user_behaviour"
              id="banks"
              onChange={this.handleChange}
              value={formData.user_behaviour}
              SelectProps={{
                native: true
              }}
              validators={["required"]}
              errorMessages={["this field is required"]}
              variant="outlined"
              margin="normal" fullWidth >
              <option value='' />Select One
                <option value='UNDECiDED SHOPPER'>I am slightly confused about wedding shopping. I am looking for answers and guidance to help make the right choices.</option>
              <option value='WEDDING SHOPPING EXPERT'>I consider myself as a wedding shopping expert, and know the best places to shop. I can help by answering people's questions.</option>
              <option value='MONEY SAVER EXPERT'>I enjoy wedding shopping and know where to get the best stuff. However, I make sure to stick to my budget. I can help by guiding others to stick to their budget.</option>
            </SelectValidator>
            <Button
              type="submit" fullWidth variant="contained" color="primary" disabled={submitted}>
              Sign Up</Button>
          </ValidatorForm>
          <Grid container>
            <Grid item xs>

            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Go to Login"}
              </Link>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} >
          <MySnackbarContent
            onClose={this.handleClose} variant={messageInfo.type} message={messageInfo.message} />
        </Snackbar>
      </Container>
    );
  }
}
export default withStyles(styles2)(SignUp);
