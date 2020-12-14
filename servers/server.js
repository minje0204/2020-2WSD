const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const indexrouter = require('./routes/index')
const userrouter = require('./routes/user')
const stockrouter = require('./routes/stock')
const postrouter = require('./routes/posts')
app.use(cors());
const session =require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://3.35.218.80:27017/AntKing', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongooseAutoInc.initialize(mongoose.connection);
app.use(session({

    secret : "201620969WSD-project;2020/.2v", // 이 값을 이용해 암호화옵션
    resave : false, // 세션이 수정되지 않아도 항상 저장할지 확인하는 옵션
    saveUninitialized : true, // 세션이 uninitalized 상태로 미리 만들어서 저장하는지 묻는 옵션
    store: new MongoStore({  // 세션이 서버 메모리가 아닌 어떤 저장소에 들어갈지 정하는 옵션
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 // 1시간후 폭파
    }),
    cookie : { // 쿠키에 들어가는 세션 ID값의 옵션
        maxAge : 1000 * 60 * 60 // 1시간후 폭파
    }
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', indexrouter);
app.use('/user', userrouter);
app.use('/stock', stockrouter);
app.use('/posts', postrouter);
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})