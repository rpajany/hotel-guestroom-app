import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

import Footer from '../Pages/Footer';
import logo from '../images/pecock.jpg'

const Login = ({ authenticate }) => {
    const userLogo = <FontAwesomeIcon icon={faCircleUser} />
    const apiUrl = 'http://localhost:8080/api/user/';





    const [username, setUserName] = useState("admin");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handelSubmit = async (e) => {
        e.preventDefault();
        // console.log({ username, password })
        setError('');
        try {

            const { data } = await axios.post(apiUrl + 'find', { username, password });

            // console.log(data);

            if (data && data.length) {

                authenticate(true);

                setUserName('');
                setPassword('');
                navigate("/home", { replace: true });
            } else {
                setError("Login Error : check username or password !!")
                console.log(error)
                setUserName('');
                setPassword('');
            }





        } catch (error) {

        }






    };


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='col-sm-12'>
                    <a className="navbar-brand">
                        <img src={logo} width="30" height="30" alt="" style={{ marginRight: '5px' }} /> <span>Krishna Guest House</span>
                    </a>

                </div>



            </nav>



            <div className="row" style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', marginBottom: '180px' }}>

                <div className='col-sm-6' >
                    <div className='row' style={{ justifyContent: 'center', marginRight: '50px' }}>
                        <div className='col-sm-2' style={{ fontSize: '80px', opacity: '.3' }}>
                            {userLogo}
                        </div>

                    </div>

                    <form onSubmit={handelSubmit} autoComplete='off'>




                        {/* <div className='row'> */}
                        <div className="form-group row" style={{}}>
                            <label htmfor="username" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-7">
                                <input type="text" onChange={(e) => { setUserName(e.target.value) }} className="form-control" id="username" value={username} autoComplete="off" placeholder='Username' />
                            </div>
                        </div>
                        {/* </div> */}

                        {/* <div className='row'> */}
                        <div className="form-group row">
                            <label htmfor="password" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-7">
                                <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="password" value={password} autoComplete="new-password" placeholder='Password' />
                            </div>
                        </div>
                        {/* </div> */}



                        <div className=" row " >

                            <div className='col-sm-7 offset-sm-2' >
                                <button className='btn btn-sm btn-info btn-block'>Login</button>
                            </div>

                        </div>

                        <div className='row' >
                            <div className='col-sm-2'>

                            </div>
                            <div className='col-sm-7' style={{ marginTop: '20px' }}>
                                {error && <div class="alert alert-danger" role="alert">{error}</div>}
                            </div>
                        </div>

                    </form >

                </div>







            </div >
            <Footer />
        </>
    );
}

export default Login;