const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');

require('dotenv').config();

const app = express();

const env = process.env.NODE_ENV || 'development';


app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const uri = process.env.MONGODB_URI || "mongodb+srv://dbUserSM:CZuvQ4uRdkiHbGgs@cluster0-mkgcg.gcp.mongodb.net/test?retryWrites=true&w=majority";;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database has been successfully established');
});


if(env !== 'development' && app.use(express.static(path.join(__dirname, '/../build')))) {
	console.log('in client build')
}


if(env !== 'development' && app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../build/index.html'));
})) {
	console.log('getting files from static build')
}

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`)
});