'use strict';
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const fileRoutes = require('./routes/fileUpload_route');
const userRoutes = require('./routes/user_route');
const roomsRoutes = require('./routes/rooms_route');
const uidRoutes = require('./routes/uid_route');
const customerRoutes = require('./routes/customer_route');
const gstRoutes = require('./routes/gst_route');
const bookingRoutes = require('./routes/booking_route');
const invoiceRoutes = require('./routes/invoice_route');
const invoiceDetailsRoutes = require('./routes/invoiceDetails_route');
const businessRoutes = require('./routes/business_route');
const advanceRoutes = require('./routes/advance_route');


const port = 8080; // process.env.PORT || 8080;
const app = express();
app.use(cors());

require('./db');

app.use(bodyParser.json());


// app.use('./uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// upload API
app.use('/api', fileRoutes.routes);
app.use('/api/user', userRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/gst', gstRoutes);
app.use('/api/uid', uidRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/invoice_details', invoiceDetailsRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/advance', advanceRoutes);

app.listen(port, () => console.log(`server is listening on url http://localhost:${port}`));