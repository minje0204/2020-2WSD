const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost:27017/AntKing");
mongooseAutoInc.initialize(connection);
const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    cash:{
        type: Number,
        required: true,
    },
    profit:[]
});
userSchema.plugin(mongooseAutoInc.plugin, 'user');
module.exports = mongoose.model('user', userSchema);