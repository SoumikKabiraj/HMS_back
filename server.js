const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const mediceneRoutes = require('./routes/mediceneRoutes');
const path = require('path')


//configuring the dotenv file
dotenv.config();

//mongodb connect
connectDB();

//Running Express
const app = express();

//Fix Parsing error // same as installing body Parser
app.use(express.json());

app.use(morgan('dev'));

//Routes
app.use('/HospitalManagement',userRoutes)
app.use('/HospitalManagement',adminRoutes)
app.use('/HospitalManagement',doctorRoutes)
app.use('/HospitalManagement',mediceneRoutes)

//staticfiles
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

//port
const port = process.env.PORT || 8080 ;
// listening port
app.listen(port,()=>{
    console.log(`Server Running at ${process.env.NODE_MODE} mode on Port ${process.env.PORT}`
    .bgCyan.white
    )
});