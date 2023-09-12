const mongoose = require("mongoose")

// const DB = 'mongodb://localhost:27017/mymernstack';
// const DB = 'mongodb+srv://narendermahor46:mahor@cluster0.yot5jtt.mongodb.net/';

const DB = process.env.DATABASE

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true, })
.then(()=> {
  console.log("connection succcessfull");
}).catch((err)=> {
  console.log("no connection", err);
})

// module.exports = Connection;