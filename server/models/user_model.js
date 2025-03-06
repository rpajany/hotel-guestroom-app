const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean
}, { timestamps: true });

const User = mongoose.model('tbl_User', userSchema);

exports.User = User;