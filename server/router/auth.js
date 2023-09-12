const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

require("../db/Connection");

const User = require("../model/UserSchema");
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.send("hello world from the server router.js");
});

//register api using promises

// router.post("/register", (req, res) => {
//   console.log(req.body);
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz filled the data" });
//   }

//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "user already register" });
//     }

//     const user = new User({ name, email, phone, work, password, cpassword });
//     user.save()
//       .then(() => {
//         res.status(201).json({ message: "user register successfully" });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: "failed to regsiter" });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

//   //  res.json({message: req.body})
// });

//register api using async await

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the data" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "Email already register" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //this area hashing password using bcrypt js
      await user.save();
      return res.status(200).json({ message: "user register successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message: "data get successfully"});

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "plz filled the data" });
    }

    const userLogin = await User.findOne({ email: email });
    
    if (userLogin) {
      const passwordMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 25902000000),
        httpOnly:true
      })

      if(!passwordMatch){
        res.status(400).json({ error: "invalid details password" });
      }else{
        res.status(200).json({ message: "Login successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  } catch (error) {
    console.log(error);
  }
});


// about us page authentication

router.get('/about', authenticate, (req, res)=> {
  // console.log("hello about");
   res.send(req.rootUser);
});

// get user data for contact us page and home page

router.get("/getdata", authenticate, (req, res)=> {
  res.send(req.rootUser);
});


//contact form

router.post("/contact", authenticate, async (req, res)=> {
   try {
  const {name, email, message} = req.body;
  if(!name || !email || !message){
    console.log("error in contact form")
    return res.json({error: "plz filled the contact form"})
  }

  const userContact = await User.findOne({_id: req.userID});

  if(userContact){
    const userMessage = await userContact.addMessage(name, email, message)
     await userContact.save();
     res.status(201).json({message: "user contact successfully"});
  }

   } catch (error) {
    console.log(error)
   }
});

// logout

router.get('/logout', (req, res)=> {
  // console.log("hello about");
  res.clearCookie("jwtToken", {
    path: '/'
  });
   res.status(200).send("user logout");
});

module.exports = router;
