/*
Here we work in a opposite way to that of one to many, in one to many we store reference of child in
parent, for example refernce of order in customer but here we will do the opposite, we will store 
refernce of parent in child, for example refernce of users in posts.
we do so because we can have millions of posts for each user and it would be difficult to store 
details for each post in a single user.
*/

const mongoose = require('mongoose');
const express = require('express');

const app = express();

const connectMongoDb = async function (){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/insta");
        console.log("Connection successful!");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
};

connectMongoDb();


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

const addUser = async ()=>{
    try{
        let user = new User({
            name: "Anupam",
            email: "Anupam@gmail.com"
        });
        let result = await user.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//addUser();

const addPost = async ()=>{
    try{
        let post2 = new Post({
            title: "My second post",
            content: "Hello World today we are in chandigarh",
            likes: 37,
        })
        post2.user = await User.findOne({name: "Anupam"});
        let result = await post2.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

//addPost();

//getting details of all posts from a single user
const getPosts = async ()=>{
    try{
        let user = await User.findOne({name: "Anupam"});
        let posts = await Post.find({user: user._id});
        console.log(posts);
    }catch(err){
        console.log(err);
    }
}
//getPosts();
            

//geting details of all posts with users
const getData = async ()=>{
    let result = await Post.find({}).populate("user", "name");  //to get only name of user
    console.log(result);
}
getData();
