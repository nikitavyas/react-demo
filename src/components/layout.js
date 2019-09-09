import React from 'react';
import Navbar from '../components/Navbar';

const Layout = (props) => (
    <div>
        <Navbar history={props.history} />
        <div className="container">{props.children}</div>
    </div>
)
export default Layout; 