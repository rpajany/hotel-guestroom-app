// Import database
const knex = require('./../db');


// get all users
exports.load_Gst = async (req, res) => {
    await knex.select('*').from('tbl_Gst').orderBy('ID', 'desc').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving tbl_Gst data: ${err}` })
    });
};

// insert data
exports.insert_Gst = async (req, res) => {
    // console.log(req.body.username)
    await knex('tbl_Gst')
        .insert({
            'username': req.body.username,
            'password': req.body.password,
            'isAdmin': req.body.isAdmin
        },
            ['id']
        )
        .then((data) => {
            // res.json({ id: data });
            // Send a success message in response
            res.json({ message: `tbl_Gst data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Gst data: ${err}` })
        });
};

// filter data
exports.find_Gst = async (req, res) => {
    // console.log(req.body.username)
    await knex.select('*')
        .from('tbl_Gst')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('username', '=', req.body.username)
        .andWhere('password', '=', req.body.password)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_Gst data: ${err}` })
        });
};

// update user
exports.update_Gst = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.username)
    await knex('tbl_Gst')

        .where('id', req.params.id)
        .update({
            'username': req.body.username,
            'password': req.body.password,
            'isAdmin': req.body.isAdmin
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_Gst with id: ${req.params.id} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_Gst data: ${err}` })
        });
};

// delete user
exports.delete_Gst = async (req, res) => {
    // console.log(req.params.id)
    await knex('tbl_Gst')

        .where('id', '=', req.params.id)
        .del()

        .then(data => {
            res.send("tbl_Gst data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_Gst data: ${err}` })
        });
};

// Remove all books on the list
exports.reset_Gst = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_Gst') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_Gst db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_Gst table: ${err}.` })
        })
}