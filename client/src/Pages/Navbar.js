import React, { useState, createContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../images/pecock.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
const NavBar = () => {
    const userIcon = <FontAwesomeIcon icon={faUser} style={{ color: 'green' }} />

    return (




        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='col-sm-7'>
                <a className="navbar-brand">
                    <img src={logo} width="30" height="30" alt="" style={{ marginRight: '5px' }} /> <span>Krishna Guest House</span>
                </a>

            </div>

            <div className='col-sm-4' style={{ textAnchor: 'right' }}>
                <div className='row'>


                    {/* <Link className="navbar-brand" to="/home" style={{ marginLeft: '60px' }}>

                        Home
                    </Link> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">

                            <Link className="navbar-brand" to="/home" style={{ marginLeft: '60px' }}>

                                Home
                            </Link>

                            <NavLink className="nav-item nav-link" to="/rooms">
                                Rooms
                            </NavLink>
                            {/* <NavLink className="nav-item nav-link" to="/customer">
                            Customers
                        </NavLink> */}
                            {/* <NavLink className="nav-item nav-link" to="/report">
                            Report
                        </NavLink> */}
                            <div className="nav-item dropdown" >
                                <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                                    Report
                                </a>
                                <div class="dropdown-menu">
                                    <NavLink className="nav-item nav-link" to="/bookingReport">
                                        Booking
                                    </NavLink>
                                    <NavLink className="nav-item nav-link" to="/gst">
                                        GST
                                    </NavLink>
                                    <NavLink className="nav-item nav-link" to="/customer">
                                        Customer
                                    </NavLink>
                                    {/* <a className="dropdown-item" href="#">Booking</a> */}
                                    {/* <a className="dropdown-item" href="#">GST</a> */}

                                    {/* <NavLink className="nav-item nav-link" to="/extract_pdf">
                                        Batch Invoice
                                    </NavLink> */}


                                </div>
                            </div>



                        </div>
                    </div>
                </div>

            </div>
            <div className='col-sm-1'>

                <div className="nav-item dropdown" >
                    <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
                        {/* <img src={logo} width="30" height="30" alt="" style={{ marginRight: '5px' }} /> <span></span> */}
                        {userIcon}
                    </a>
                    <div class="dropdown-menu" style={{ width: '50px', textAlign: 'left' }}>
                        <NavLink className="nav-item nav-link" to="/profile" style={{ marginLeft: '5px' }}>
                            Profile
                        </NavLink>

                        <NavLink className="btn btn-sm " to="/logout" style={{ marginLeft: '15px' }}>
                            Logout
                        </NavLink>


                    </div>
                </div>



            </div>
        </nav>

    );
}

export default NavBar;