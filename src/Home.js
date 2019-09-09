import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Layout from "./components/layout";
class Home extends React.Component {
  logOut = () => {
    localStorage.clear();
    this.props.history.push(`/`)
  }
  render() {
    return (
          <div className="">
           <Layout/>        
             </div>
    );
  }
}
export default Home;
