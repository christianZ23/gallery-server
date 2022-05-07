const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.static(`${__dirname}/uploads/`))

//for mongoDB
MONGOURL=process.env.MONGOURL
mongoose.connect(MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo yeahh");
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting',err);
})

require('./schema/user');
require("./schema/post");


app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));


app.listen(4000,()=>console.log('listening on port 4000'))