const mongoose = require('mongoose');
const users = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /@/.test(v) && /\./.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z\s]+$/.test(v);
                },
                message: 'City name can only contain alphabets and spaces!'
            }
        },
        zipcode: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{5}-\d{4}$/.test(v);
                },
                message: 'Zip code must be in the format DDDDD-DDDD!'
            }
        },
        geo: {
            lat: {
                type: String,
                required: true
            },
            lng: {
                type: String,
                required: true
            }
        }
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(v);
            },
            message: '{VALUE} is not a valid web URL address!'
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d-\d{3}-\d{3}-\d{4}$/.test(v);
            },
            message: 'Phone number must be in the format D-DDD-DDD-DDD!'
        }
    }
});

const Users = mongoose.model('User', users);
module.exports = Users;