import axios from 'axios';
import { BaseURL, Get_Date, stringDateTimeToAMPM, formatDate, formatDateTime, CalculateDays, ConvertToServerDate, get_ServerDateTime } from '../utils/custom';


// get InvoiceNumber function
export const get_TaxPercentage = async () => {
    try {
        let { data } = await axios.get(BaseURL + "/uid/getTaxPercentage");

        // console.log(data[0].Tax)
        return data[0].Tax;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}








// get InvoiceNumber function
export const get_InvoiceNumber = async () => {
    try {
        let { data } = await axios.get(BaseURL + "/uid/getInvoiceNo");

        // setInputData(inputData => ({ ...inputData, Invoice_Number: data[0].Invoice_Number }))
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// get CustomerID function
export const get_CustomerID = async () => {
    try {
        let { data } = await axios.get(BaseURL + "/uid/getCustomerID");

        // setInputData(inputData => ({ ...inputData, Customer_ID: data[0].Customer_ID }))
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}





export const Save_CheckIN = async (inputData) => {

    // //console.log(inputData);

    // // insert customer details
    // if (inputData.newCustomer) {
    //     let { data } = await axios.post(BaseURL + "/customer/insert", inputData);
    //     // console.log(data);
    // }




    // // update Room Status
    // await axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, {
    //     Customer_ID: inputData.Customer_ID,
    //     Customer_Name: inputData.Customer_Name,
    //     Phone: inputData.Phone,
    //     Booking_Number: inputData.Booking_Number,
    //     // Invoice_Number: inputData.Invoice_Number,
    //     isCheckedIn: 1
    // });

    // // insert Booking
    // await axios.post(BaseURL + "/booking/insert", {
    //     Booking_Number: inputData.Booking_Number,
    //     // Invoice_Number: inputData.Invoice_Number,
    //     Room_Number: inputData.Room_Number,
    //     Customer_ID: inputData.Customer_ID,
    //     Customer_Name: inputData.Customer_Name,
    //     Check_In: inputData.Check_In,
    //     Check_Out: inputData.Check_Out,
    //     Days: inputData.TotalDays,
    //     Rate: inputData.Rate,
    //     Advance_Amount: inputData.Advance_Amount,
    // }).then((response) => {
    //     console.log("resp", response.data);
    // });

    // // update invoice UID ...
    // // let newInvoice_uid = parseInt(inputData.Invoice_Number) + 1

    // // await axios.put(BaseURL + "/uid/updateInvoiceNo", {

    // //     Invoice_Number: newInvoice_uid,

    // // });

    // if (inputData.newCustomer) {
    //     // update customer UID ...
    //     let newCustomer_uid = parseInt(inputData.Customer_ID) + 1

    //     await axios.put(BaseURL + "/uid/updateCustomerID", {

    //         Customer_ID: newCustomer_uid,

    //     });
    // }


    // // update Booking UID ...
    // let newBooking_uid = parseInt(inputData.Booking_Number) + 1

    // await axios.put(BaseURL + "/uid/updateBookingNo", {
    //     Booking_Number: newBooking_uid,
    // });



    // ........................ Update code ............................


    try {

        // const apiCalls = [];

        // insert customer details
        // if (inputData.newCustomer) {
        //     apiCalls.push(await axios.post(BaseURL + "/customer/insert", inputData));
        // }

        // update Room Status
        // apiCalls.push(await axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, {
        //     Customer_ID: inputData.Customer_ID,
        //     Customer_Name: inputData.Customer_Name,
        //     Phone: inputData.Phone,
        //     Booking_Number: inputData.Booking_Number,
        //     // Invoice_Number: inputData.Invoice_Number,
        //     isCheckedIn: 1
        // }));

        // insert Booking
        // apiCalls.push(await axios.post(BaseURL + "/booking/insert", {
        //     Booking_Number: inputData.Booking_Number,
        //     // Invoice_Number: inputData.Invoice_Number,
        //     Room_Number: inputData.Room_Number,
        //     Customer_ID: inputData.Customer_ID,
        //     Customer_Name: inputData.Customer_Name,
        //     Check_In: inputData.Check_In,
        //     Check_Out: inputData.Check_Out,
        //     Days: inputData.TotalDays,
        //     Rate: inputData.Rate,
        //     Advance_Amount: inputData.Advance_Amount,
        // }).then((response) => {
        //     console.log("resp", response.data);
        // }));

        // update customer UID ...
        // if (inputData.newCustomer) {
        //     // let newCustomer_uid = parseInt(inputData.Customer_ID) + 1;

        //     apiCalls.push(await axios.put(BaseURL + "/uid/updateCustomerID", {
        //         // Customer_ID: newCustomer_uid,
        //         Customer_ID: parseInt(inputData.Customer_ID) + 1,
        //     }));
        // }

        // update Booking UID ...
        //let newBooking_uid = parseInt(inputData.Booking_Number) + 1;

        // apiCalls.push(await axios.put(BaseURL + "/uid/updateBookingNo", {
        //     // Booking_Number: newBooking_uid,
        //     Booking_Number: parseInt(inputData.Booking_Number) + 1
        // }));


        // Wait for all POST API calls to complete
        // await Promise.all(apiCalls);



        // .... New Code ......
        // 1. insert customer details
        if (inputData?.newCustomer) {
            try {
                const response_1 = await axios.post(BaseURL + "/customer/insert", inputData);
                console.log("1. Customer inserted successfully:", response_1.data);
            } catch (error) {
                console.error("Error inserting customer:", error.response?.data || error.message);
            }

        }

        // 2. update Room Status
        try {
            const response_2 = await axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, {
                Customer_ID: inputData.Customer_ID,
                Customer_Name: inputData.Customer_Name,
                Phone: inputData.Phone,
                Booking_Number: inputData.Booking_Number,
                // Invoice_Number: inputData.Invoice_Number,
                isCheckedIn: 1
            });

            console.log("2. Update Room Status successfully:", response_2.data);
        } catch (error) {
            console.error("Error Update Room Status :", error.response?.data || error.message);
        }

        // 3. Insert Booking
        try {
            const response_3 = await axios.post(BaseURL + "/booking/insert", {
                Booking_Number: inputData.Booking_Number,
                // Invoice_Number: inputData.Invoice_Number,
                Room_Number: inputData.Room_Number,
                Customer_ID: inputData.Customer_ID,
                Customer_Name: inputData.Customer_Name,
                Check_In: inputData.Check_In,
                Check_Out: inputData.Check_Out,
                Days: inputData.TotalDays,
                Rate: inputData.Rate,
                Advance_Amount: inputData.Advance_Amount,
            });

            console.log("3. Insert Booking Successfully:", response_3.data);

        } catch (error) {
            console.error("Error Insert Booking :", error.response?.data || error.message);
        }

        // 4. Update Customer UID ...
        if (inputData.newCustomer) {
            try {
                const response_4 = await axios.put(BaseURL + "/uid/updateCustomerID", {
                    Customer_ID: parseInt(inputData.Customer_ID) + 1,
                });
                console.log("4. Update Customer UID Successfully:", response_4.data);
            } catch (error) {
                console.error("Error Update Customer UID :", error.response?.data || error.message);
            }

        }

        // 5. Update Booking UID ...
        try {
            const response_5 = await axios.put(BaseURL + "/uid/updateBookingNo", {
                Booking_Number: parseInt(inputData.Booking_Number) + 1
            });
            console.log("5. Update Booking UID Successfully:", response_5.data);
        } catch (error) {
            console.error("Error Update Booking UID :", error.response?.data || error.message);
        }



    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

export const Save_CheckOut = async (inputData) => {

    // console.log(inputData);

    if ((inputData.Invoice_Number === null) || (inputData.Invoice_Number === "")) {
        console.log("Invoice Number Missing..!!");
        return
    }


    try {
        const result = await CheckDuplicate_InvoiceNumber(inputData.Invoice_Number);
        if (result >= 1) {
            console.log(result);
            console.log("Duplicate Invoice Number...!!!");
            return
        }
    } catch (error) {
        console.error("Error Check Duplicate Invoice Number :", error.response?.data || error.message);
    }










    // insert customer details
    // let { data } = await axios.post(BaseURL + "/customer/insert", inputData);

    // console.log(data);



    // insert Booking
    // await axios.post(BaseURL + "/booking/insert", {
    //     Invoice_Number: inputData.Invoice_Number,
    //     Room_Number: inputData.Room_Number,
    //     Customer_ID: inputData.Customer_ID,
    //     Customer_Name: inputData.Customer_Name,
    //     Check_In: inputData.Check_In,
    //     Check_Out: inputData.Check_Out,
    //     Days: inputData.TotalDays,
    //     Rate: inputData.Rate,
    // });




    try {

        // Data for POST requests
        const RoomStatus_PostData = {
            Customer_ID: "",
            Customer_Name: "",
            Phone: "",
            Booking_Number: "",
            Invoice_Number: "",
            isCheckedIn: 0
        };


        const invoiceItems_PostData = {
            Booking_Number: inputData.Booking_Number,
            Invoice_Number: inputData.Invoice_Number,
            Invoice_Date: inputData.Invoice_Date,
            Item_Code: "",
            Item_Name: inputData.Item_Name,
            Qty: inputData.Qty,
            Rate: inputData.Rate,

            Discount_Percent: "",
            // Discount_Percent: inputData.Discount_Percent,
            Discount_Amount: inputData.Discount,
            Tax_Percent: inputData.Tax_Percent,
            Tax_Amount: inputData.Tax_Amount,
            Amount: inputData.Amount
        }
        const invoiceDetails_PostData = {
            GSTIN: inputData.GSTIN,
            Invoice_Number: inputData.Invoice_Number,
            // Invoice_Date: inputData.Invoice_Date,
            Invoice_Date: get_ServerDateTime(inputData.Invoice_Date),
            Catagory: "",
            Gross_Total: inputData.Final_GrossTotal,
            // Taxable_Amount: inputData.Final_TaxAmount,
            Taxable_Amount: inputData.Final_TaxableAmount,
            // Discount_Percent: inputData.Discount_Percent,
            Discount_Amount: inputData.Final_Discount,
            Tax: inputData.Tax_Percent,
            SGST: inputData.SGST,
            CGST: inputData.CGST,
            IGST: inputData.IGST,
            Grand_Total: inputData.Grand_Total,
            Amount_Paid: inputData.Amount_Paid,
            Amount_Balance: inputData.Amount_Balance,
            Pay_Status: inputData.Pay_Status,
            Payment_Remarks: inputData.Payment_Remarks,
            Customer_ID: inputData.Customer_ID,
            Customer_Name: inputData.Customer_Name,
            Booking_Number: inputData.Booking_Number
        }

        const BookingCheckout_PostData = {
            Invoice_Number: inputData.Invoice_Number,
            Check_In: inputData.Check_In,
            Check_Out: inputData.Check_Out,
            Days: inputData.TotalDays,
            Advance_Amount: inputData.Advance_Amount,
            Discount_Percent: inputData.Discount_Percent
        }

        const CustomerDetails_PostData = {
            Customer_Name: inputData.Customer_Name,
            Address: inputData.Address,
            State: inputData.State,
            Country: inputData.Country,
            Phone: inputData.Phone,
            GSTIN: inputData.GSTIN,
            Proof_Details: inputData.Proof_Details,
            ID_Proof: inputData.ID_Proof,
            Email: inputData.Email,
        }

        // const apiCalls = [
        //     // update Room Status
        //     axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, RoomStatus_PostData),
        //     // insert invoice items
        //     axios.post(BaseURL + "/invoice/insert", invoiceItems_PostData),
        //     // insert invoice Details
        //     axios.post(BaseURL + "/invoice_details/insert", invoiceDetails_PostData),
        //     // update checkout date and no. of day's
        //     axios.put(BaseURL + "/booking/update/" + inputData.Booking_Number, BookingCheckout_PostData),
        //     // update customer details
        //     axios.put(BaseURL + "/customer/update/" + inputData.Customer_ID, CustomerDetails_PostData)

        // ];

        // // Wait for all POST API calls to complete
        // await Promise.all(apiCalls);




        // 1. update Room Status
        try {
            const response_1 = await axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, RoomStatus_PostData);
            console.log("1. Update Room Status Successfully:", response_1.data);
        } catch (error) {
            console.log('Error update Room Status :', error)
        }


        // 2. insert invoice items
        try {
            const response_2 = await axios.post(BaseURL + "/invoice/insert", invoiceItems_PostData);
            console.log("2. insert invoice items Successfully:", response_2.data);
        } catch (error) {
            console.log('Error insert invoice items :', error)
        }


        // 3. insert invoice Details
        try {
            const response_3 = await axios.post(BaseURL + "/invoice_details/insert", invoiceDetails_PostData);
            console.log("3. Insert Invoice Details Successfully:", response_3.data);
        } catch (error) {
            console.log('Error insert invoice Details :', error)
        }


        // 4. update checkout date and no. of day's
        try {
            const response_4 = await axios.put(BaseURL + "/booking/update/" + inputData.Booking_Number, BookingCheckout_PostData);
            console.log("4. Update Checkout Date & Day's Successfully:", response_4.data);
        } catch (error) {
            console.log('Error update checkout date and no. of days :', error)
        }


        // 5. update customer details
        try {
            const response_5 = await axios.put(BaseURL + "/customer/update/" + inputData.Customer_ID, CustomerDetails_PostData);
            console.log("5. Update Customer Details Successfully:", response_5.data);
        } catch (error) {
            console.log('Error update customer details :', error)
        }






        // ----------- old code start ---------------------------
        // update Room Status
        // await axios.put(BaseURL + "/rooms/update/" + inputData.Room_Number, {
        //     Customer_ID: "",
        //     Customer_Name: "",
        //     Phone: "",
        //     Booking_Number: "",
        //     Invoice_Number: "",
        //     isCheckedIn: 0
        // }).then((response) => {
        //     console.log("resp", response.data);
        // });

        // insert invoice items
        // await axios.post(BaseURL + "/invoice/insert", {
        //     Booking_Number: inputData.Booking_Number,
        //     Invoice_Number: inputData.Invoice_Number,
        //     Invoice_Date: inputData.Invoice_Date,
        //     Item_Code: "",
        //     Item_Name: inputData.Item_Name,
        //     Qty: inputData.Qty,
        //     Rate: inputData.Rate,

        //     Discount_Percent: "",
        //     // Discount_Percent: inputData.Discount_Percent,
        //     Discount_Amount: inputData.Discount,
        //     Tax_Percent: inputData.Tax_Percent,
        //     Tax_Amount: inputData.Tax_Amount,
        //     Amount: inputData.Amount
        // });

        // insert invoice Details
        // await axios.post(BaseURL + "/invoice_details/insert", {
        //     GSTIN: inputData.GSTIN,
        //     Invoice_Number: inputData.Invoice_Number,
        //     // Invoice_Date: inputData.Invoice_Date,
        //     Invoice_Date: get_ServerDateTime(inputData.Invoice_Date),
        //     Catagory: "",
        //     Gross_Total: inputData.Final_GrossTotal,
        //     // Taxable_Amount: inputData.Final_TaxAmount,
        //     Taxable_Amount: inputData.Final_TaxableAmount,
        //     // Discount_Percent: inputData.Discount_Percent,
        //     Discount_Amount: inputData.Final_Discount,
        //     Tax: inputData.Tax_Percent,
        //     SGST: inputData.SGST,
        //     CGST: inputData.CGST,
        //     IGST: inputData.IGST,
        //     Grand_Total: inputData.Grand_Total,
        //     Amount_Paid: inputData.Amount_Paid,
        //     Amount_Balance: inputData.Amount_Balance,
        //     Pay_Status: inputData.Pay_Status,
        //     Payment_Remarks: inputData.Payment_Remarks,
        //     Customer_ID: inputData.Customer_ID,
        //     Customer_Name: inputData.Customer_Name,
        //     Booking_Number: inputData.Booking_Number
        // });

        // update checkout date and no. of day's
        // await axios.put(BaseURL + "/booking/update/" + inputData.Booking_Number, {
        //     'Invoice_Number': inputData.Invoice_Number,
        //     'Check_In': inputData.Check_In,
        //     'Check_Out': inputData.Check_Out,
        //     'Days': inputData.TotalDays,
        //     'Advance_Amount': inputData.Advance_Amount,
        //     'Discount_Percent': inputData.Discount_Percent
        // })


        // update customer details
        // await axios.put(BaseURL + "/customer/update/" + inputData.Customer_ID, {
        //     'Customer_Name': inputData.Customer_Name,
        //     'Address': inputData.Address,
        //     'State': inputData.State,
        //     'Country': inputData.Country,
        //     'Phone': inputData.Phone,
        //     'GSTIN': inputData.GSTIN,
        //     'Proof_Details': inputData.Proof_Details,
        //     'ID_Proof': inputData.ID_Proof,
        //     'Email': inputData.Email,
        // });

    } catch (error) {
        console.error('Error fetching data:', error);
    }


    // ----------- old code End ---------------------------





    // update invoice UID ...
    // let newInvoice_uid = parseInt(inputData.Invoice_Number) + 1

    // await axios.put(BaseURL + "/uid/updateInvoiceNo", {

    //     Invoice_Number: newInvoice_uid,

    // });



} // .... End of Save_CheckOut function .....


// get Advance Amount for invoice_Number
export const get_BookingTotalAdvance = async (Booking_Number) => {
    console.log(Booking_Number)
    let { data } = await axios.post(BaseURL + "/booking/getAdvanceAmount", { Booking_Number: Booking_Number });
    return data[0].Advance_Amount;
}


// insert Advance Amount Details
export const insert_AdvanceAmount = async (Booking_Number, Date_Advance, Advance_Received) => {
    console.log('Advance Date', stringDateTimeToAMPM(Date_Advance))

    if (Advance_Received <= 0 || Advance_Received === "") {
        console.log("Advance Amount is Zero Or Invalid");
        return
    }

    await axios.post(BaseURL + "/advance/insert",
        {
            Booking_Number: Booking_Number,
            Date_Advance: stringDateTimeToAMPM(Date_Advance),
            Advance_Received: Advance_Received

        }
    ).then(() => {
        update_TotalAdvance(Booking_Number);
    });


}

const update_TotalAdvance = async (Booking_Number) => {

    // console.log("update_TotalAdvance !!!")

    // get sum of total advance of a invoiceNumber
    await axios.post(BaseURL + "/advance/getTotalAdvance",
        { Booking_Number: Booking_Number, }
    ).then(async (data) => {

        let totalAdvance = parseFloat(data.data[0].TotalAdvance);
        // console.log("totalAdvance", totalAdvance)

        // update tbl_booking Advance Amount
        await axios.put(BaseURL + "/booking/updateAdvance/" + Booking_Number,
            {
                // Invoice_Number: Invoice_Number,
                Advance_Amount: totalAdvance
            }
        );
    });





}


// function Get Bioking Details ...
export const Get_BookingDetails = async (Room_Number, Booking_Number) => {
    try {
        const response = await axios.post(`${BaseURL}/booking/find`, {
            Room_Number: Room_Number,
            Booking_Number: Booking_Number,
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw error; // Re-throwing the error if necessary
    }

    // let result =
    //     await axios.post(BaseURL + "/booking/find", {
    //         Booking_Number: Booking_Number,
    //         Room_Number: Room_Number,

    //     })
    //         .then((response) => {

    //             return response.data
    //         });



    // return result
}

// function Get Customer Details ...
export const Get_CustomerDetails = async (Customer_ID, Customer_Name) => {
    try {
        const response = await axios.post(`${BaseURL}/customer/find`, {
            Customer_ID: Customer_ID,
            Customer_Name: Customer_Name,
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching customer details:", error);
        throw error; // Re-throw the error if needed
    }

    // let result =
    //     await axios.post(BaseURL + "/customer/find", {

    //         Customer_ID: Customer_ID,
    //         Customer_Name: Customer_Name,
    //     })
    //         .then((response) => {

    //             return response.data
    //         });



    // return result
}

export const Save_FileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.post(BaseURL + "/singleFile/", formData);

    } catch (error) {
        throw error;
    }

}


export const CheckDuplicate_InvoiceNumber = async (Invoice_Number) => {
    // console.log(Invoice_Number)
    const { data } = await axios.post(BaseURL + "/invoice_details/count", {
        Invoice_Number: Invoice_Number
        // Invoice_Date: Invoice_Date,

    })
    // .then((response) => {
    //     // console.log(response.data[0].Invoice_Count);
    //     return response.data[0].Invoice_Count
    // });

    // console.log(data[0].Invoice_Count);

    return data[0].Invoice_Count;
}








export const Get_FileUpload = async () => {
    // try {
    //     const img = await axios.post(BaseURL + "/getSingleFiles", { fileName: "2018041991" });
    //     console.log(img);

    // } catch (error) {
    //     throw error;
    // }

    const imageName = '2018041991.jpg'
    const url = `http://localhost:8080/uploads/${imageName}`
    try {
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'image/jpeg'
            }
        })
        const blob = await response.blob()
        console.log(blob)
        return [URL.createObjectURL(blob), null];
    }
    catch (error) {
        console.error(`get: error occurred ${error}`);
        return [null, error]
    }


}


