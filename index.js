const express = require('express');
const dburl = 'mongodb://localhost:27017/udata';
const port = 8002;
const {mongoconnect} = require('./connect');
const {router} = require('./route/user');
const cookieParser = require('cookie-parser');
const {logging} = require('./middleware/winston_log');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoconnect(dburl).then(()=>{
    console.log("db up");
});

app.listen(port, ()=>{
    console.log('Listening');
})
app.use('/', logging, router);