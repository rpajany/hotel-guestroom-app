import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import logo from '../images/file-upload.png'
// import logo from '../images/ggh.PNG'
import logo from '../images/pecock.jpg'
import axios from 'axios';
import { BaseURL, StringToCurrency, FormatToCurrency, stringDateTimeToAMPM, formatAMPM, formatDate, formatDateTime, CalculateDays, ConvertToServerDate, get_ServerDateTime } from '../utils/custom';
import { ToWords } from 'to-words';
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Extract_pdf = () => {

    // let location = useLocation();
    // let recivedData = location.state;
    let recivedData = {};







    const inputRef = useRef(null);

    // ------ function ---------------
    const printDocument = () => {

        html2canvas(inputRef.current).then((canvas) => {

            const imgData = canvas.toDataURL("image/JPEG"); // image/JPEG

        });

        const input = document.getElementById("divToPrint");
        const pdf = new jsPDF('l', 'pt', 'a4', true); // 'a4'
        pdf.setFontSize(6);
        pdf.verticalOffset += (pdf.lines.length + 2.5) * pdf.size / 72
        pdf.html(
            input,
            {
                callback: (docWithHtml) => {
                    docWithHtml.save("GI-Report.pdf");
                    input.style.width = '1800px';
                },
                width: 500,
                windowWidth: window.width
            }
        );
    };


    // console.log(recivedData)

    // const toWords = new ToWords();
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });


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

    const invoice_InitialState = {
        Booking_Number: recivedData.Booking_Number,
        Invoice_Number: recivedData.Invoice_Number,
        Invoice_Date: "",
        Item_Name: "",
        Qty: 0,
        Rate: 0,
        Discount: 0,
        Tax_Percent: "",

        Tax_Amount: 0,
        Amount: 0,
    }

    const invoiceDetalis_InitialState = {
        Gross_Total: 0,
        Taxable_Amount: 0,
        Discount_Amount: 0,
        Tax: 0,
        SGST: 0,
        CGST: 0,
        IGST: 0,


        Grand_Total: 0,
        Amount_Paid: 0,
        Amount_Balance: 0,
        Pay_Status: "",

    }

    const booking_InitialState = {
        Room_Number: recivedData.Room_Number,
        isCheckedIn: 0,
        Check_In: "",
        Check_Out: "",
        TotalDays: 0,
        Advance_Amount: 0.00,
        Discount_Percent: 0
    }

    const business_initialState = {

        // Booking_Date: formatDate(new Date()),
        // description: '-SELECT-',

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
    const [invoiceDate, setInvoiceData] = useState(invoice_InitialState);
    const [invoiceDetailsDate, setInvoiceDetailsDate] = useState(invoiceDetalis_InitialState);
    const [print, setPrint] = useState(false);

    // load data function ...
    useEffect(() => {
        // console.log(recivedData.Invoice_Date)
        const getData = async () => {
            await axios.post(BaseURL + "/booking/find",
                {
                    Booking_Number: recivedData.Booking_Number,
                    // Invoice_Number: recivedData.Invoice_Number,
                    Room_Number: recivedData.Room_Number
                }).then((response) => {
                    // console.log(response.data[0])
                    setbookingData((t) => ({ ...t, ...response.data[0] }))
                })




            // get invoce data
            await axios.post(BaseURL + "/invoice/find",
                {
                    Invoice_Number: recivedData.Invoice_Number,
                    // Invoice_Date: recivedData.Invoice_Date
                }).then((response) => {
                    // console.log(response.data[0])
                    setInvoiceData((t) => ({ ...t, ...response.data[0] }))
                })

            // get invoce Details data
            await axios.post(BaseURL + "/invoice_details/find",
                {
                    Invoice_Number: recivedData.Invoice_Number,
                    // Invoice_Date: invoiceDate.Invoice_Date
                    Invoice_Date: get_ServerDateTime(invoiceDate.Invoice_Date)
                }).then((response) => {
                    // console.log(response.data[0])
                    setInvoiceDetailsDate((t) => ({ ...t, ...response.data[0] }))
                })

            // get customer data
            await axios.post(BaseURL + "/customer/find",
                {
                    Customer_ID: recivedData.Customer_ID,
                    Customer_Name: recivedData.Customer_Name
                }).then((resX) => {
                    // console.log(resX.data[0])
                    setCustomerData((t) => ({ ...t, ...resX.data[0] }))
                })


            // get business data
            await axios.get(BaseURL + "/business/load").then((resX) => {
                // console.log(resX.data[0])
                setBusinessData((t) => ({ ...t, ...resX.data[0] }));
            })


            // console.log(data)

            // setBuisnessData(data[0])

            // console.log(buisnessData)

            setPrint(true);

        };

        getData();




    });



    useEffect(() => {


        if (print)

            setTimeout(() => {
                // window.print()

            }, 1500)

    }, [print])




    return (
        <>

            <div className="col-sm-12" style={{ textAlign: '-webkit-center', marginTop: '20px' }}>
                <button className="btn btn-success btn-md" onClick={printDocument}>Print</button>
            </div>

            <div id="divToPrint" ref={inputRef}>
                <div style={{ margin: '10px', marginLeft: '30px', marginRight: '10px' }}>
                    {/* <h1>Print Invoice</h1> */}
                    <div className='row'>
                        <div className='col-sm-2' style={{ textAlign: 'right' }}>
                            {/* <img src={logo} style={{ height: '100px', width: '100px' }} className="profile-user-img img-fluid img-circle" alt="logo" /> */}
                        </div>

                        <div className="col-sm-8" style={{ textAlign: 'center' }}>

                            <span style={{ fontSize: '30px' }}> <img src={logo} style={{ height: '100px', width: '100px' }} className="profile-user-img img-fluid img-circle" alt="logo" /><strong>{businessData.Name} </strong></span><br></br>
                            <span style={{ fontSize: '15px' }}>{businessData.Address}, </span>
                            <span style={{ fontSize: '15px' }}>{businessData.City}, </span>
                            <span style={{ fontSize: '15px' }}>{businessData.State} - {businessData.Zip}.</span><br></br>
                            <span style={{ fontSize: '15px' }}>Phone: {businessData.Mobile}, {businessData.Landline}, {businessData.Email}</span><br></br>
                            <span style={{ fontSize: '15px' }}> {businessData.Website.length ? 'Website: ' + businessData.Website : null}</span>

                        </div>
                    </div>
                    <hr></hr>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <span>{'Invoice No. '}<b>{invoiceDate.Invoice_Number}</b></span><br></br>

                            <span>{'Invoice Date.'} {
                                (invoiceDate.Invoice_Date.length >= 10)} {
                                    invoiceDate.Invoice_Date.substring(0, 10)
                                }
                            </span>
                        </div>
                        <div class="col-sm-4">
                            {/* <p style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '2px' }}>SUBJECT TO PUDUCHERRY JURISDICTION</p> */}

                            <p style={{ textAlign: 'center', marginBottom: '2px', fontSize: '25px', textDecoration: 'underline' }}><b>INVOICE</b></p>
                            <p style={{ textAlign: 'center', marginBottom: '2px' }}>{'(Original/Duplicate/Triplicate)'}</p>
                        </div>
                        <div class="col-sm-4">
                            <span>{'State: PUDUCHERRY'} </span><br></br>
                            <span>{'GSTIN : '}{businessData.GSTIN}</span>
                            {/* <p>{' MSME: '}<b>{'UDYAM-PY-03-0000752'}</b></p> */}

                        </div>

                    </div>

                    <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-8'>
                            <span><b>{'Bill To:'}</b></span><br></br>
                            <span>{customerDate.Customer_Name}</span><br></br>
                            <span>{customerDate.Address}, {customerDate.State === 'PUDUCHERRY' ? 'PUDUCHERRY' : null}</span><br></br>
                            <span>{customerDate.Country}</span><br></br>
                            <span style={{ textTransform: 'uppercase' }}>{customerDate.GSTIN ? "GSTIN: " + customerDate.GSTIN : null}</span><br></br>
                            <span>{customerDate.Phone}</span><br></br>
                            <span>{customerDate.Email}</span>
                        </div>

                        <div className='col-sm-4' style={{}}>
                            <span>Booking No.: {bookingDate.Booking_Number}</span><br></br>
                            <span>{'Check In : '}{stringDateTimeToAMPM(bookingDate.Check_In)}</span><br></br>
                            <span>{'Check Out : '}{stringDateTimeToAMPM(bookingDate.Check_Out)}</span>

                        </div>

                    </div>

                    <div className='row' style={{ marginTop: '15px' }}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item</th>
                                    <th>HSN</th>
                                    <th>Days</th>
                                    <th>Rate</th>
                                    <th>Discount %</th>
                                    <th>Discount</th>
                                    <th>Tax</th>
                                    <th>Tax Amount</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>{invoiceDate.Item_Name}</td>
                                    <td>996332</td>
                                    <td>{invoiceDate.Qty}</td>
                                    <td>{invoiceDate.Rate}</td>
                                    <td>{bookingDate.Discount_Percent}</td>
                                    <td>{invoiceDate.Discount_Amount}</td>
                                    <td>{invoiceDate.Tax_Percent} {'%'}</td>
                                    <td>{invoiceDate.Tax_Amount}</td>
                                    <td style={{ textAlign: 'left', paddingRight: '0px ' }}>{FormatToCurrency((invoiceDate.Amount).toFixed(2))}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    <hr></hr>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <span style={{ fontStyle: "" }}><b>{'Amount Chargeable (in words) :'}</b></span><br></br>
                            <span>INR :  </span>  <span style={{ fontStyle: 'italic' }}>  {toWords.convert(invoiceDetailsDate.Grand_Total)}</span>

                            <div className="row">

                                <div className="col-sm" style={{ marginTop: '125px', marginLeft: '40px' }}>
                                    <span></span><br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <span>{'* Customer Signature'}</span><br></br>
                                </div>

                                <div className="col-sm" style={{ marginTop: '125px' }}>
                                    <span>{'for '}{businessData.Name}</span><br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <span>{'Authorised Signatory'}</span><br></br>
                                </div>


                            </div>


                        </div>

                        <div className='col-sm-2'>

                        </div>

                        <div className='col-sm-4'>
                            <table class="table table-sm table-bordered">
                                <thead>
                                    <tr>
                                        <td class="col_Header">Gross Total</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{(invoiceDetailsDate.Gross_Total).toFixed(2)}</td>
                                    </tr>

                                    <tr>
                                        <td class="col_Header">Total Discount</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{(invoiceDetailsDate.Discount_Amount).toFixed(2)}</td>
                                    </tr>

                                    <tr>
                                        <td class="col_Header">Taxable Amount</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{(invoiceDetailsDate.Taxable_Amount).toFixed(2)}</td>
                                    </tr>


                                    <tr>
                                        <td class="col_Header">SGST</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{(invoiceDetailsDate.SGST).toFixed(2)}</td>
                                    </tr>

                                    <tr>
                                        <td class="col_Header">CGST</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{(invoiceDetailsDate.CGST).toFixed(2)}</td>
                                    </tr>


                                    <tr>
                                        <td class="col_Header">IGST</td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px' }}>{parseFloat(invoiceDetailsDate.IGST).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td class="col_Header"><b>Invoice Total</b></td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{(parseFloat(invoiceDetailsDate.Grand_Total).toFixed(2))}</b></td>
                                    </tr>
                                    <tr>
                                        <td class="col_Header"><b>Advance Amount</b></td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{(parseFloat(bookingDate.Advance_Amount).toFixed(2))}</b></td>
                                    </tr>
                                    <tr>
                                        <td class="col_Header"><b>Balance</b></td>
                                        <td class="col_Amount" style={{ textAlign: 'end', paddingRight: '30px ' }}><b>{(parseFloat(invoiceDetailsDate.Grand_Total - bookingDate.Advance_Amount).toFixed(2))}</b></td>
                                    </tr>
                                </thead>
                            </table>

                            {/* <span>{'for  '}</span><br></br>
                    <br></br>      <br></br>
                    <span>{'Authorised Signatory'}</span>
                    <br></br> */}
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-sm-9">

                        </div>

                        {/* <div className="col-sm-3">
                    <span>{'for Vishwakarma Technologies'}</span><br></br>
                    <br></br>
                    <span>{'Authorised Signatory'}</span><br></br>
                </div> */}
                    </div>

                    <hr></hr>

                    <div className='row'>
                        <div className='col-sm-12' style={{ textAlign: 'center' }}>
                            <span>{'Thank You, Visit again.. '} </span>
                        </div>

                    </div>

                </div >

            </div >
        </>
    )



}


export default Extract_pdf;