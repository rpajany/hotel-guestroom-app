import React, { useState, createContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import Booking from './Booking';
const ApiContext = createContext(null)
const NavBar = (user) => {
    const [api, setApi] = useState("http://localhost:8080/api/");
    return (

        <ApiContext.Provider value={api}>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
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

                            </div>
                        </div>
                        {!user && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link" to="/">
                                    Login
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/register">
                                    Register
                                </NavLink>
                            </React.Fragment>
                        )}
                        {user && (
                            <React.Fragment>
                                {/* <NavLink className="nav-item nav-link" to="/profile">
                                    {user.name}
                                </NavLink> */}
                                {/* <NavLink className="nav-item nav-link" to="/logout">
                                    Logout
                                </NavLink> */}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </nav>
        </ApiContext.Provider>
    );
}

export default NavBar;