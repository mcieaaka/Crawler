import React from "react";
import {Link} from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return ( 
        <>
            <div className="nav">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Spider.svg/2048px-Spider.svg.png" alt="icon" width="50px"/>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/saved">Saved Results</Link>
            </div>
        </>
     );
}
 
export default Navbar;