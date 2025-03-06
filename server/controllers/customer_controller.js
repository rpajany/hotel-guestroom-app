// Import database
const knex = require('./../db');


// get all Customer
exports.load_Customer = async (req, res) => {
    await knex.select('*').from('tbl_Customer').orderBy('ID', 'desc').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_Customer data: ${err}` })
    });
};

// insert Customer data
exports.insert_Customer = async (req, res) => {
    // console.log(req.body.Customer_Name)
    await knex('tbl_Customer')
        .insert({
            'Customer_ID': req.body.Customer_ID,
            'Customer_Name': req.body.Customer_Name,
            'Address': req.body.Address,
            'State': req.body.State,
            'Country': req.body.Country,
            'Phone': req.body.Phone,
            'GSTIN': req.body.GSTIN,
            'Proof_Details': req.body.Proof_Details,
            'ID_Proof': req.body.ID_Proof,
            'Email': req.body.Email,
            'photo': req.body.photo
        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Customer data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Customer data: ${err}` })
        });
};

// filter Customer data
exports.find_Customer = async (req, res) => {
    // console.log(req.body.username)
    await knex.select('*')
        .from('tbl_Customer')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Customer_ID', '=', req.body.Customer_ID)
        .andWhere('Customer_Name', '=', req.body.Customer_Name)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Customer data: ${err}` })
        });
};

// update Customer 
exports.update_Customer = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.username)
    await knex('tbl_Customer')

        .where('Customer_ID', req.params.Customer_ID)
        .update({
            'Customer_Name': req.body.Customer_Name,
            'Address': req.body.Address,
            'State': req.body.State,
            'Country': req.body.Country,
            'Phone': req.body.Phone,
            'GSTIN': req.body.GSTIN,
            'Proof_Details': req.body.Proof_Details,
            'ID_Proof': req.body.ID_Proof,
            'Email': req.body.Email,
            // 'photo': req.body.photo
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Customer with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Customer data: ${err}` })
        });
};

// delete Customer
exports.delete_Customer = async (req, res) => {
    // console.log(req.params.Customer_ID)
    await knex('tbl_Customer')

        .where('Customer_ID', '=', req.params.Customer_ID)
        .del()

        .then(data => {
            res.send("tbl_Customer data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Customer data: ${err}` })
        });
};

// Remove all Customer on the list
exports.reset_Customer = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Customer') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Customer db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Customer table: ${err}.` })
        })
}