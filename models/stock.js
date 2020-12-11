const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb://localhost:27017/AntKing");
mongooseAutoInc.initialize(connection);
const stockSchema = new Schema({
    userid:{
        type: String,
        required: true
    },
    stocklist: [{
        stockname: String, stocknum: Number,stockprice:Number
    }]
});
stockSchema.plugin(mongooseAutoInc.plugin, 'stock');
module.exports = mongoose.model('stock', stockSchema);