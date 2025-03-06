import React, { useState } from 'react'
import Flatpickr from "react-flatpickr";
import moment from 'moment';
import { formatDate, formatDateTime } from '../../utils/custom';
import "flatpickr/dist/themes/material_green.css";




export const FromDateTime = (props) => {

    let { Check_In, handelFromDate } = props;



    const [from_dateTime, setfromDateTime] = useState(new Date())
    // const [from_dateTime, setfromDateTime] = useState(Check_In)

    // fromDate = from_dateTime 'd-m-Y G:i:S K'
    return (
        <div>
            {/* <Flatpickr id="A" data-enable-time value={from_dateTime} onChange={([date]) => { setfromDateTime(date); handelFromDate(formatDateTime(date)) }} options={{ dateFormat: 'd-m-Y G:i:S ' }} className='form-control' /> */}
            <Flatpickr id="A" data-enable-time value={Check_In} onChange={([date]) => { setfromDateTime(date); handelFromDate(formatDateTime(date)) }} options={{ dateFormat: 'd-m-Y G:i:S K' }} className='form-control' />

        </div>
    )
}

export const ToDateTime = (props) => {
    let { Check_Out, handelToDate } = props;

    // console.log(Check_Out)
    const [to_dateTime, setToDateTime] = useState(new Date())
    // const [to_dateTime, setToDateTime] = useState(new Date(Check_Out))


    return (
        <div>
            {/* <Flatpickr id="B" data-enable-time value={to_dateTime} onChange={([date]) => { setToDateTime(date); handelToDate(formatDateTime(date)) }} options={{ dateFormat: 'd-m-Y G:i:S ' }} className='form-control' /> */}
            <Flatpickr id="B" data-enable-time value={Check_Out} onChange={([date]) => { setToDateTime(date); handelToDate(formatDateTime(date)) }} options={{ dateFormat: 'd-m-Y G:i:S K' }} className='form-control' />
        </div>
    )
}


export const FromDate = (props) => {

    let { fromDate, handelFromDate } = props;

    // Start of the current month
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');

    const [from_date, setfromDate] = useState(new Date(startOfMonth)) // new Date()

   

  


    // fromDate = from_dateTime 'd-m-Y G:i:S K'
    return (
        <div>

            <Flatpickr id="A" value={from_date} onChange={([date]) => { setfromDate(date); handelFromDate(formatDate(date)) }} options={{ dateFormat: 'd-m-Y' }} className='form-control' />
        </div>
    )
}

export const ToDate = (props) => {

  

    let { toDate, handelToDate } = props;

    // End of the current month
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

    const [to_date, setToDate] = useState(new Date(endOfMonth )) // new Date()

    // console.log('to_date', to_date)
    // console.log('new Date() :', new Date())

    return (
        <div>

            <Flatpickr id="B" value={to_date} onChange={([date]) => { setToDate(date); handelToDate(formatDate(date)) }} options={{ dateFormat: 'd-m-Y' }} className='form-control' />
        </div>
    )
}