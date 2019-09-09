import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import style from './navbarstyle.js';
import {withStyles} from '@material-ui/styles'
import { hashHistory } from 'react-router'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false };
  }
 handleProfileMenuOpen = (event) =>  {
  this.state.anchorEl 
    ? this.setState({ anchorEl: null })
    : this.setState({ anchorEl: event.currentTarget,open: !this.state.open  });
  }
  handleMenuClose = () => {
    this.setState({ anchorEl: null ,open : false})
  }
  logOut = () => {
    console.log(this.props);
      localStorage.clear();
      hashHistory.push('/');
  }
  render() {
    const { classes } = this.props;
    const open = this.state.anchorEl === null ? false : true;
    const id = this.state.open ? "simple-popper" : null;
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
            DMS
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              Dashboard
              Folders
              About US
              Contact US
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={id}
                aria-describedby={id}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen} color="inherit"><AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      <Menu   anchorEl={this.state.anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={id}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={this.state.open}
    onClose={this.handleMenuClose}
  >
    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={this.handleMenuClose}>Switch to Admin</MenuItem>
    <MenuItem onClick={this.logOut}>Logout</MenuItem>
  </Menu>
  </div>
    )
  }
}
export default withStyles(style)(Navbar);