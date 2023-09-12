const express = require("express")
require('dotenv').config()
const app = express();
const cookieParser = require("cookie-parser");
require("./db/Connection");

//connecting userSchema
// const User = require("./model/UserSchema")

app.use(express.json())

app.use(cookieParser());

// we link the router file to make our route easy
app.use(require("./router/auth"))


// dotenv.config({path: './config.env'})

const PORT = process.env.PORT



app.get('/', (req, res)=> {
   res.send("hello world from the server app.js");
});

// app.get('/about', middleware, (req, res)=> {
//    console.log("hello about");
//     res.send("hello world from the About side");
//  });





// console.log("hello narender mahor");

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
})


