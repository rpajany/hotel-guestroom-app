import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoadSpinner } from '../components/LoadSpinner';
import { BaseURL, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import ModalImage from "react-modal-image";
import NavBar from "../Pages/Navbar";
import Footer from '../Pages/Footer';
const Customer = () => {
    const navigate = useNavigate();
    // const history = useHistory();
    let location = useLocation();
    let recivedData = location.state;

    // console.log(recivedData)

    const [customerData, setCustomerData] = useState([]);
    const [isBooking, setIsBooking] = useState(recivedData === null ? false : true)

    const [bookingData, setBookingData] = useState(recivedData === null ? null : recivedData);

    const [loading, setLoading] = useState(false);



    // console.log(isBooking)
    // console.log(bookingData)


    // load data function ...
    useEffect(() => {

        const getData = async () => {
            setLoading(true);
            let { data } = await axios.get(BaseURL + "/customer/load");

            setCustomerData(data);

            setLoading(false);
        };

        getData();

    }, []);





    // useEffect(() => {
    //     console.log(bookingData)

    // })


    const handelPhoto = (data) => {
        // alert('xxx')
        // window.open('http://localhost:8080/uploads/'+data.photo, "height=300,width=400");

        var image = new Image();
        // image.src = "data:image/jpg;base64," + data.photo;
        image.src = data.photo;
        image.style = "width: 750px"

        var w = window.open("");
        w.document.write(image.outerHTML);

    }

    const handel_SelectCustomer = (data) => {


        // const myArray = [];
        // myArray.push(recivedData === null ? null : recivedData)
        // myArray.push(data)
        // myArray.push("isNewCustomer", false)

        setBookingData(bookingData => ({ ...bookingData, newCustomer: false }));
        setBookingData(bookingData => ({ ...bookingData, ...data }));



        // const xx = {
        //     // roomData: recivedData.roomData,
        //     // Room_Number: recivedData.Room_Number,
        //     // isBooking: true,
        //     customerData: data,
        //     isNewCustomer: false
        // }

        // navigate(-1, { state: data });

        // updateBookingData(data);
        // navigate("/booking", { state: bookingData });
    }


    const handel_Navigate = () => {
        navigate("/booking", { state: bookingData });
    }



    return (
        <>
            <NavBar />
            <div>
                {/* <h1>Customer</h1> */}
                <div style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>


                    <div className="card border-warning">
                        <div className="text-white bg-warning">
                            <h5 className="card-header">Customer - Report</h5>
                        </div>

                        <div className="card-body">
                            <div className='row'>

                                <div className="col-sm-3" style={{ 'float': 'left', marginBottom: '15px' }}>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className=" btn btn-info"
                                        table="table-to-xls"
                                        filename="Report"
                                        sheet="sheet1"
                                        buttonText="Download as XLS" />
                                </div>
                                <div className="col-sm-3" style={{ 'float': 'center' }}>
                                    {/* <input type='date' onChange={(e) => { setFilterDate(e.target.value) }} className="form-control" /> */}

                                </div>
                                <div className="col-sm-3">
                                    {/* <button onClick={handel_DataFilter} className="btn btn-warning" style={{ 'float': 'left' }}>Show</button> */}
                                </div>

                            </div>

                            {loading ? <LoadSpinner /> : (
                                <table id="table-to-xls" className='table table-sm table-striped table-condensed table-responsive table-bordered' style={{ maxHeight: '500px' }}>
                                    <thead style={{ position: 'sticky', top: '0', zindex: '1', border: '1px solid black' }}>
                                        <tr>

                                            <th>ID</th>
                                            <th>Customer_ID</th>
                                            <th>Customer_Name</th>
                                            <th>Address</th>
                                            <th>State</th>
                                            <th>Country</th>
                                            <th>Phone</th>
                                            <th>GSTIN</th>
                                            <th>Proof_Details</th>
                                            <th>ID_Proof</th>
                                            <th>Email</th>
                                            <th>Photo</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {customerData.map((data, index) => {

                                            let idProof_url = 'http://localhost:8080/uploads/' + data.ID_Proof;
                                            // let photo_url = 'http://localhost:8080/uploads/'+ data.ID_Proof;

                                            return (
                                                <tr key={index}>

                                                    <td>{data.ID}</td>
                                                    <td>{data.Customer_ID}</td>
                                                    <td>{data.Customer_Name}</td>
                                                    <td>{data.Address}</td>
                                                    <td>{data.State}</td>
                                                    <td>{data.Country}</td>
                                                    <td>{data.Phone}</td>
                                                    <td>{data.GSTIN}</td>
                                                    <td>{data.Proof_Details}</td>
                                                    <td>
                                                        <a href={idProof_url} target="_blank">
                                                            <img src={'http://localhost:8080/uploads/' + data.ID_Proof} alt='ID-Proof' className='rounded mx-auto d-block img-thumbnail' style={{ border: '1px solid #ccc', width: '50px' }} />
                                                        </a>
                                                    </td>

                                                    <td>{data.Email}</td>
                                                    <td>
                                                        {/* <a href={data.photo}  target="_blank"  > */}
                                                        <img src={data.photo}  id="customer-photo" alt='customer-pic' className='rounded mx-auto d-block img-thumbnail img-wrapper hover-zoom' style={{ border: '1px solid #ccc', width: '50px', cursor: 'pointer', hover: 'transform: scale(1.25)' }} onClick={() => { handelPhoto(data) }} />
                                                        {/* </a> */}
                                                    </td>

                                                    <td style={{ visibility: isBooking ? null : 'hidden' }}>
                                                        <button type="button" className='btn btn-sm btn-info'
                                                            onClick={() => { handel_SelectCustomer(data) }}
                                                        >Select</button>
                                                    </td>
                                                    <td style={{ visibility: isBooking ? null : 'hidden' }}>
                                                        <button type="button" className='btn btn-sm btn-info'
                                                            onClick={() => { handel_Navigate() }}
                                                        >Go to Booking</button>
                                                    </td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Customer;