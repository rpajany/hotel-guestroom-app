// Import database
const knex = require('./../db');


// get all Invoice
exports.load_Invoice = async (req, res) => {
    await knex.select('*').from('tbl_Invoice').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_Invoice data: ${err}` })
    });
};

// insert Invoice data
exports.insert_Invoice = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex('tbl_Invoice')
        .insert({
            'Booking_Number': req.body.Booking_Number,
            'Invoice_Number': req.body.Invoice_Number,
            'Invoice_Date': req.body.Invoice_Date,
            // 'Item_Code': req.body.Item_Code,
            'Item_Name': req.body.Item_Name,
            'Qty': req.body.Qty,
            'Rate': req.body.Rate,
            // 'Discount_Percent': req.body.Discount_Percent,
            'Discount_Amount': req.body.Discount_Amount,
            'Tax_Percent': req.body.Tax_Percent,
            'Tax_Amount': req.body.Tax_Amount,
            'Amount': req.body.Amount,

        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Invoice data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Invoice data: ${err}` })
        }).finally(() => {

        });
};

// filter tbl_Booking data
exports.find_Invoice = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex.select('*')
        .from('tbl_Invoice')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Invoice_Number', '=', req.body.Invoice_Number)
        // .andWhere('Invoice_Date', '=', req.body.Invoice_Date)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Booking data: ${err}` })
        });
};

// update Booking 
exports.update_Invoice = async (req, res) => {
    // console.log(req.params.Invoice_Date)
    // console.log(req.params.Invoice_Number)
    await knex('tbl_Invoice')

        .where({ 'Invoice_Date': req.params.Invoice_Date, 'Invoice_Number': req.params.Invoice_Number })
        .update({
            // 'username': req.body.username,
            // 'password': req.body.password,
            // 'isAdmin': req.body.isAdmin
            'Item_Code': "",
            'Item_Name': req.body.Item_Name,
            'Qty': req.body.Qty,
            'Rate': req.body.Rate,

            'Discount_Percent': "",
            'Discount_Amount': req.body.Discount,
            'Tax_Percent': req.body.Tax_Percent,
            'Tax_Amount': req.body.Tax_Amount,
            'Amount': req.body.Amount
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Invoice with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Invoice data: ${err}` })
        });
};

// delete Booking
exports.delete_Invoice = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    await knex('tbl_Invoice')

        .where('Invoice_Number', '=', req.params.Invoice_Number)
        .del()

        .then(data => {
            res.send("tbl_Invoice data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Invoice data: ${err}` })
        });
};

// Remove all Booking on the list
exports.reset_Invoice = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Invoice') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Invoice db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Invoice table: ${err}.` })
        })
}