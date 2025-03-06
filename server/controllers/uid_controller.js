// Import database
const knex = require('./../db');

// get_InvoiceNo, get_CustomerID, update_InvoiceNumber, update_CustomerID

// get BookingNo
exports.get_BookingNo = async (req, res) => {
    await knex.select('Booking_Number').from('tbl_UID').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_UID data: ${err}` })
    })
}

// update BookingNo
exports.update_BookingNo = async (req, res) => {
    await knex('tbl_UID')

        .update({
            'Booking_Number': req.body.Booking_Number,

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_UID with Booking_Number : ${req.body.Booking_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_UID data: ${err}` })
        });
}






// get_InvoiceNo
exports.get_InvoiceNo = async (req, res) => {
    await knex.select('Invoice_Number').from('tbl_UID').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_UID data: ${err}` })
    });
};

// update_InvoiceNumber
exports.update_InvoiceNo = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.Invoice_Number)
    await knex('tbl_UID')

        .update({
            'Invoice_Number': req.body.Invoice_Number,

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_UID with id: ${req.body.Invoice_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_UID data: ${err}` })
        });
};

// get_CustomerID
exports.get_CustomerID = async (req, res) => {
    await knex.select('Customer_ID').from('tbl_UID').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_UID Customer_ID data: ${err}` })
    });
};

// update_CustomerID
exports.update_CustomerID = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.Customer_ID)
    await knex('tbl_UID')

        .update({
            'Customer_ID': req.body.Customer_ID,

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_UID with Customer id: ${req.body.Customer_ID} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_UID Customer_ID: ${err}` })
        });
};

// get_TaxPercentage
exports.get_TaxPercentage = async (req, res) => {
    await knex.select('Tax').from('tbl_UID').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_UID Tax data: ${err}` })
    });
};