// Import database
const knex = require('./../db');


// get all load_Booking
exports.load_Booking = async (req, res) => {

    await knex.select('*')
        .from('tbl_Booking').orderBy('ID', 'desc').then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Booking data: ${err}` })
        });
};


// post BookingByDate
exports.load_BookingByDate = async (req, res) => {
    // console.log(req.body)
    const { Check_In_Start, Check_In_End } = req.body;


    // Validate inputs
    if (!Check_In_Start || !Check_In_End) {
        return res.status(400).json({ message: 'Check_In_Start and Check_In_End are required.' });
    }

    try {
        const data = await knex.select('*')
            .from('tbl_Booking')
            // .where('Check_In', '>=', req.body.Check_In)
            // .andWhere('Check_In', '<=', req.body.Check_Out)
            // .whereBetween('Check_In', [req.body.Check_In, req.body.Check_Out])
            .whereRaw(
                `STRFTIME('%Y-%m-%d %H:%M:%S', 
                    SUBSTR(Check_In, 7, 4) || '-' || 
                    SUBSTR(Check_In, 4, 2) || '-' || 
                    SUBSTR(Check_In, 1, 2) || ' ' || 
                    SUBSTR(Check_In, 12)) 
                 BETWEEN ? AND ?`,
                [Check_In_Start, Check_In_End] // Pass sanitized inputs as parameters
            )

            .orderBy('ID', 'desc')

        // console.log('data', data)

        res.status(200).json(data);
    } catch (err) {
        // Send a error message in response
        res.status(500).json({ message: `There was an error retrieving tbl_Booking data: ${err}` });
    };
};


// insert Customer data
exports.insert_Booking = async (req, res) => {
    // console.log(req.body.Customer_Name)
    await knex('tbl_Booking')
        .insert({
            'Booking_Number': req.body.Booking_Number,
            // 'Invoice_Number': req.body.Invoice_Number,
            'Room_Number': req.body.Room_Number,
            'Customer_ID': req.body.Customer_ID,
            'Customer_Name': req.body.Customer_Name,
            'Check_In': req.body.Check_In,
            'Check_Out': req.body.Check_Out,
            'Days': req.body.Days,
            'Rate': req.body.Rate,

            'Advance_Amount': req.body.Advance_Amount

        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Booking data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Booking data: ${err}` })
        });
};

// filter tbl_Booking data
exports.find_Booking = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex.select('*')
        .from('tbl_Booking')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Booking_Number', '=', req.body.Booking_Number)
        .andWhere('Room_Number', '=', req.body.Room_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Booking data: ${err}` })
        });
};


// get Advance Amount data
exports.get_AdvanceAmount = async (req, res) => {
    // console.log(req.body.Invoice_Number)
    await knex.select('Advance_Amount')
        .from('tbl_Booking')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Booking_Number', '=', req.body.Booking_Number)
        // .andWhere('Room_Number', '=', req.body.Room_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Booking data: ${err}` })
        });
};

// update Booking 
exports.update_Booking = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    // console.log(req.body)
    await knex('tbl_Booking')

        .where('Booking_Number', req.params.Booking_Number)
        .update({
            'Invoice_Number': req.body.Invoice_Number,
            'Check_In': req.body.Check_In,
            'Check_Out': req.body.Check_Out,
            'Days': req.body.Days,
            'Advance_Amount': req.body.Advance_Amount,
            'Discount_Percent': req.body.Discount_Percent
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Booking with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Booking data: ${err}` })
        });
};


// update Advance Amount 
exports.update_AdvanceAmount = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    // console.log(req.body)
    await knex('tbl_Booking')

        .where('Booking_Number', req.params.Booking_Number)
        .update({

            'Advance_Amount': req.body.Advance_Amount
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Booking with id: ${req.params.Booking_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Booking data: ${err}` })
        });
};

// delete Booking
exports.delete_Booking = async (req, res) => {
    // console.log(req.params.Invoice_Number)
    await knex('tbl_Booking')

        .where('Booking_Number', '=', req.params.Booking_Number)
        .del()

        .then(data => {
            res.send("tbl_Booking data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Booking data: ${err}` })
        });
};

// Remove all Booking on the list
exports.reset_Booking = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Booking') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Booking db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Booking table: ${err}.` })
        })
}