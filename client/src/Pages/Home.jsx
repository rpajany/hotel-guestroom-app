// rfce tab
import React, { useEffect, useState } from 'react';
import { Redirect, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseCircleCheck, faHouseCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { BaseURL } from '../utils/custom';
import NavBar from "../Pages/Navbar";

import Footer from '../Pages/Footer';
const Home = (props) => {
    let navigate = useNavigate();
    const houseCheck = <FontAwesomeIcon icon={faHouseCircleCheck} style={{ color: 'green' }} />
    const houseXmark = <FontAwesomeIcon icon={faHouseCircleXmark} style={{ color: 'red' }} />


    const [roomsData, setRoomsData] = useState([]);



    useEffect(() => {

        const loadData = async () => {
            // setRoomsData([]);
            try {
                const { data } = await axios.get(BaseURL + '/rooms/load');

                // console.log(data.length);

                // setRo    omsData(data);

                if (data && data.length) {
                    // console.log(data);
                    setRoomsData(data);
                }


            } catch (error) {

            }


        }

        loadData();

    }, []) // , []



    // console.log(roomsData);


    const handelRoomClick = (data) => {
        // console.log(data)

        navigate("/booking", { state: data });

        // history.push({
        //     pathname: "/booking",
        //     state: {
        //         data: data
        //     }
        // }) 

        //         < Redirect
        //     to = {
        //         {
        //         pathname: "/login",
        //             search: "?utm=your+face",
        //                     state: { data: data }
        //     }
        // }
        // />


    }



    const columnTable = () => {
        const row = [];
        // console.log(roomsData)
        for (var i = 1; i < 4; i++) {

        }


    }

    columnTable()





    return (
        <>
            <NavBar />
            <div style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>

                <div className="card border-info" >
                    <div className="text-white bg-info">
                        <h5 className="card-header">Rooms - Booking</h5>
                    </div>

                    <div className="card-body">

                        <div className='row' style={{ margin: '5px' }}>

                            {roomsData.map((data, index) => {
                                return (
                                    <tr key={data.ID}>
                                        <td style={{ border: '1px solid', padding: '5px', textAlign: 'center' }}><p onClick={() => { handelRoomClick(data) }} className='btn btn-warning' style={{ borderRadius: '50px', }}>{data.Room_Number} </p> {data.isCheckedIn ? houseXmark : houseCheck} </td>

                                    </tr>

                                )
                            })}


                        </div>
                    </div>
                </div>


                <div className="card border-info" style={{ marginTop: '40px' }}>
                    <div className="text-white bg-info">
                        <h5 className="card-header">Rooms - Detail View</h5>
                    </div>

                    <div className="card-body">



                        <div className='row' style={{ marginTop: '10px' }}>
                            <div className='col-sm-6' >
                                <table className="table table-md table-striped table-bordered table-responsive" style={{ maxHeight: '500px' }}>

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Room / Status</th>
                                            <th>Customer</th>
                                            <th>Mobile</th>
                                            <th>Booking_Number</th>
                                            <th>Daily_Rent</th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {roomsData.map((data, index) => {
                                            return (
                                                <tr key={data.ID}>
                                                    <td>{index + 1}</td>

                                                    {/* <td><p onClick={() => { handelRoomClick(data) }} className='btn btn-warning' style={{ borderRadius: '50px', }}>{data.Room_Number} </p> {data.isCheckedIn ? houseXmark : houseCheck} </td> */}
                                                    <td><p className='btn ' style={{ borderRadius: '50px', }}>{data.Room_Number} </p> {data.isCheckedIn ? houseXmark : houseCheck} </td>
                                                    <td>{data.Customer_Name}</td>
                                                    <td>{data.Phone}</td>
                                                    <td>{data.Booking_Number}</td>
                                                    <td>{data.Rate}</td>


                                                </tr>

                                            )
                                        })}



                                    </tbody>

                                </table>
                            </div>




                        </div>







                    </div>
                </div>


                {/* <Link to="/rooms" className='btn btn-info'>Go to Rooms Page</Link> */}
            </div >
            <Footer />
        </>
    );
}

export default Home;