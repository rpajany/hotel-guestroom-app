import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BaseURL, formatDate, formatDateTime, CalculateDays, convert_ServerDT_To_ShortDT, get_ServerDate } from '../utils/custom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { FromDate, ToDate } from '../components/common/DateTime_Picker';
import { LoadSpinner } from '../components/LoadSpinner';
import moment from 'moment';
import NavBar from "../Pages/Navbar";
import Footer from '../Pages/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const GstReport = () => {
    const calenderIcon = <FontAwesomeIcon icon={faCalendarDays} />

    // Start of the current month
    const startOfMonth = moment().startOf('month').format('DD-MM-YYYY'); // 'YYYY-MM-DD'
    // End of the current month
    const endOfMonth = moment().endOf('month').format('DD-MM-YYYY'); // 'YYYY-MM-DD'
    const [fromDate, setFromDate] = useState(startOfMonth); // formatDate(new Date())
    const [toDate, setToDate] = useState(endOfMonth); // formatDate(new Date())

    const [gstData, setGstData] = useState([]);
    const [loading, setLoading] = useState(false);

    // load data function ...
    useEffect(() => {

        const getData = async () => {
            // let { data } = await axios.get(BaseURL + "/invoice_details/load");
            setLoading(true);

            const strFromDate = get_ServerDate(fromDate);
            const strToDate = get_ServerDate(toDate);

            // console.log('Server DateTIme :', strFromDate + " 00:00:00", strToDate + " 23:59:59");


            let { data } = await axios.post(BaseURL + "/invoice_details/filterByDate",
                {

                    From_Date: strFromDate + " 00:00:00",
                    To_Date: strToDate + " 23:59:59",

                }
            );

            setGstData(data)

            setLoading(false);
        };

        getData();

    }, [fromDate, toDate]);


    const handelFromDate = (recivedFromDate) => {
        // console.log(recivedFromDate)

        if (recivedFromDate !== "") {
            setFromDate(recivedFromDate)

        }

    }

    const handelToDate = (recivedToDate) => {
        // console.log(recivedToDate)
        if (recivedToDate !== "") {
            setToDate(recivedToDate);
        }
    }


    const handelFilterData = async () => {
        setLoading(true);
        // console.log('Input DateTIme :', fromDate, toDate)


        const strFromDate = get_ServerDate(fromDate);
        const strToDate = get_ServerDate(toDate);

        // console.log('Server DateTIme :', strFromDate + " 00:00:00", strToDate + " 23:59:59");


        let { data } = await axios.post(BaseURL + "/invoice_details/filterByDate",
            {

                From_Date: strFromDate + " 00:00:00",
                To_Date: strToDate + " 23:59:59",

            }
        );

        setGstData(data)

        setLoading(false);
    }




    return (
        <>
            <NavBar />
            <div style={{ margin: '10px', marginLeft: '30px', marginRight: '30px' }}>


                <div className="card border-success">
                    <div className="text-white bg-success">
                        <h5 className="card-header">GST - Report</h5>
                    </div>

                    <div className="card-body">
                        <div className='row'>

                            <div className="col-sm-3" style={{ 'float': 'left' }}>
                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className=" btn btn-info"
                                    table="table-to-xls"
                                    filename="Report"
                                    sheet="sheet1"
                                    buttonText="Download as XLS" />




                            </div>
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


                            <div className='form-group row' style={{ marginLeft: '30px' }}>


                                <button type='button'
                                    onClick={() => { handelFilterData() }}
                                    className='btn btn-sm btn-warning'>Show</button>

                            </div>


                        </div>

                        {loading ? <LoadSpinner /> : (

                            <table id="table-to-xls" className='table table-sm table-striped table-condensed table-responsive table-bordered' style={{ maxHeight: '450px' }}>
                                <thead style={{ position: 'sticky', top: '0', zindex: '1', border: '1px solid black', backgroundColor: 'aquamarine', color: 'black' }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>GSTIN</th>
                                        <th>Invoice_Number</th>
                                        <th>Invoice_Date</th>
                                        <th>Gross_Total</th>
                                        <th>Taxable_Amount</th>
                                        <th>Discount_Amount</th>
                                        <th>Tax</th>
                                        <th>SGST</th>
                                        <th>CGST</th>
                                        <th>IGST</th>
                                        <th>Grand_Total</th>
                                        <th>Amount_Paid</th>
                                        <th>Amount_Balance</th>
                                        <th>Pay_Status</th>
                                        <th>Payment_Remarks</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {gstData.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.ID}</td>
                                                <td>{data.GSTIN}</td>
                                                <td>{data.Invoice_Number}</td>
                                                <td>{convert_ServerDT_To_ShortDT(data.Invoice_Date)}</td>
                                                <td>{data.Gross_Total}</td>
                                                <td>{data.Taxable_Amount}</td>
                                                <td>{data.Discount_Amount}</td>
                                                <td>{data.Tax}</td>
                                                <td>{data.SGST}</td>
                                                <td>{data.CGST}</td>
                                                <td>{data.IGST}</td>
                                                <td>{data.Grand_Total}</td>
                                                <td>{data.Amount_Paid}</td>
                                                <td>{data.Amount_Balance}</td>
                                                <td>{data.Pay_Status}</td>
                                                <td>{data.Payment_Remarks}</td>
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

export default GstReport;                                        