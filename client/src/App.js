import logo from './logo.svg';
import './App.css';
import React, { createContext, useEffect, useState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faFontAwesome, faBandcamp } from '@fortawesome/free-brands-svg-icons'


import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import SingleFileUpload from './components/common/Single_FileUpload';
import MultiplefileUpload from './components/common/Multiple_FileUpload';

import NavBar from "./Pages/Navbar";
import Login from './Pages/LoginForm';
import Register from "./Pages/RegisterForm";
import Logout from "./Pages/Logout";
import Page404 from "./Pages/404";
import Home from "./Pages/Home";
import Rooms from "./Pages/Rooms";

import Customer from "./Pages/Customer";
import Extract_pdf from "./Pages/Extract_pdf";

import Footer from './Pages/Footer';
import Booking from './Pages/Booking';
import BookingReport from './Pages/Booking_Report';
import GST from './Pages/Gst_Report';
import PrintInvoice from './Pages/Print_Invoice';
import PrintAdvance from './Pages/print_Advance';

import Auth from "./hooks/auth";
import Profile from './Pages/profile';
// library.add(faTwitter, faFontAwesome, faBandcamp);

function App() {

  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState("");


  useEffect(() => {
    let user = localStorage.getItem("user");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);

  // useEffect(() => {
  //   const user = "";
  //   setUser(user);
  // }, []);


  return (

    <Routes>
      {!auth && (
        <Route
          path="/"
          // element={<Auth authenticate={() => setAuth(true)} />}
          // element={<Auth authenticate={(e) => setAuth(e)} />}
          element={<Login authenticate={(e) => setAuth(e)} />}
        />
      )}

      {auth && (
        <>

          <Route path="/profile" element={<Profile />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingReport" element={<BookingReport />} />
          <Route path="/printInvoice" element={<PrintInvoice />} />
          <Route path="/printAdvance" element={<PrintAdvance />} />
          <Route path="/gst" element={<GST />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/extract_pdf" element={<Extract_pdf />} />

          <Route path="/home" element={<Home />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
          <Route
            path="/logout"
            element={<Logout authenticate={(e) => setAuth(e)} />}
          />
        </>
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>

















  );
}

export default App;
