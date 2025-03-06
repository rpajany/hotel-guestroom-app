import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { BaseURL, Get_Date, stringDateTimeToAMPM, StringToCurrency, FormatToCurrency, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';
import { ToWords } from 'to-words';
import logo from '../images/pecock.jpg'



const PrintAdvance = () => {
    let location = useLocation();
    let recivedData = location.state;

    const customer_InitialState = {
        Customer_ID: recivedData.Customer_ID,
        Customer_Name: recivedData.Customer_Name,
        Address: "",
        State: '',
        Phone: "",
        GSTIN: '',
        ID_Proof: '',
        Proof_Details: '',
        Email: '',
        photo: '',
        Country: '',
    }

    const booking_InitialState = {
        Room_Number: recivedData.Room_Number,
        isCheckedIn: 0,
        Check_In: "",
        Check_Out: "",
        TotalDays: 0,
        Advance_Amount: 0.00,
    }

    const advance_InitialState = {
        Invoice_Number: recivedData.Invoice_Number,

        Date_Advance: "",
        Advance_Received: 0

    }

    const business_initialState = {

        Name: "",
        Address: "",
        City: "",
        State: "",
        Zip: "",
        Mobile: "",
        Landline: "",
        Email: "",
        GSTIN: "",
        Logo: "",
        Website: ""

    }





    const [businessData, setBusinessData] = useState(business_initialState);
    const [customerDate, setCustomerData] = useState(customer_InitialState);
    const [bookingDate, setbookingData] = useState(booking_InitialState);
    const [advanceDate, setAdvanceData] = useState([]);

    const [print, setPrint] = useState(false);

    let print_Date = Get_Date(new Date());
    let total = 0;
    // console.log((print_Date))
    // console.log(stringDateTimeToAMPM(print_Date))

    // load data function ...
    useEffect(() => {
        // console.log(recivedData.Invoice_Date)
        const getData = async () => {

            try {
                let { data } = await axios.post(BaseURL + "/booking/find",
                    {
                        Booking_Number: recivedData.Booking_Number,
                        Room_Number: recivedData.Room_Number
                    });

                setbookingData((t) => ({ ...t, ...data[0] }))

            } catch (error) {

            }


            try {
                // get invoce data
                const { data } = await axios.post(BaseURL + "/advance/find",
                    {
                        Booking_Number: recivedData.Booking_Number,
                        // Invoice_Date: recivedData.Invoice_Date
                    });

                // .then((response) => {
                // console.log(data)
                //     // setAdvanceData((t) => ({ ...t, ...response.data }))
                setAdvanceData(data)

                //     console.log(advanceDate)
                // })
            } catch (error) {

            }


            try {
                // get customer data
                await axios.post(BaseURL + "/customer/find",
                    {
                        Customer_ID: recivedData.Customer_ID,
                        Customer_Name: recivedData.Customer_Name
                    }).then((resX) => {
                        // console.log(resX.data[0])
                        setCustomerData((t) => ({ ...t, ...resX.data[0] }))
                    })
            } catch (error) {

            }



            try {
                // get business data
                await axios.get(BaseURL + "/business/load").then((resX) => {
                    // console.log(resX.data[0])
                    setBusinessData((t) => ({ ...t, ...resX.data[0] }));
                })
            } catch (error) {

            }






            setPrint(true);

        };

        getData();




    });


    useEffect(() => {


        if (print)

            setTimeout(() => {
                window.print()

            }, 1500)

    }, [print])




    return (
        <>
            <div className="" style={{ margin: "40px" }}>

                <div className="row" style={{ borderLeft: '1px solid', borderRight: '1px solid', borderTop: '1px solid' }}>
                    <div className="col-sm-6">
                        <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>GSTIN: {businessData.GSTIN}</span>
                    </div>
                </div>

                <div className="row" style={{ borderLeft: '1px solid', borderRight: '1px solid' }}>
                    <div className="col-sm-6">
                        <span style={{ fontSize: '30px' }}> <img src={logo} style={{ height: '50px', width: '50px' }} className="profile-user-img img-fluid img-circle" alt="logo" /><strong>{businessData.Name} </strong></span><br></br>

                    </div>

                    <div className="col-sm-6">
                        <span style={{ fontSize: '15px' }}>{businessData.Address}, </span>
                        <span style={{ fontSize: '15px' }}>{businessData.City}, </span>
                        <span style={{ fontSize: '15px' }}>{businessData.State} - {businessData.Zip}.</span><br></br>
                        <span style={{ fontSize: '15px' }}>Phone: {businessData.Mobile}, {businessData.Landline}, {businessData.Email}</span><br></br>
                        <span style={{ fontSize: '15px' }}> {businessData.Website.length ? 'Website: ' + businessData.Website : null}</span>

                    </div>

                </div>

                <div className="row" style={{ textAlign: 'center', marginTop: '', borderLeft: '1px solid', borderRight: '1px solid' }}>
                    <div className="col-sm-12">
                        <span style={{ textDecoration: 'underline', fontSize: '25px' }}>ADVANCE RECEIPT</span>
                    </div>
                </div>

                <div className="row" style={{ borderLeft: '1px solid', borderRight: '1px solid' }}>
                    <div className="col-sm-8" style={{ paddingLeft: '30px' }}>
                        <span><b>{'Name & Address :'}</b></span><br></br>
                        <span>{customerDate.Customer_Name}</span><br></br>
                        <span>{customerDate.Address}, {customerDate.State === 'PUDUCHERRY' ? 'PUDUCHERRY' : null}</span><br></br>
                        <span>{customerDate.Country}</span>
                    </div>
                    <div className="col-sm-4">
                        <span>Booking No.: {recivedData.Booking_Number}</span><br></br>
                        <span>Date: {stringDateTimeToAMPM(print_Date)}</span>
                    </div>

                </div>
                <div className="row" style={{ border: '1px solid' }}>
                    <div className="col-sm" style={{ marginTop: '20px' }}>
                        <table className="table table-sm ">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Receipt No.</th>
                                    <th>Date</th>
                                    <th>Advance Received</th>
                                </tr>
                            </thead>
                            <tbody>

                                {advanceDate.map((data, key) => {
                                    // console.log(formatDate(data.Date_Advance))

                                    const d = new Date(data.Date_Advance);
                                    // console.log(d.toLocaleTimeString());
                                    // console.log(formatDateTime(d));

                                    total += parseFloat(data.Advance_Received);


                                    return (
                                        <tr key={key + 1}>
                                            <td>{key + 1}</td>
                                            <td>{data.ID}</td>

                                            {/* <td>{formatDateTime(d)}</td> */}
                                            <td>{data.Date_Advance}</td>
                                            <td>{parseFloat((data.Advance_Received)).toFixed(2)}</td>
                                        </tr>
                                    );



                                })}



                            </tbody>


                        </table>
                        <hr></hr>
                        {/* <tfoot> */}
                        <div className="row">
                            <div className="col-sm-7" style={{ textAlign: 'right', fontSize: '20px' }}>
                                Total :
                            </div>
                            <div className="col-sm-4" style={{ textAlign: 'left', fontSize: '20px', marginLeft: '55px' }}>
                                {total.toFixed(2)}
                            </div>
                        </div>
                        {/* </tfoot> */}

                    </div>
                </div>



            </div>
        </>
    );

}

export default PrintAdvance;