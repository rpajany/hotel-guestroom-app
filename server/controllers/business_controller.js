// Import database
const knex = require('./../db');


// get Busines
exports.load_Business = async (req, res) => {
    await knex.select('*').from('tbl_Business').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_Business data: ${err}` })
    });
};

// insert Customer data
exports.insert_Business = async (req, res) => {
    // console.log(req.body.Name)
    await knex('tbl_Business')
        .insert({
            'Name': req.body.Name,
            'Address': req.body.Address,
            'City': req.body.City,
            'State': req.body.State,
            'Zip': req.body.Zip,
            'Mobile': req.body.Mobile,
            'Landline': req.body.Landline,
            'Email': req.body.Email,
            'GSTIN': req.body.GSTIN,
            'Logo': req.body.Logo
        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Business data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Business data: ${err}` })
        });
};

// filter Customer data
exports.find_Business = async (req, res) => {
    // console.log(req.body.username)
    await knex.select('*')
        .from('tbl_Business')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('Name', '=', req.body.Name)
        // .andWhere('Customer_Name', '=', req.body.Customer_Name)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Business data: ${err}` })
        });
};

// update Customer 
exports.update_Business = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.username)
    await knex('tbl_Business')

        .where('id', req.params.id)
        .update({
            'Name': req.body.Name,
            'Address': req.body.Address,
            'City': req.body.City,
            'State': req.body.State,
            'Zip': req.body.Zip,
            'Mobile': req.body.Mobile,
            'Landline': req.body.Landline,
            'Email': req.body.Email,
            'GSTIN': req.body.GSTIN,
            'Logo': req.body.Logo
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Business with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Business data: ${err}` })
        });
};

// delete Customer
exports.delete_Business = async (req, res) => {
    // console.log(req.params.id)
    await knex('tbl_Business')

        .where('id', '=', req.params.id)
        .del()

        .then(data => {
            res.send("tbl_Business data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Business data: ${err}` })
        });
};

// Remove all Customer on the list
exports.reset_Business = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Business') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Business db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Business table: ${err}.` })
        })
}