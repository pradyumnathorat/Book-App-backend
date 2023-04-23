const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookSchema = new schema({
    title: {
        type : String,
        required : true,
    },
    ISBN: {
        type : String,
        required : true
    },
    author: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    date: {
        type : String,
        required : true
    },
    publisher: {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId , ref:'User2'
    }
})

const userModel = mongoose.model('book' , bookSchema);
module.exports = userModel;