const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Connect to MongoDB database Collections
const uri = "mongodb://localhost:27017/hackdavis";
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MONGODB CONNECTED");
})

const usersRouter = require("./Routes/Users.cjs");

app.use('/users', usersRouter);