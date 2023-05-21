const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Database Collections
const uri ="mongodb://127.0.0.1:27017/test";
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MONGODB CONNECTED");
});

const usersRouter = require("./Routes/Users.cjs");

app.use('/users', usersRouter);

const coursesRouter = require("./Routes/Courses.cjs");

app.use('/courses', coursesRouter);

const resourcesRouter = require("./Routes/Resources.cjs");

app.use('/resources', resourcesRouter);

app.listen(port, ()=>{
    console.log("Server is running on port:", port)
});