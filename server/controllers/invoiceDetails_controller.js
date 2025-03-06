// Import database
const knex = require('./../db');


// get all invoiceDetails
exports.load_InvoiceDetails = async (req, res) => {
    // knex.select('*').from('tbl_invoiceDetails').orderBy('ID', 'asc').then(data => {
    await knex.select('*').from('tbl_invoiceDetails').orderBy('Invoice_Date', 'asc').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_invoiceDetails data: ${err}` })
    });
};

// insert Invoice data
exports.insert_InvoiceDetails = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex('tbl_invoiceDetails')
        .insert({
            'GSTIN': req.body.GSTIN,
            'Booking_Number': req.body.Booking_Number,
            'Invoice_Number': req.body.Invoice_Number,
            'Invoice_Date': req.body.Invoice_Date,
            // 'Catagory': req.body.Catagory,
            'Gross_Total': req.body.Gross_Total,
            'Taxable_Amount': req.body.Taxable_Amount,
            // 'Discount_Percent': req.body.Discount_Percent,
            'Discount_Amount': req.body.Discount_Amount,
            'Tax': req.body.Tax,
            'SGST': req.body.SGST,
            'CGST': req.body.CGST,
            'IGST': req.body.IGST,
            'Grand_Total': req.body.Grand_Total,
            'Amount_Paid': req.body.Amount_Paid,
            'Amount_Balance': req.body.Amount_Balance,
            'Pay_Status': req.body.Pay_Status,
            'Payment_Remarks': req.body.Payment_Remarks,
            'Customer_ID': req.body.Customer_ID,
            'Customer_Name': req.body.Customer_Name,

        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_invoiceDetails data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_invoiceDetails data: ${err}` })
        }).finally(() => {
            // knex.destroy();
        });
};

// filter tbl_Booking data
exports.find_InvoiceDetails = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex.select('*')
        .from('tbl_invoiceDetails')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Invoice_Number', '=', req.body.Invoice_Number)
        .andWhere('Invoice_Date', '=', req.body.Invoice_Date)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_invoiceDetails data: ${err}` })
        });
};


// count by invoice number
exports.count_InvoiceDetails = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex
        .from('tbl_invoiceDetails')
        .count('Invoice_Number as Invoice_Count')
        .where('Invoice_Number', '=', req.body.Invoice_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_invoiceDetails data: ${err}` })
        });

}

// filter tbl_Booking data
exports.filterByDate_InvoiceDetails = async (req, res) => {
    // console.log(req.body.From_Date)
    // console.log(req.body.To_Date)
    await knex.select('*')
        .from('tbl_invoiceDetails')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Invoice_Date', '>=', req.body.From_Date)
        .andWhere('Invoice_Date', '<=', req.body.To_Date)
        .orderBy('Invoice_Date', 'asc')
        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_invoiceDetails data: ${err}` })
        });
};




// update Booking 
exports.update_InvoiceDetails = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.username)
    await knex('tbl_invoiceDetails')

        .where('id', req.params.id)
        .update({
            'username': req.body.username,
            'password': req.body.password,
            'isAdmin': req.body.isAdmin
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_invoiceDetails with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_invoiceDetails data: ${err}` })
        });
};

// delete Booking
exports.delete_InvoiceDetails = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    await knex('tbl_invoiceDetails')

        // .where('Booking_Number', '=', req.params.Booking_Number)
        .where('Invoice_Number', '=', req.params.Invoice_Number)
        .del()

        .then(data => {
            res.send("tbl_invoiceDetails data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_invoiceDetails data: ${err}` })
        });
};

// Remove all Booking on the list
exports.reset_InvoiceDetails = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_invoiceDetails') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_invoiceDetails db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_invoiceDetails table: ${err}.` })
        })
}