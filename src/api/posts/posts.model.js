const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, require:true },
    text: {type: String,  require: true},
    image: {type: String},
},
    {
        timestamps:true,
    });



const Post = mongoose.model("Post",postSchema);
module.exports = Post;
