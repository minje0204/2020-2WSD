const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const indexrouter = require('./routes/index')
const userrouter = require('./routes/user')
app.use(cors());

const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/AntKing', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongooseAutoInc.initialize(mongoose.connection);

app.use(bodyParser.json());
app.use('/api', indexrouter);
app.use('/user', userrouter);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})