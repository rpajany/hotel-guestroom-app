// Import path module
const path = require('path');


// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'Data/GRMS_Data.sqlite');

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
});

// Create a table in the database called "tbl_room"
knex.schema
    // Make sure no "tbl_room" table exists
    // before trying to create new
    .hasTable('tbl_Rooms')
    .then((exists) => {
        if (!exists) {
            // If no "tbl_room" table exists
            // create new, with "id", 
            // and use "id" as a primary identification
            // and increment "id" with every new record (tbl_room)
            return knex.schema.createTable('tbl_Rooms', (table) => {
                table.increments('id').primary()
                table.integer('Room_Number')
                table.string('Customer_name')
                table.string('Phone')
                table.double('Daily_Rent')
                table.integer('isCheckedIn')

                // table.timestamps('timestamp');
            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_rooms\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        // Log success message
        console.log('db connected.. !!')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    });


// create Table 'tbl_Customer_Details
knex.schema
    .hasTable('tbl_Customer')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_Customer', (table) => {
                table.increments('id').primary()
                table.string('Customer_ID')
                table.string('Customer_Name')
                table.string('Address')
                table.string('State')
                table.string('Phone')
                table.string('GST_Number')
                table.string('photo')
                table.string('ID_Proof')
            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_Customer_Details\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })


// create Table 'tbl_User'
knex.schema
    .hasTable('tbl_User')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_User', (table) => {
                table.increments('id').primary()
                table.string('username')
                table.string('password')
                table.string('isAdmin')

            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_User\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_User: ${error}`)
                })
        }
    })


// create Table 'tbl_Gst'
knex.schema
    .hasTable('tbl_Gst')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_Gst', (table) => {
                table.increments('id').primary()
                // table.integer('Room_Number')
                // table.string('Guest_Name')
                // table.string('Mobile')
                // table.text('Photo')
                // table.double('Daily_Rent')

                // table.integer('isCheckedIn')

            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_Gst\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_Gst: ${error}`)
                })
        }
    })

// create Table 'tbl_Booking'
knex.schema
    .hasTable('tbl_Booking')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_Booking', (table) => {
                table.increments('id').primary()
                table.integer('Room_Number')
                table.integer('Customer_ID')
                table.string('Customer_Name')
                table.string('Invoice_Number')
                table.string('Check_In')
                table.string('Check_Out')
                table.double('Days')
                table.double('Rate')


            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_Booking\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_Booking: ${error}`)
                })
        }
    })

// create Table 'tbl_Gst'
knex.schema
    .hasTable('tbl_UID')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_UID', (table) => {
                table.increments('id').primary()
                table.integer('Invoice_Number')
                table.integer('Customer_ID')


            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_UID\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_UID: ${error}`)
                })
        }
    })

// create Table 'tbl_invoice'
knex.schema
    .hasTable('tbl_invoice')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('tbl_invoice', (table) => {
                table.increments('id').primary()
                table.integer('Invoice_Number')
                table.string('Invoice_Date')
                table.string('Item_Code')
                table.string('Item_Name')
                table.integer('Qty')
                table.double('Rate')
                table.double('Discount_Percent')
                table.double('Discount_Amount')
                table.double('Tax_Percent')
                table.double('Tax_Amount')
                table.double('Amount')


            })
                .then(() => {
                    // Log success message
                    console.log('Table \'tbl_invoice\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating tbl_invoice: ${error}`)
                })
        }
    })


// Export the database
module.exports = knex