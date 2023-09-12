const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
        type:Number,
        required: true
      },

      work: {
        type: String,
        required: true
      },
    
      password: {
        type: String,
        required: true
      },

      cpassword: {
        type: String,
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      },

      messages: [
        {
          name: {
            type: String,
            required: true
          },
      
          email: {
            type: String,
            required: true
          },

          message: {
            type: String,
            required: true
          }
        }
      ],

      tokens: [
        {
          token: {
            type: String,
            require: true
          }
        }
      ]
});

UserSchema.pre('save', async function(next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = await bcrypt.hash(this.cpassword, 12)
  }
  next();
});

// generating auth token

UserSchema.methods.generateAuthToken = async function(){
  try {
    let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token: token});
    await this.save();
    return token;
  } catch (error) {
    console.log(error)
  }
}

// store the contact message

UserSchema.methods.addMessage = async function(name, email, message){
  try {
    this.messages = this.messages.concat({name, email, message});
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error)
  }
}

const User = mongoose.model("USER", UserSchema);

module.exports = User;