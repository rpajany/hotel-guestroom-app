// Import database
const knex = require('./../db');


// get all users
exports.load_User = async (req, res) => {
    await knex.select('*').from('tbl_User').then(data => {
        res.json(data);
    }).catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving user data: ${err}` })
    });
};

// insert data
exports.insert_User = async (req, res) => {
    // console.log(req.body.username)
    await knex('tbl_User')
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
            res.json({ message: `tbl_User data id: '${data}'  Inserted Successfully..` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_User data: ${err}` })
        });
};

// filter data
exports.find_User = async (req, res) => {
    // console.log(req.body.username)
    await knex.select('*')
        .from('tbl_User')
        // .where((builder) => builder.orWhere('date', '>=', req.params.filter))
        .where('username', '=', req.body.username)
        .andWhere('password', '=', req.body.password)

        .then(data => {
            res.json(data);
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving tbl_User data: ${err}` })
        });
};

// update user
exports.update_User = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.username)
    await knex('tbl_User')

        // .where('id', req.params.id)
        .where('username', req.params.username)
        .update({
            // 'username': req.body.username,
            'password': req.body.password,
            // 'isAdmin': req.body.isAdmin
        })

        .then(() => {
            // Send a success message in response
            res.json({ message: `tbl_User with username: ${req.params.username} updated !!!.` })
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error updating tbl_User data: ${err}` })
        });
};

// delete user
exports.delete_User = async (req, res) => {
    // console.log(req.params.id)
    await knex('tbl_User')

        .where('id', '=', req.params.id)
        .del()

        .then(data => {
            res.send("tbl_User data deleted !!");
        }).catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error deleting tbl_User data: ${err}` })
        });
};

// Remove all books on the list
exports.reset_User = async (req, res) => {
    // Remove all books from database
    await knex
        .select('*') // select all records
        .from('tbl_User') // from 'books' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'tbl_User db all data deleted.!!' })
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error resetting tbl_User table: ${err}.` })
        })
}