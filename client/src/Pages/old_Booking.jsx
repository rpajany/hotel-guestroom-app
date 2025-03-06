// rfce tab
import React, { useCallback, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import WebCam from '../components/webCam';
import { useEffect } from 'react';
import { BaseURL, FormatToCurrency, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import Swal from 'sweetalert2';
import FileUpload from '../components/common/FileUpload';
import { FromDateTime, ToDateTime } from '../components/common/DateTime_Picker';
import axios from 'axios';

import { get_TaxPercentage, Save_CheckIN, Save_CheckOut, insert_AdvanceAmount, get_BookingTotalAdvance, Get_BookingDetails, Get_CustomerDetails, Save_FileUpload, Get_FileUpload, Calculate_Tax, CheckDuplicate_InvoiceNumber } from '../controller/booking_controller';
// import { Update_CheckOut } from './../controller/checkOut_contrller';
import Select from '../components/common/select';
import { Sql_Date, Get_Date } from '../utils/custom';
import '../App.css';


import TestX from '../components/test2';
import BookingReport from './Booking_Report';

import NavBar from "./Navbar";
import Footer from './Footer';




const Booking = (props) => {

    const navigate = useNavigate();
    const AttachmentCheck = <FontAwesomeIcon icon="fa-solid fa-file-arrow-up" />
    const calenderIcon = <FontAwesomeIcon icon={faCalendarDays} />
    let location = useLocation();
    let recivedData = location.state;
    console.log('recivedData :', recivedData)

    // let { Room_No } = useParams();



    const initialState = {


        // Booking_Date: formatDate(new Date()),
        // description: '-SELECT-',

        Customer_ID: recivedData.Customer_ID,
        Customer_Name: recivedData.Customer_Name, // recivedData.Guest_Name
        Address: "",
        State: "",//'-SELECT-',
        Country: '',
        Phone: recivedData.Mobile,
        GSTIN: '',
        ID_Proof: '',
        Proof_Details: '',
        Email: '',
        photo: '', // ''

        Booking_Number: recivedData.Booking_Number,
        Room_Number: recivedData.Room_Number,
        Room_Type: recivedData.Room_Type,
        isCheckedIn: recivedData.isCheckedIn,
        Check_In: formatDateTime(new Date()),
        Check_Out: formatDateTime(new Date()),
        TotalDays: 0,


        Invoice_Number: recivedData.Invoice_Number,
        Invoice_Date: "",//formatDateTime(new Date()),
        Item_Name: "",
        Qty: 0,
        Rate: recivedData.Rate,

        Gross_Total: 0,
        Discount_Percent: 0,
        Discount: 0,
        Tax_Percent: 0,
        Tax_Amount: 0,
        Amount: 0,

        Final_GrossTotal: 0,
        Final_Discount: 0,
        Final_TaxAmount: 0,
        Final_TaxableAmount: 0,
        SGST: 0,
        CGST: 0,
        IGST: 0.00,

        Grand_Total: 0.00,
        Advance_Amount: 0.00,
        Amount_Paid: 0.00,
        Amount_Balance: 0.00,
        Pay_Mode: "",
        Pay_Status: "",
        Payment_Remarks: "",

        Add_Advance: 0.00,


        newCustomer: true,
        isBooking: true,




    }




    // const [inputData, setInputData] = useState(initialState);
    const [inputData, setInputData] = useState(recivedData.newCustomer !== undefined ? recivedData : initialState);



    // const [imageSrc, setImageSrc] = useState(null);
    const [imageSrc, setImageSrc] = useState(recivedData.photo !== undefined ? recivedData.photo : null);

    const [fileSrc, setFileSrc] = useState("");

    // const [fromDate, setFromDate] = useState("")
    // const [toDate, setToDate] = useState("")
    const [buttonID, setButtonID] = useState("")

    const [updateMode, setUpdateMode] = useState(false);
    // const [newCustomer, setNewCustomer] = useState(true);




    const options = [
        { _id: '1', name: '-SELECT-', value: '-SELECT-' },
        { _id: '2', name: 'PUDUCHERRY', value: 'PUDUCHERRY' },
        { _id: '3', name: 'OTHERS', value: 'OTHERS' }
    ];




    const Update_bookingDetails = async (Room_Number, Booking_Number) => {
        try {
            // Fetch booking details ....
            const bookingDetails = await Get_BookingDetails(Room_Number, Booking_Number);
            // console.log('Get_BookingDetails :', bookingDetails[0]);
            if (bookingDetails && bookingDetails[0]) {
                const { Check_Out } = bookingDetails[0];

                setInputData(prev => ({
                    ...prev,
                    ...bookingDetails[0],
                    Invoice_Date: Check_Out,
                }));
            }
        } catch (error) {
            console.error("Error fetching booking details:", error);
        }
    }

    const Update_customerDetails = async (Customer_ID, Customer_Name) => {
        try {
            // Fetch customer details...
            const customerDetails = await Get_CustomerDetails(Customer_ID, Customer_Name);
            console.log('customerDetails[0]', customerDetails[0])
            // const { Address, State } = customerDetails[0];

            // Check if customerDetails has valid data
            if (customerDetails && customerDetails[0]) {
                setInputData((prev) => ({
                    ...prev,
                    ...customerDetails[0],
                    newCustomer: true,  // Mark as new customer
                }));
            } else {
                console.warn("No customer details found.");
            }

        } catch (error) {
            console.error("Error updating customer details:", error);
        }
    }


    useEffect(() => {
        const BookingData = async () => {

            try {
                await Update_bookingDetails(inputData.Room_Number, inputData.Booking_Number);
                await Update_customerDetails(inputData.Customer_ID, inputData.Customer_Name);

            } catch (error) {
                console.error("Error fetching booking or customer details:", error);
            }

        };

        if (recivedData.isCheckedIn === 0) {
            get_BookingNumber();
            // get_InvoiceNumber();
            if (inputData.newCustomer) {
                get_CustomerID();
            }


        }

       else if ((recivedData.isCheckedIn === 1) && (!updateMode)) {
            //     console.log('called BookingData...')

        //     BookingData();
        //    setUpdateMode(true)
            // get_InvoiceNumber();




        }





        // }, [inputData.Customer_ID, inputData.Customer_Name, recivedData.isCheckedIn, inputData.Room_Number, inputData.Booking_Number, inputData.newCustomer, updateMode]) // []
    }, [inputData, recivedData, updateMode]) // []


    console.log('isCheckedIn :', recivedData.isCheckedIn)
    console.log('updateMode :', updateMode)

    console.log('inputData :', inputData)


    const BookingData = async () => {

        try {
            if ((recivedData.isCheckedIn === 1) ) {
                await Update_bookingDetails(inputData.Room_Number, inputData.Booking_Number);
                await Update_customerDetails(inputData.Customer_ID, inputData.Customer_Name);
            }
           

        } catch (error) {
            console.error("Error fetching booking or customer details:", error);
        }

    };

    useEffect(() => {
        BookingData();
        
    },[])



    useEffect(() => {
        async function fetchTax() {
            let tax = await get_TaxPercentage();
            // console.log(tax)
            setInputData(inputData => ({ ...inputData, Tax_Percent: tax }));
        }
        fetchTax()

    }, [])




    //     const Calculate_Tax = () => {

    //         if (inputData.isCheckedIn === 1) {

    //             var price_SubTotal = 0;
    //             var afterDiscount_Price = 0;
    //             var taxAmt = 0;
    //             var final_grossTotal = 0;
    //             var final_TaxableAmount = 0;
    //             var final_TaxAmount = 0;
    //             var final_Discount = 0;
    //             var amount = 0;
    //             var gross = 0;
    //             var final_GrandTotal = 0;

    //             let { Rate, Qty, Discount_Percent, Discount, Tax_Percent, State, Amount_Paid } = inputData

    //             // console.log(Rate)
    //             // console.log(Qty)


    //             price_SubTotal = Rate * Qty;
    //             gross = parseFloat(price_SubTotal)
    //             final_grossTotal += parseFloat(price_SubTotal);

    //             var calc_Discount = parseFloat((final_grossTotal * Discount_Percent) / 100);
    //             setInputData(inputData => ({ ...inputData, Discount: calc_Discount }))

    //             // final_Discount += parseFloat(Discount);
    //             final_Discount += parseFloat(calc_Discount);
    //             afterDiscount_Price = price_SubTotal - Discount;

    //             final_TaxableAmount += parseFloat(afterDiscount_Price)
    //             taxAmt = parseFloat((afterDiscount_Price * Tax_Percent) / 100);

    //             final_TaxAmount += parseFloat(taxAmt);

    //             amount = parseFloat(afterDiscount_Price + taxAmt);

    //             final_GrandTotal += parseFloat(amount);



    //             const paidAmt = parseFloat(Amount_Paid)
    //             const balance = (final_GrandTotal - paidAmt)
    //             let PayStatus = "";


    //             if (balance <= 0) {
    //                 PayStatus = 'Paid'
    //             } else {
    //                 PayStatus = 'Not Paid'
    //             }

    //             if (State === 'PUDUCHERRY') {
    //                 console.log('State', State)
    //                 setInputData(inputData => ({ ...inputData, SGST: (taxAmt / 2).toFixed(2) }))
    //                 setInputData(inputData => ({ ...inputData, CGST: (taxAmt / 2).toFixed(2) }))
    //                 setInputData(inputData => ({ ...inputData, IGST: 0.00 }))
    //             }
    //             setInputData(inputData => ({ ...inputData, SGST: 0 }))
    //             setInputData(inputData => ({ ...inputData, CGST: 0 }))
    //             setInputData(inputData => ({ ...inputData, IGST: (taxAmt).toFixed(2) }))
    //         }

    //         setInputData(inputData => ({ ...inputData, Amount: (amount).toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Tax_Amount: (taxAmt).toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Gross_Total: (gross).toFixed(2) }))



    //         setInputData(inputData => ({ ...inputData, Final_GrossTotal: final_grossTotal.toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Final_TaxAmount: final_TaxAmount.toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Final_TaxableAmount: final_TaxableAmount.toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Final_Discount: final_Discount.toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Grand_Total: (final_GrandTotal).toFixed(2) }))

    //         setInputData(inputData => ({ ...inputData, Amount_Balance: (balance).toFixed(2) }))
    //         setInputData(inputData => ({ ...inputData, Pay_Status: PayStatus }))
    //     }



    // }



    // CHAT GPT FUNCTION ....
    const Calculate_Tax = () => {
        if (inputData.isCheckedIn === 1) {
            const {
                Rate = 0,
                Qty = 0,
                Discount_Percent = 0,
                Tax_Percent = 0,
                State,
                Amount_Paid = 0,
            } = inputData;

            const price_SubTotal = Rate * Qty;
            const calc_Discount = (price_SubTotal * Discount_Percent) / 100;
            const afterDiscount_Price = price_SubTotal - calc_Discount;
            const taxAmt = (afterDiscount_Price * Tax_Percent) / 100;
            const amount = afterDiscount_Price + taxAmt;
            const balance = amount - Amount_Paid;

            const PayStatus = balance <= 0 ? "Paid" : "Not Paid";

            const updatedInputData = {
                ...inputData,
                Discount: calc_Discount.toFixed(2),
                Amount: amount.toFixed(2),
                Tax_Amount: taxAmt.toFixed(2),
                Gross_Total: price_SubTotal.toFixed(2),
                Final_GrossTotal: price_SubTotal.toFixed(2),
                Final_TaxAmount: taxAmt.toFixed(2),
                Final_TaxableAmount: afterDiscount_Price.toFixed(2),
                Final_Discount: calc_Discount.toFixed(2),
                Grand_Total: amount.toFixed(2),
                Amount_Balance: balance.toFixed(2),
                Pay_Status: PayStatus,
                SGST: State === "PUDUCHERRY" ? (taxAmt / 2).toFixed(2) : "0.00",
                CGST: State === "PUDUCHERRY" ? (taxAmt / 2).toFixed(2) : "0.00",
                IGST: State === "PUDUCHERRY" ? "0.00" : taxAmt.toFixed(2),
            };

            setInputData(updatedInputData);
        }
    };



    // useEffect(() => {
    //     Calculate_Tax();
    // }, []);

    useEffect(() => {

        Calculate_Tax();



        // console.log(inputData.photo)

        // setImageSrc(inputData.photo)

        // const test = async () => {
        //     const data = await CheckDuplicate_InvoiceNumber(10)
        //     console.log(data);
        // }

        // test();

    }, [inputData.isCheckedIn, inputData.State, inputData.TotalDays, inputData.Qty, inputData.Tax_Percent, inputData.Rate, inputData.Discount_Percent, inputData.Amount_Paid,]) // newly added []



    // get BookingNumber functin
    const get_BookingNumber = async () => {
        try {
            const { data } = await axios.get(`${BaseURL}/uid/getBookingNo`);
            // setInputData(inputData => ({ ...inputData, Booking_Number: data[0].Booking_Number }));
            setInputData((prevInputData) => ({
                ...prevInputData,
                Booking_Number: data[0]?.Booking_Number || "", // Handle potential undefined values
            }));

        } catch (error) {
            console.error("Error fetching booking number:", error);
        }

    }


    // get InvoiceNumber function
    const get_InvoiceNumber = async () => {
        try {
            const { data } = await axios.get(`${BaseURL}/uid/getInvoiceNo`);
            // setInputData(inputData => ({ ...inputData, Invoice_Number: data[0].Invoice_Number }))
            setInputData((prevInputData) => ({
                ...prevInputData,
                Invoice_Number: data[0]?.Invoice_Number || "", // Handle potential undefined values
            }));
        } catch (error) {

        }


    }

    // get CustomerID function
    const get_CustomerID = async () => {
        try {
            const { data } = await axios.get(`${BaseURL}/uid/getCustomerID`);
            // setInputData(inputData => ({ ...inputData, Customer_ID: data[0].Customer_ID }))
            setInputData((prevInputData) => ({
                ...prevInputData,
                Customer_ID: data[0]?.Customer_ID || "", // Handle potential undefined values
            }));

        } catch (error) {
            console.error("Error fetching customer ID:", error);
        }

    }



    useEffect(() => {
        if (imageSrc !== "") {
            inputData.photo = imageSrc
            // console.log(inputData.photo)
        }
        // else if (recivedData.newCustomer === false) {
        //     inputData.photo = recivedData.photo
        // }
    }, [imageSrc])


    // count day's
    useEffect(() => {
        if ((inputData.Check_Out !== "") && (inputData.Check_In !== "")) {

            let daysCount = CalculateDays(inputData.Check_In, inputData.Check_Out)
            setInputData(inputData => ({ ...inputData, TotalDays: daysCount }))
            setInputData(inputData => ({ ...inputData, Qty: daysCount }))
        }

    }, [inputData.Check_Out, inputData.Check_In])



    const handelFromDate = (recivedFromDate) => {
        // console.log(recivedFromDate)

        if (recivedFromDate !== "") {
            setInputData(inputData => ({ ...inputData, Check_In: recivedFromDate }))

        }

    }

    const handelToDate = (recivedToDate) => {
        // console.log(recivedToDate)
        if (recivedToDate !== "") {

            setInputData(inputData => ({ ...inputData, Check_Out: recivedToDate }));

            setInputData(inputData => ({ ...inputData, Invoice_Date: recivedToDate }));
            // setInputData(inputData => ({ ...inputData, Invoice_Date: recivedToDate.length >= 10 ? recivedToDate.substring(0, 10) : recivedToDate }));


        }
    }







    // get upload file fame
    const handelFileUpload = (file, fileName) => {
        // console.log(file)

        setInputData(inputData => ({ ...inputData, ID_Proof: fileName }));
        // save upload to backed
        Save_FileUpload(file);

    }


    const handelInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)

        setInputData(prevState => ({
            ...prevState,
            [name]: value
        }))


    }


    // form submit function
    const handelFormSubmit = async (e) => {
        e.preventDefault();




        if (buttonID === "btn_CheckIn") {
            // console.log(inputData);

            Swal.fire({
                title: 'Check In !!!, Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Check In !'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    await Save_CheckIN(inputData).then((response) => { // then code added
                        console.log(response);
                        navigate("/home", { replace: true }); // new added code 
                    });


                    // redirect to home page
                    // navigate("/home", { replace: true });
                    // navigate("/home", { replace: true }); // old code

                    // Swal.fire(
                    //     'Check In!',
                    //     'success'
                    // )
                }


            })


        } else if (buttonID === "btn_CheckOut") {
            console.log(inputData.Invoice_Number);
            // await get_InvoiceNumber();


            // const result = await CheckDuplicate_InvoiceNumber(inputData.Invoice_Number).then((response) => {
            //     console.log(response);
            // });

            const result = await CheckDuplicate_InvoiceNumber(inputData.Invoice_Number);

            if (result >= 1) {

                console.log(result);
                console.log("Duplicate Invoice Number...!!!");



                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Duplicate Invoice Number...!!!',
                    footer: 'Invoice Number Already Saved'
                })
                return
            }




            if ((inputData.Invoice_Number === null) || (inputData.Invoice_Number === "")) {
                alert("Invoice Number Not Found");
                return
            }

            Swal.fire({
                title: 'Check Out !!!, Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Check Out !'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    await Save_CheckOut(inputData);

                    // redirect to bookingReport page
                    navigate("/bookingReport", { replace: true });


                    // Swal.fire(
                    //     'Check Out !!',
                    //     'success'
                    // )
                }


            })

        }




    }


    // function Advance Amount
    const handelAdvance = async () => {




        insert_AdvanceAmount(inputData.Booking_Number, Get_Date(new Date()), inputData.Add_Advance);

        let total_advance = (parseFloat(inputData.Advance_Amount) + parseFloat(inputData.Add_Advance))
        // console.log("sumAdvance", total_advance)
        setInputData(inputData => ({ ...inputData, Advance_Amount: total_advance.toFixed(2) }));

        // update_TotalAdvance();

        setInputData(inputData => ({ ...inputData, Add_Advance: 0 }));

    }



    // const update_TotalAdvance = async () => {
    //     let total_advance = await get_BookingTotalAdvance(inputData.Advance_Amount);
    //     let add_advance = parseFloat([...inputData.Add_Advance]);
    //     total_advance = (total_advance + add_advance);

    //     console.log(total_advance)
    //     setInputData(inputData => ({ ...inputData, Advance_Amount: total_advance }));
    // }


    const handel_CustomerSelect = () => {


        // setNewCustomer(false);
        setInputData(inputData => ({ ...inputData, newCustomer: false }));
        // const xx = {
        //     recivedData: recivedData,
        //     Room_Number: inputData.Room_Number,
        //     isBooking: true,
        //     newCustomer: newCustomer
        // }

        navigate("/customer", { state: inputData });
    }


    return (
        <>
            <NavBar />
            <div style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>


                <div className="card border-primary">
                    <div className="text-white bg-primary">
                        <h5 className="card-header">Room Booking</h5>
                    </div>

                    <div className="card-body" style={{ backgroundColor: 'gainsboro' }}>

                        <form onSubmit={handelFormSubmit}>

                            <div className='row'>
                                <div className='col-sm-6'>

                                    <div className="form-group row">
                                        <label htmfor="Room_Number" className="col-sm-3 col-form-label">Room No.</label>
                                        <div className="col-sm-2">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Room_Number" id="Room_Number" value={inputData.Room_Number} disabled />
                                        </div>

                                        <label htmfor="Booking_Number" className="col-sm-2 col-form-label">Booking No.</label>
                                        <div className="col-sm-3">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Booking_Number" id="Booking_Number" value={inputData.Booking_Number} disabled />
                                        </div>

                                    </div>

                                    <div className="form-group row">
                                        {/* <label htmfor="Room_Number" className="col-sm-3 col-form-label">Room Number</label>
                                        <div className="col-sm-2">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Room_Number" id="Room_Number" value={inputData.Room_Number} disabled />
                                        </div> */}

                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Room_Type" className="col-sm-3 col-form-label">Room Type</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Room_Type" id="Room_Type" value={inputData.Room_Type} disabled />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="Customer_Name" className="col-sm-3 col-form-label">Customer Name</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Customer_Name" id="Customer_Name" value={inputData.Customer_Name} placeholder="Name.." />

                                        </div>
                                        <button type="button" className='btn btn-sm btn-warning'
                                            onClick={handel_CustomerSelect}
                                            disabled={updateMode ? 'disabled' : null}
                                        >Select</button>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Address" className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-7">
                                            {/* <input type="text" onChange={handelInputChange} className="form-control" name="Address" id="Address" value={inputData.Address} placeholder="Address.." /> */}
                                            <textarea type="text" onChange={handelInputChange} className="form-control" name="Address" id="Address" value={inputData.Address} placeholder="Address.." rows="5" />
                                        </div>
                                    </div>


                                    {/* <Select
                                        name={'State'}
                                        value={inputData.State}
                                        label={'State'}
                                        options={options}
                                        onChange={handelInputChange}
                                    // error={errors[name]}
                                    /> */}

                                    <div className="form-group row">
                                        <label htmfor="State" className="col-sm-3 col-form-label">State</label>
                                        <div className="col-sm-7">
                                            <select
                                                id="State"
                                                name="State"
                                                onChange={(e) => handelInputChange(e)}
                                                value={inputData.State}
                                                required
                                                className="form-control">
                                                <option value="">- Select -</option>
                                                <option value="PUDUCHERRY">PUDUCHERRY</option>
                                                <option value="OTHERS">OTHERS</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Country" className="col-sm-3 col-form-label">Country</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Country" id="Country" value={inputData.Country} placeholder="Country.." />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Phone" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Phone" id="Phone" value={inputData.Phone} placeholder="Phone.." />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="GSTIN" className="col-sm-3 col-form-label">GSTIN</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="GSTIN" id="GSTIN" value={inputData.GSTIN} placeholder="GSTIN.." style={{ textTransform: 'uppercase' }} />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="Proof_Details" className="col-sm-3 col-form-label">Proof Details</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Proof_Details" id="Proof_Details" value={inputData.Proof_Details} placeholder="Proof Details.." />
                                        </div>
                                    </div>




                                    <div className="form-group row" style={{}}>
                                        <label htmfor="ID_Proof" className="col-sm-3 col-form-label">Proof Attachment</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="ID_Proof" id="ID_Proof" value={inputData.ID_Proof} placeholder="Proof Attachment" disabled />
                                        </div>
                                    </div>





                                    <div className="form-group row">
                                        <label htmfor="Email" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} className="form-control" name="Email" id="Email" value={inputData.Email} placeholder="email.." />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Check_In" className="col-sm-3 col-form-label">CheckIn</label>
                                        <div className="col-sm-7">
                                            {/* <input type="text" className="form-control" id="Check_In" value={inputData.Check_In} /> */}
                                            {/* <Flatpickr id="xxx" data-enable-time value={inputData.Date_CheckIn} onChange={([date]) => { setInputData({ Date_CheckIn: date }) }} options={{ dateFormat: 'd-m-Y G:i:S K' }} className='form-control' /> */}
                                            <FromDateTime handelFromDate={handelFromDate} {...inputData} />
                                        </div>
                                        <span style={{ marginTop: '5px' }}>{calenderIcon}</span>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Check_Out" className="col-sm-3 col-form-label">CheckOut</label>
                                        <div className="col-sm-7">
                                            {/* <input type="text" className="form-control" id="Check_Out" value={inputData.Check_Out} /> */}
                                            {/* <Flatpickr id="www" data-enable-time value={inputData.Date_CheckOut} onChange={([date]) => { setInputData({ Date_CheckOut: date }) }} options={{ dateFormat: 'd-m-Y G:i:S K' }} className='form-control' /> */}
                                            <ToDateTime handelToDate={handelToDate} {...inputData} />
                                        </div>
                                        <span style={{ marginTop: '5px' }}>{calenderIcon}</span>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="TotalDays" className="col-sm-3 col-form-label">Total Days</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} value={inputData.TotalDays} className="form-control" name="TotalDays" id="TotalDays" placeholder="0" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Add_Advance" className="col-sm-3 col-form-label">Add Advance</label>
                                        <div className="col-sm-7">
                                            <input type="text" onChange={handelInputChange} value={inputData.Add_Advance} className="form-control" name="Add_Advance" id="Add_Advance" placeholder="0" />
                                        </div>
                                        <button className='btn btn-sm btn-warning'
                                            id="btn_AddAdvance"
                                            onClick={handelAdvance}
                                        >Add</button>
                                    </div>



                                    {/* <div className="form-group row justify-content-start">
                                    <div className="col-sm-3">

                                    </div>
                                    <div className="col-sm-7">

                                        <button type="submit"
                                            onClick={(e) => { setButtonID(e.target.id); }}
                                            className={recivedData.isCheckedIn ? 'btn btn-block btn-sm btn-warning' : 'btn btn-block btn-sm btn-success'}
                                            id={recivedData.isCheckedIn ? 'btn_CheckOut' : 'btn_CheckIn'}>
                                            {recivedData.isCheckedIn ? 'Check-Out' : 'Check-In'}
                                        </button>
                                    </div>

                                </div> */}


                                </div>


                                <div className='col-sm-3'>

                                    {/* <FileUpload setFileName={setFileName} handelFileChange={handelFileChange} /> */}
                                    <FileUpload handelFileUpload={handelFileUpload} fileSrc={fileSrc} />
                                </div>

                                {inputData.isCheckedIn || inputData.newCustomer === false ?

                                    <div div className='col-sm-3' >
                                        <div>
                                            <p>Photo</p>

                                        </div>

                                        <div className="webcam-img">
                                            <img src={inputData.photo} alt='' style={{ border: '1px solid #ccc' }} />
                                        </div>
                                    </div>
                                    : inputData.isCheckedIn === 0 ?

                                        <div className='col-sm-3'>
                                            <WebCam setImageSrc={setImageSrc} />
                                        </div>
                                        : null
                                }

                                {/* {inputData.isCheckedIn === 0 ?
                                    <div className='col-sm-3'>
                                        <WebCam setImageSrc={setImageSrc} />
                                    </div> : null

                                } */}
                            </div>







                            {/* <a href="#" className="btn btn-secondary">Go somewhere</a> */}

                            {/* </form> */}

                            <div style={{ display: inputData.isCheckedIn ? 'block' : 'none' }}>

                                <hr style={{ borderColor: '#28a745' }}></hr>

                                <div className="form-group row" style={{ marginTop: '40px' }}>



                                    <label htmfor="Invoice_Number" className="col-sm-2 ">Invoice No.</label>
                                    <div className="col-sm-3">
                                        <input type="text" onChange={handelInputChange} className="form-control" name="Invoice_Number" id="Invoice_Number" value={inputData.Invoice_Number} placeholder="Invoice No.." required={inputData.isCheckedIn ? 'required' : null} />
                                    </div>


                                    <label htmfor="Invoice_Date" className="col-sm-2">Invoice Date:</label>
                                    <div className="col-sm-2">
                                        {/* <input type="date" onChange={(e) => { setInputData(inputData => ({ ...inputData, Invoice_Date: e.target.value })) }} className="form-control" name="Invoice_Date" id="Invoice_Date" value={inputData.Invoice_Date} /> */}
                                        {/* <input type="text" value={inputData.Check_Out}
                                        onChange={(e) => { setInputData(inputData => ({ ...inputData, Invoice_Date: formatDateTime(e.target.value) })) }} className="form-control" name="Invoice_Date" id="Invoice_Date" /> */}

                                        <input type="text" value={inputData.Check_Out}
                                            onChange={(e) => { setInputData(inputData => ({ ...inputData, Invoice_Date: e.target.value })) }} className="form-control" name="Invoice_Date" id="Invoice_Date" />
                                    </div>


                                </div>

                                <div className='row' style={{ marginTop: '40px' }}>
                                    <table className='table table-sm  table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item/Desc</th>
                                                <th>Qty/Days</th>

                                                <th>Rate</th>
                                                <th>Gross</th>
                                                <th>Discount %</th>
                                                <th>Discount</th>

                                                <th>Tax %</th>
                                                <th>Tax Amount</th>
                                                {/* <th>SGST</th>
                                            <th>CGST</th>
                                            <th>IGST</th> */}
                                                <th>Amount</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td>1</td> */}
                                                <td width={'70px'}><input value={1} className="form-control" readOnly /></td>
                                                <td width={'400px'}><input name="Item_Name" id="Item_Name" onChange={handelInputChange} className="form-control" value={inputData.Item_Name = 'Room No:' + (inputData.Room_Number) + ',Type:' + inputData.Room_Type + ' - Rent'} style={{ border: 'none' }} /></td>
                                                <td width={'10px'}><input name="Qty" id="Qty" onChange={handelInputChange} className="form-control" value={inputData.Qty} style={{ border: 'none' }} /></td>
                                                <td><input name="Rate" id="Rate" onChange={handelInputChange} className="form-control" value={inputData.Rate} /></td>
                                                <td><input name="Gross_Total" id="Gross_Total" onChange={handelInputChange} className="form-control" value={inputData.Gross_Total} readOnly style={{ backgroundColor: 'white' }} /></td>
                                                <td ><input name="Discount_Percent" id="Discount_Percent" onChange={handelInputChange} className="form-control" value={inputData.Discount_Percent} /></td>
                                                <td ><input name="Discount" id="Discount" onChange={handelInputChange} className="form-control" value={inputData.Discount} readOnly style={{ backgroundColor: 'white' }} /></td>


                                                <td><input name="Tax_Percent" id="Tax_Percent" onChange={handelInputChange} className="form-control" value={inputData.Tax_Percent} readOnly style={{ backgroundColor: 'white' }} /></td>
                                                <td><input name="Tax_Amount" id="Tax_Amount" onChange={handelInputChange} className="form-control" value={inputData.Tax_Amount} readOnly style={{ backgroundColor: 'white' }} /></td>
                                                {/* <td><input name="SGST" id="SGST" onChange={handelInputChange} className="form-control" value={inputData.SGST} /></td>
                                            <td><input name="CGST" id="CGST" onChange={handelInputChange} className="form-control" value={inputData.CGST} /></td>
                                            <td><input name="IGST" id="IGST" onChange={handelInputChange} className="form-control" value={inputData.IGST} /></td> */}
                                                <td style={{ textAlign: 'right', paddingleft: '0px' }}><input name="Grand_Total" id="Grand_Total" onChange={handelInputChange} className="form-control" value={inputData.Grand_Total} readOnly style={{ backgroundColor: 'white' }} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-8' style={{ marginTop: '280px' }}>

                                        <div className="form-group row">
                                            <label htmfor="Amount_Paid" className="col-sm-2 col-form-label">Amount Paid</label>
                                            <div className="col-sm-3">
                                                <input type="text" name="Amount_Paid" id="Amount_Paid" onChange={handelInputChange} value={inputData.Amount_Paid} className="form-control" placeholder="" />
                                            </div>
                                            <select onChange={handelInputChange} value={inputData.Pay_Mode} id="Pay_Mode" name="Pay_Mode" className="col-sm-2 form-control" style={{ height: '38px', marginLeft: '50px' }}>
                                                <option value="" selected>-- Select --</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Cheque">Cheque</option>
                                                <option value="Online">Online</option>
                                            </select>
                                        </div>

                                        <div className="form-group row">
                                            <label for="Payment_Remarks" className="col-sm-2 col-form-label">Payment Note</label>
                                            <div className="col-sm-6" style={{ marginRight: '0px' }}>
                                                <input type="text" value={inputData.Payment_Remarks} onChange={handelInputChange} id="Payment_Remarks" name="Payment_Remarks" className="form-control" style={{}} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-sm-4'>
                                        <table className="table table-sm table-bordered">
                                            <thead>
                                                <tr>
                                                    <td className="col_Header">Gross Total</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.Final_GrossTotal}</td>
                                                </tr>

                                                <tr>
                                                    <td className="col_Header">Total Discount</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.Final_Discount}</td>
                                                </tr>

                                                <tr>
                                                    <td className="col_Header">Taxable Amount</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.Final_TaxableAmount}</td>
                                                </tr>


                                                <tr>
                                                    <td className="col_Header">SGST</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.SGST}</td>
                                                </tr>

                                                <tr>
                                                    <td className="col_Header">CGST</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.CGST}</td>
                                                </tr>


                                                <tr>
                                                    <td className="col_Header">IGST</td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{inputData.IGST}</td>
                                                </tr>
                                                <tr>
                                                    <td className="col_Header"><b>Invoice Total</b></td>
                                                    <td className="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}><b>{inputData.Grand_Total}</b></td>
                                                </tr>
                                                <tr>
                                                    <td class="col_Header"><b>Advance Amount</b></td>
                                                    {/* <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{((inputData.Advance_Amount).toFixed(2))}</b></td> */}
                                                    <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{(inputData.Advance_Amount)}</b></td>
                                                </tr>
                                                <tr>
                                                    <td class="col_Header"><b>Balance</b></td>
                                                    <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{((inputData.Grand_Total - inputData.Advance_Amount).toFixed(2))}</b></td>
                                                </tr>
                                            </thead>
                                        </table>

                                        {/* <span>{'for  '}</span><br></br>
                    <br></br>      <br></br>
                    <span>{'Authorised Signatory'}</span>
                    <br></br> */}
                                    </div>

                                </div>




                            </div>







                            <div className="form-group row justify-content-start" style={{ marginTop: '10px' }}>
                                <div className="col-sm-3">

                                </div>
                                <div className="col-sm-7">

                                    <button type="submit"
                                        onClick={(e) => { setButtonID(e.target.id); }}
                                        className={recivedData.isCheckedIn ? 'btn btn-block btn-sm btn-warning' : 'btn btn-block btn-sm btn-success'}
                                        id={recivedData.isCheckedIn ? 'btn_CheckOut' : 'btn_CheckIn'}>
                                        {recivedData.isCheckedIn ? 'Check-Out' : 'Check-In'}
                                    </button>
                                </div>

                            </div>

                            {/* <hr style={{ borderColor: '#28a745' }}></hr> */}

                        </form>

                        {/* <img src="http://localhost:8080/uploads/balance.png" height="100px" width="5px" class="card-img-top img-responsive" alt="img"></img> */}


                    </div>     { /* eND Card Body */}
                </div >

            </div >

            <Footer />
        </>

    )
}

export default Booking