// Import database
const knex = require('./../db');


// get all Customer
exports.load_Advance = async (req, res) => {
    await knex.select('*')
        .from('tbl_Advance').orderBy('ID', 'desc').then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Advance data: ${err}` })
        });
};

// insert Customer data
exports.insert_Advance = async (req, res) => {
    // console.log(req.body.Customer_Name)
    await knex('tbl_Advance')
        .insert({
            'Booking_Number': req.body.Booking_Number,
            'Date_Advance': req.body.Date_Advance,
            'Advance_Received': req.body.Advance_Received,


        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Advance data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Advance data: ${err}` })
        });
};

// filter tbl_Booking data
exports.find_Advance = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex.select('*')
        .from('tbl_Advance')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Booking_Number', '=', req.body.Booking_Number)
        // .andWhere('Room_Number', '=', req.body.Room_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Advance data: ${err}` })
        });
};


// get Advance Amount data
exports.get_TotalAdvance = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    // knex.select('Advance_Received')
    await knex.from('tbl_Advance')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .sum('Advance_Received as TotalAdvance')
        .where('Booking_Number', '=', req.body.Booking_Number)
        // .andWhere('Room_Number', '=', req.body.Room_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Advance data: ${err}` })
        });
};

// update Advance 
exports.update_Advance = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    // console.log(req.body)
    await knex('tbl_Advance')

        .where('Booking_Number', req.params.Booking_Number)
        .update({
            'Check_In': req.body.Check_In,
            'Check_Out': req.body.Check_Out,
            'Days': req.body.Days
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Advance with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Advance data: ${err}` })
        });
};

// delete Advance
exports.delete_Advance = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    await knex('tbl_Advance')

        .where('Booking_Number', '=', req.params.Booking_Number)
        .del()

        .then(data => {
            res.send("tbl_Advance data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Advance data: ${err}` })
        });
};

// Remove all Advance on the list
exports.reset_Advance = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Advance') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Advance db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Advance table: ${err}.` })
        })
}