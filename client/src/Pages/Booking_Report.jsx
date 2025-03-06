import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ReactDateRangePicker } from '../components/ReactDateRangePicker'
import { BaseURL, formatDate, formatDateTime, CalculateDays, ConvertToServerDate, convert_ServerDT_To_ShortDT, get_ServerDate } from '../utils/custom';
import { Redirect, Link, useNavigate } from 'react-router-dom';
import { FromDate, ToDate } from '../components/common/DateTime_Picker';
import { LoadSpinner } from '../components/LoadSpinner';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NavBar from "../Pages/Navbar";
import Footer from '../Pages/Footer';
import moment from 'moment';
import { format, addDays } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons'


const BookingReport = () => {
    const MySwal = withReactContent(Swal)
    const calenderIcon = <FontAwesomeIcon icon={faCalendarDays} />


    let navigate = useNavigate();

    const [bookingData, setBookingData] = useState([]);
    // const [dateRangeNow, setDateRangeNow] = useState({});

    // Start of the current month
    const startOfMonth = moment().startOf('month').format('DD-MM-YYYY'); // 'YYYY-MM-DD'
    // End of the current month
    const endOfMonth = moment().endOf('month').format('DD-MM-YYYY'); // 'YYYY-MM-DD'

    const [fromDate, setFromDate] = useState(startOfMonth); // formatDate(new Date())
    const [toDate, setToDate] = useState(endOfMonth); // formatDate(new Date())
    const [loading, setLoading] = useState(false);





    const handelFromDate = (recivedFromDate) => {
        console.log(recivedFromDate)

        if (recivedFromDate !== "") {
            setFromDate(recivedFromDate)

        }

    }

    const handelToDate = (recivedToDate) => {
        console.log(recivedToDate)
        if (recivedToDate !== "") {
            setToDate(recivedToDate);
        }
    }


    // console.log('fromDate', fromDate)
    // console.log('toDate', toDate)


    const getData = async () => {
        try {
            setLoading(true);
            const fromDt = moment(fromDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const toDt = moment(toDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

            // console.log('fromDt', fromDt)
            // console.log('toDt', toDt)

            // let { data } = await axios.get(BaseURL + "/booking/load");
            // let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In: fromDt + " 00:00:00", Check_Out: toDt + " 23:59:59" });
            let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In_Start: fromDt + " 00:00:00", Check_In_End: toDt + " 23:59:59" });
            // let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In: '2023-04-01', Check_Out: '2023-04-30' });

            setBookingData(data)

            setLoading(false);

            // console.log("data", data)
        } catch (error) {
            console.log('Error getData :', error);
        }

    };

    const handel_ButtonShow = async () => {
        // console.log('xxxx')
        await getData();
    }


    // console.log("bookingData", bookingData)

    // load data function ...
    useEffect(() => {
        // console.log("Form Load");



        const Load_Data = async () => {

            setLoading(true);

            const fromDt = moment(fromDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
            const toDt = moment(toDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

            console.log('fromDt', fromDt)
            console.log('toDt', toDt)

            // let { data } = await axios.get(BaseURL + "/booking/load");
            // let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In: fromDt + " 00:00:00", Check_Out: toDt + " 23:59:59" });
            let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In_Start: fromDt + " 00:00:00", Check_In_End: toDt + " 23:59:59" });
            // let { data } = await axios.post(BaseURL + "/booking/load_byDate", { Check_In: '2023-04-01', Check_Out: '2023-04-30' });

            setBookingData(data);

            setLoading(false);

        }




        Load_Data();

    }, [fromDate, toDate]); // , []

    // print invoice function ...
    const handelInvoicePrint = (data) => {
        // console.log(data)
        navigate("/printInvoice", { state: data });
        // navigate("/printInvoice");
    }



    const handelAdvancePrint = (data) => {
        // console.log(data)
        navigate("/printAdvance", { state: data });
    }


    const get_RoomStatus = async (data) => {
        await axios.post(BaseURL + "/rooms/find",
            { Room_Number: data.Room_Number, Invoice_Number: data.Invoice_Number })
            .then((response) => {
                // console.log(data.Invoice_Number, response.data[0].isCheckedIn)
                return (response.data[0].isCheckedIn)
            }).catch((error) => {
                return 0
            })
    }


    const handelOnDelete = async (data) => {
        // console.log(data)

        const bookingNo = data.Booking_Number;
        const invoiceNo = data.Invoice_Number;
        const custID = data.Customer_ID;
        const roomNumber = data.Room_Number;

        Swal.fire({
            title: 'Delete !!!, Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                // console.log("delete");


                if (!custID || !bookingNo || !invoiceNo || !roomNumber) {
                    throw new Error("Invalid input data. Please ensure all required fields are provided.");
                }

                try {
                    // Delete customer details
                    try {
                        const customerResponse = await axios.delete(BaseURL + "/customer/delete/" + custID);
                        console.log("Customer deleted successfully:", customerResponse.data);
                    } catch (error) {
                        console.error("Failed to delete customer:", error);
                    }

                    // Delete booking details
                    try {
                        const bookingResponse = await axios.delete(BaseURL + "/booking/delete/" + bookingNo);
                        console.log("Booking deleted successfully:", bookingResponse.data);
                    } catch (error) {
                        console.error("Failed to delete booking:", error);
                    }

                    // Delete invoice
                    try {
                        const invoiceResponse = await axios.delete(BaseURL + "/invoice/delete/" + invoiceNo);
                        console.log("Invoice deleted successfully:", invoiceResponse.data);
                    } catch (error) {
                        console.error("Failed to delete invoice:", error);
                    }

                    // Delete invoice details
                    try {
                        const invoiceDetailsResponse = await axios.delete(BaseURL + "/invoice_details/delete/" + invoiceNo);
                        console.log("Invoice details deleted successfully:", invoiceDetailsResponse.data);
                    } catch (error) {
                        console.error("Failed to delete invoice details:", error);
                    }

                    // Delete advance data
                    try {
                        const advanceResponse = await axios.delete(BaseURL + "/advance/delete/" + bookingNo);
                        console.log("Advance data deleted successfully:", advanceResponse.data);
                    } catch (error) {
                        console.error("Failed to delete advance data:", error);
                    }

                    // Clear room data if exists
                    try {
                        const clearRoomResponse = await axios.post(BaseURL + "/rooms/clearRoom", {
                            Room_Number: roomNumber,
                            Booking_Number: bookingNo,
                        });
                        console.log("Room data cleared successfully:", clearRoomResponse.data);
                    } catch (error) {
                        console.error("Failed to clear room data:", error);
                    }

                    console.log("All API calls attempted.");

                } catch (error) {
                    console.error("Unexpected error during API calls:", error);
                }

                await getData();



                // try {


                //     const apiCalls = [
                //         // delete customer details
                //         await axios.delete(BaseURL + "/customer/delete/" + custID),
                //         // delete Booking details
                //         await axios.delete(BaseURL + "/booking/delete/" + bookingNo),
                //         // delete Invoice  
                //         await axios.delete(BaseURL + "/invoice/delete/" + invoiceNo),
                //         // delete InvoiceDetails  
                //         await axios.delete(BaseURL + "/invoice_details/delete/" + invoiceNo),
                //         // delete Advance data  
                //         await axios.delete(BaseURL + "/advance/delete/" + bookingNo),
                //         // clear room data if exists
                //         await axios.post(BaseURL + "/rooms/clearRoom", { Room_Number: roomNumber, Booking_Number: bookingNo })

                //     ]

                //     // Wait for all POST API calls to complete
                //     await Promise.all(apiCalls);



                // } catch (error) {
                //     console.log(error)
                // }











                // // delete customer details
                // try {
                //     await axios.delete(BaseURL + "/customer/delete/" + custID);
                // } catch (error) {
                //     console.log(error)
                // }


                // // delete Booking details
                // try {
                //     await axios.delete(BaseURL + "/booking/delete/" + bookingNo);
                // } catch (error) {
                //     console.log(error)
                // }


                // // delete Invoice  
                // try {
                //     await axios.delete(BaseURL + "/invoice/delete/" + invoiceNo);
                //     // await axios.delete(BaseURL + "/invoice/delete/" + bookingNo);
                // } catch (error) {
                //     console.log(error)
                // }


                // // delete InvoiceDetails  
                // try {
                //     await axios.delete(BaseURL + "/invoice_details/delete/" + invoiceNo);
                //     // await axios.delete(BaseURL + "/invoice_details/delete/" + bookingNo);
                // } catch (error) {
                //     console.log(error)
                // }



                // // delete Advance data  
                // try {
                //     await axios.delete(BaseURL + "/advance/delete/" + bookingNo);
                // } catch (error) {
                //     console.log(error)
                // }

                // // clear room data if exists
                // try {
                //     await axios.post(BaseURL + "/rooms/clearRoom", { Room_Number: roomNumber, Booking_Number: bookingNo });
                // } catch (error) {
                //     console.log(error)
                // }






                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        })







    }


    return (
        <>
            <NavBar />
            <div style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>

                <div className="card border-primary">
                    <div className="text-white bg-primary">
                        <h5 className="card-header">Booking - Report</h5>
                    </div>





                    <div className="card-body">

                        {/* <BookingView bookingData={bookingData} /> */}

                        <div className="row" style={{ marginLeft: '10px' }}>
                            <div className="form-group row" style={{ 'float': 'center' }}>
                                {/* <input type='date' onChange={(e) => { setFilterDate(e.target.value) }} className="form-control" /> */}
                                <label className='col-sm-4 col-form-label'>From Date</label>
                                <div className="col-sm-7">
                                    <FromDate handelFromDate={handelFromDate} {...fromDate} />
                                </div>
                                <span style={{ marginTop: '5px' }}>{calenderIcon}</span>
                            </div>
                            <div className="form-group row" style={{ marginLeft: '20px' }}>
                                {/* <button onClick={handel_DataFilter} className="btn btn-warning" style={{ 'float': 'left' }}>Show</button> */}
                                <label className='col-sm-4 col-form-label'>To Date</label>
                                <div className="col-sm-7">
                                    <ToDate handelToDate={handelToDate} {...toDate} className="form-control col-sm-7 " />
                                </div>
                                <span style={{ marginTop: '5px' }}>{calenderIcon}</span>
                            </div>

                            <button onClick={handel_ButtonShow} className='btn btn-sm btn-primary' style={{ marginLeft: '10px', height: '30px', marginTop: '5px' }}>Show</button>

                        </div>


                        {/* <ReactDateRangePicker setDateRangeNow={setDateRangeNow} /> */}

                        {loading ? <LoadSpinner /> : (
                            <table className='table table-sm table-striped table-condensed table-responsive table-bordered' style={{ maxHeight: '500px' }}>
                                <thead className='thead-light' style={{ position: 'sticky', top: '0', zindex: '1', border: '1px solid black' }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>Booking_Number</th>
                                        <th>Invoice_Number</th>
                                        <th>Room_Number</th>
                                        <th>Customer_ID</th>
                                        <th>Customer_Name</th>
                                        <th>Check_In</th>
                                        <th>Check_Out</th>
                                        <th>Days</th>
                                        <th>Rate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {bookingData.map((data, index) => {

                                        let isCheckedIn = get_RoomStatus(data)
                                        return (

                                            <tr key={index}>
                                                <td>{data.ID}</td>
                                                <td>{data.Booking_Number}</td>
                                                <td>{data.Invoice_Number}</td>
                                                <td>{data.Room_Number}</td>
                                                <td>{data.Customer_ID}</td>
                                                <td>{data.Customer_Name}</td>
                                                <td>{data.Check_In}</td>
                                                <td>{data.Check_Out}</td>
                                                <td>{data.Days}</td>
                                                <td>{data.Rate}</td>
                                                <td>
                                                    <button type="button" onClick={() => { handelInvoicePrint(data) }}
                                                        className='btn btn-info btn-sm' disabled={!isCheckedIn}>Invoice
                                                    </button>

                                                    <button type="button" className='btn btn-sm btn-secondary ml-1'
                                                        onClick={() => { handelAdvancePrint(data) }}>Advance
                                                    </button>

                                                    <button className='btn btn-sm btn-danger ml-1'
                                                        onClick={() => handelOnDelete(data)}>Delete
                                                    </button>

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
            <Footer />
        </>
    );
}

export default BookingReport;


