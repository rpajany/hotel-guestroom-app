// Import database
const knex = require('./../db');


// get all users
exports.load_Room = async (req, res) => {
    await knex.select('*').from('tbl_Rooms').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_Rooms data: ${err}` })
    });
};

// insert data
exports.insert_Room = async (req, res) => {
    // console.log(req.body.username)
    await knex('tbl_Rooms')
        .insert({
            'Room_Number': req.body.Room_Number,
            'Room_Type': req.body.Room_Type,
            'Rate': req.body.Rate,
            'isCheckedIn': 0
        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Rooms data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_User data: ${err}` })
        });
};

// filter data
exports.find_Room = async (req, res) => {
    // console.log(req.body.Room_Number)
    await knex.select('*')
        .from('tbl_Rooms')

        .where('Room_Number', '=', req.body.Room_Number)
        .andWhere('Booking_Number', '=', req.body.Booking_Number)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Rooms data: ${err}` })
        });
};

// update room
exports.update_Room = async (req, res) => {
    // console.log(req.params.Room_Number)
    // console.log(req.body.Customer_Name)
    // console.log(req.body.isCheckedIn)
    await knex('tbl_Rooms')

        .where('Room_Number', req.params.Room_Number)

        .update({
            'Customer_ID': req.body.Customer_ID,
            'Customer_Name': req.body.Customer_Name,
            'Phone': req.body.Phone,
            'Booking_Number': req.body.Booking_Number,
            // 'Invoice_Number': req.body.Invoice_Number,

            'isCheckedIn': req.body.isCheckedIn,

            // 'Room_Number': req.params.Room_Number,
            'Rate': req.body.Rate,

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Rooms with id: ${req.params.Room_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Rooms data: ${err}` })
        });
};



// clear room
exports.clear_Room = async (req, res) => {
    // console.log(req.params.Room_Number)
    // console.log(req.body.Customer_Name)
    // console.log(req.body.isCheckedIn)
    await knex('tbl_Rooms')

        .where('Room_Number', req.body.Room_Number)
        .andWhere('Invoice_Number', '=', req.body.Invoice_Number)
        .update({
            'Customer_ID': "",
            'Customer_Name': "",
            'Phone': "",
            'Booking_Number': "",
            'Invoice_Number': "",

            'isCheckedIn': 0

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Rooms with id: ${req.body.Room_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error clearing tbl_Rooms data: ${err}` })
        });
};







// update room
exports.update_Add_Room = async (req, res) => {
    // console.log(req.params.Room_Number)
    // console.log(req.body.Customer_Name)
    // console.log(req.body.isCheckedIn)
    await knex('tbl_Rooms')

        .where('Room_Number', req.params.Room_Number)
        .update({

            'Room_Type': req.body.Room_Type,

            'Rate': req.body.Rate,

        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Rooms with id: ${req.params.Room_Number} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Rooms data: ${err}` })
        });
};







// delete room
exports.delete_Room = async (req, res) => {
    // console.log(req.params.id)
    await knex('tbl_Rooms')

        .where('ID', '=', req.params.ID)
        .del()

        .then(data => {
            res.send("tbl_Rooms data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Rooms data: ${err}` })
        });
};

// Remove all books on the list
exports.reset_Room = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Rooms') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            // res.json({ message: 'tbl_Rooms db all data deleted.!!' })
            res.send({ message: 'tbl_Rooms db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_User table: ${err}.` })
        })
}