import React, { useState } from 'react';
import axios from 'axios';
import { BaseURL } from '../utils/custom';
import NavBar from "../Pages/Navbar";
import Footer from '../Pages/Footer';
import { useNavigate } from "react-router-dom";
const Profile = () => {

    let navigate = useNavigate();
    // const initialState = {
    //     username: "admin",
    //     password: "",
    //     repassword: ""
    // }

    // const [saveData, setSaveData] = useState({ initialState });
    const [username, setUserName] = useState("admin");
    const [password, setPassword] = useState(null);
    const [repassword, setRePassword] = useState(null);

    // const handelInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value)

    //     setSaveData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }))
    // }


    const handelFormSubmit = async (e) => {
        e.preventDefault();


        if ((username || password !== "") && (password === repassword)) {
            // console.log(username)
            // console.log(password)
        } else {
            console.log("error")
        }



        try {
            await axios.put(BaseURL + '/user/update/' + username,
                { password: password }).then((data) => {
                    // console.log(data)
                    // clear textbox
                    // setSaveData({ ...initialState })
                    setUserName("admin");
                    setPassword("");
                    setRePassword("");
                    alert("Password Changed !!");

                });
        } catch (error) {
            console.log(error)
        }





    }



    return (
        <>
            <NavBar />


            <section className='section' style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>
                <div className='row'>
                    <div className='col-sm-12' style={{ textAlign: 'center' }}>

                    </div>
                </div>
                <div className="card border-info">
                    <div className="text-white bg-info">
                        <h5 className="card-header">Profile - Password Change</h5>
                    </div>

                    <div className="card-body" style={{ backgroundColor: '' }}>




                        <div className='row'>
                            <div className='col-sm-6'>
                                <form onSubmit={handelFormSubmit}>
                                    <div className='form-group row'>
                                        <label htmlFor='username' className='form-label col-sm-3'>username</label>
                                        <div className='col-sm-3'>

                                            {/* <input type="text" value={saveData.username} onChange={handelInputChange} id="username" name="username" className='form-control' autoComplete="off" required ></input> */}
                                            <input type="text" value={username} onChange={(e) => { setUserName(e.target.value) }} id="username" name="username" className='form-control' autoComplete="off" readOnly required ></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label htmlFor='password' className='form-label col-sm-3'>password</label>
                                        <div className='col-sm-3'>

                                            {/* <input type="password" value={saveData.password} onChange={handelInputChange} id="password" name="password" className='form-control' autoComplete="new-password" required></input> */}
                                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" className='form-control' autoComplete="new-password" required></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label htmlFor='repassword' className='form-label col-sm-3'>Re password</label>
                                        <div className='col-sm-3'>
                                            {/* <input type="password" value={saveData.repassword} onChange={handelInputChange} id="repassword" name="repassword" className='form-control' autoComplete="new-password" required></input> */}
                                            <input type="password" value={repassword} onChange={(e) => { setRePassword(e.target.value) }} id="repassword" name="repassword" className='form-control' autoComplete="new-password" required></input>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <div className='col-sm-3'></div>
                                        <div className='col-sm-3'>

                                            <button type="submit" className={'btn btn-block btn-sm btn-warning'}>Update</button>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div >







                    </div>
                </div >




            </section >











            <Footer />
        </>
    )
}


export default Profile