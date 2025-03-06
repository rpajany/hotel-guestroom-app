import axios from 'axios';
import { BaseURL, formatDate, formatDateTime, CalculateDays, ConvertToServerDate } from '../utils/custom';

export const Save_CheckOut = async (inputData) => {

    console.log(inputData);

    try {
        // insert invoice
        await axios.post(BaseURL + "/invoice/insert", {
            Invoice_Number: inputData.Invoice_Number,
            Invoice_Date: inputData.Invoice_Date,
            // "Item_Code"	INTEGER,
            Item_Name: inputData.Item_Name,
            Qty: inputData.Qty,
            Rate: inputData.Rate,

            Discount_Amount: inputData.Discount,
            Tax_Percent: inputData.Tax_Percent,
            Tax_Amount: inputData.Tax_Amount,
            Amount: inputData.Grand_Total
        }).then((result) => {
            console.log(result);
        });


        // save invoice_details
        await axios.post(BaseURL + "/invoice_details/insert", {
            Invoice_Number: inputData.Invoice_Number,
            Invoice_Date: inputData.Invoice_Date,
            Catagory: "",
            Gross_Total: inputData.Gross_Total,
            // Taxable_Amount: inputData.Tax_Amount,
            // Discount_Percent: inputData.Discount_Percent,
            Discount_Amount: inputData.Discount,
            Tax: inputData.Tax_Percent,
            SGST: inputData.SGST,
            CGST: inputData.CGST,
            IGST: inputData.IGST,
            Grand_Total: inputData.Grand_Total,
            Amount_Paid: inputData.Amount_Paid,
            Amount_Balance: inputData.Amount_Balance,
            Pay_Status: inputData.Pay_Status,
            Customer_ID: inputData.Customer_ID,
            Customer_Name: inputData.Customer_Name,
        }).then((result) => {
            console.log(result);
        });





    } catch (error) {

        console.log(error)
    }





}

export const Update_CheckOut = async (inputData) => {

    console.log(inputData);
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            Invoice_Date: inputData.Invoice_Date,
            Invoice_Number: inputData.Invoice_Number,
        }
    }

    try {

        // insert invoice
        await axios.post(BaseURL + "/invoice/update", {
            // Invoice_Number: inputData.Invoice_Number,
            // Invoice_Date: inputData.Invoice_Date,
            Item_Code: "",
            Item_Name: inputData.Item_Name,
            Qty: inputData.Qty,
            Rate: inputData.Rate,

            Discount_Percent: "",
            Discount_Amount: inputData.Discount,
            Tax_Percent: inputData.Tax_Percent,
            Tax_Amount: inputData.Tax_Amount,
            Amount: inputData.Amount

        }, { config }).then((result) => {
            console.log(result);
        });


        // save invoice_details
        await axios.post(BaseURL + "/invoice_details/update", {
            // Invoice_Number: inputData.Invoice_Number,
            // Invoice_Date: inputData.Invoice_Date,
            Catagory: "",
            Gross_Total: inputData.Final_GrossTotal,
            Taxable_Amount: inputData.Final_TaxAmount,
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
            Customer_ID: inputData.Customer_ID,
            Customer_Name: inputData.Customer_Name,

        }, { config }).then((result) => {
            console.log(result);
        });





    } catch (error) {

        console.log(error)
    }





}