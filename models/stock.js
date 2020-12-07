const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost:27017/AntKing");
mongooseAutoInc.initialize(connection);
const stockSchema = new Schema({
    stockname: {
        type: String,
        required: true,
    },
    stocknum: {
        type: Integer,
        required: true,
    },
});
userSchema.plugin(mongooseAutoInc.plugin, 'user');
module.exports = mongoose.model('user', userSchema);