const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number },
    phone: { type: Number },
    Linkedin:{type:String},
    Gitplatform:{type:String},
    Vercel:{type:String},
    posts:[{type: Schema.Types.ObjectId, ref: "Post"}]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;