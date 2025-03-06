import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { BaseURL, FormatToCurrency, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';
import { FromDateTime, ToDateTime } from '../components/common/DateTime_Picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./Navbar";
import Footer from './Footer';

const Booking = () => {
    const navigate = useNavigate();
    let location = useLocation();
    let recivedData = location.state;
    console.log('recivedData :', recivedData);
    const calenderIcon = <FontAwesomeIcon icon={faCalendarDays} />

    const Customer_InitialState = {
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
        newCustomer: true,
    }
    const [customerData, setCustomerData] = useState(Customer_InitialState);

    const Room_InitialState = {
        Booking_Number: recivedData.Booking_Number,
        Room_Number: recivedData.Room_Number,
        Room_Type: recivedData.Room_Type,
        isCheckedIn: recivedData.isCheckedIn,
        Check_In: formatDateTime(new Date()),
        Check_Out: formatDateTime(new Date()),
        TotalDays: 0,
        isBooking: true,
    }

    const [roomData, setRoomData] = useState(Room_InitialState);

    const Invoice_InitialState = {
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

    }
    const [invoiceData, setInvoiceData] = useState(Invoice_InitialState);


    const handle_CustomerChange = (e) => {

    }
    const handle_RoomChange = (e) => {

    }

    const handle_InvoiceChange = (e) => {

    }

    // FromDate change ...
    const handelFromDate = (recivedFromDate) => {

    }

    // ToDate change ...
    const handelToDate = (recivedToDate) => {

    }

    // Customer Select ...
    const handel_CustomerSelect = () => {

    }

    // Advance ...
    const handle_Advance = () => {

    }

    const handle_FormSubmit = (e) => {
        e.preventDefault();
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

                        <form onSubmit={handle_FormSubmit}>

                            <div className='row'>
                                <div className='col-sm-6'>

                                    <div className="form-group row">
                                        <label htmfor="Room_Number" className="col-sm-3 col-form-label">Room No.</label>
                                        <div className="col-sm-2">
                                            <input
                                                type="text"
                                                name="Room_Number"
                                                id="Room_Number"
                                                onChange={handle_RoomChange}
                                                value={roomData.Room_Number}
                                                disabled
                                                className="form-control" />
                                        </div>

                                        <label htmfor="Booking_Number" className="col-sm-2 col-form-label">Booking No.</label>
                                        <div className="col-sm-3">
                                            <input
                                                type="text"
                                                name="Booking_Number"
                                                id="Booking_Number"
                                                onChange={handle_RoomChange}
                                                value={roomData.Booking_Number}
                                                disabled
                                                className="form-control" />
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
                                            <input
                                                type="text"
                                                name="Room_Type"
                                                id="Room_Type"
                                                onChange={handle_RoomChange}
                                                value={roomData.Room_Type}
                                                disabled

                                                className="form-control" />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="Customer_Name" className="col-sm-3 col-form-label">Customer Name</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="Customer_Name"
                                                name="Customer_Name"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Customer_Name}
                                                placeholder="Name.."
                                                className="form-control" />

                                        </div>
                                        <button type="button" className='btn btn-sm btn-warning'
                                            onClick={handel_CustomerSelect}
                                            disabled={updateMode ? 'disabled' : null}
                                        >Select</button>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Address" className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-7">

                                            <textarea
                                                type="text"
                                                id="Address"
                                                name="Address"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Address}
                                                placeholder="Address.."
                                                rows="5"
                                                className="form-control" />
                                        </div>
                                    </div>



                                    <div className="form-group row">
                                        <label htmfor="State" className="col-sm-3 col-form-label">State</label>
                                        <div className="col-sm-7">
                                            <select
                                                id="State"
                                                name="State"
                                                onChange={(e) => handle_CustomerChange(e)}
                                                value={customerData.State}
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
                                            <input
                                                type="text"
                                                id="Country"
                                                name="Country"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Country}
                                                placeholder="Country.."
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Phone" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="Phone"
                                                name="Phone"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Phone}
                                                placeholder="Phone.."
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="GSTIN" className="col-sm-3 col-form-label">GSTIN</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="GSTIN"
                                                name="GSTIN"
                                                onChange={handle_CustomerChange}
                                                value={customerData.GSTIN}
                                                placeholder="GSTIN.."
                                                className="form-control" style={{ textTransform: 'uppercase' }} />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="Proof_Details" className="col-sm-3 col-form-label">Proof Details</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="Proof_Details"
                                                name="Proof_Details"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Proof_Details}
                                                placeholder="Proof Details.."
                                                className="form-control" />
                                        </div>
                                    </div>




                                    <div className="form-group row" style={{}}>
                                        <label htmfor="ID_Proof" className="col-sm-3 col-form-label">Proof Attachment</label>
                                        <div className="col-sm-7">
                                            <input type="text"
                                                id="ID_Proof"
                                                name="ID_Proof"
                                                onChange={handle_CustomerChange}
                                                value={customerData.ID_Proof}
                                                placeholder="Proof Attachment"
                                                disabled
                                                className="form-control" />
                                        </div>
                                    </div>


                                    <div className="form-group row">
                                        <label htmfor="Email" className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="Email"
                                                name="Email"
                                                onChange={handle_CustomerChange}
                                                value={customerData.Email}
                                                placeholder="email.."
                                                className="form-control" />
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
                                            <input
                                                type="text"
                                                id="TotalDays"
                                                name="TotalDays"
                                                onChange={handle_RoomChange}
                                                value={roomData.TotalDays}
                                                placeholder="0"
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmfor="Add_Advance" className="col-sm-3 col-form-label">Add Advance</label>
                                        <div className="col-sm-7">
                                            <input
                                                type="text"
                                                id="Add_Advance"
                                                name="Add_Advance"
                                                onChange={handle_InvoiceChange}
                                                value={invoiceData.Add_Advance}
                                                placeholder="0"
                                                className="form-control" />
                                        </div>
                                        <button className='btn btn-sm btn-warning'
                                            id="btn_AddAdvance"
                                            onClick={handle_Advance}
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

                            <div style={{ display: roomData.isCheckedIn ? 'block' : 'none' }}>

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