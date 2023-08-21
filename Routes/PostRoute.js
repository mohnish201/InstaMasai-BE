const express = require("express");
const { auth } = require("../middleware/auth");
const { PostModel } = require("../model/PostModel");

const PostRoute = express.Router();

PostRoute.post("/add", auth , async(req, res)=> {
    
     try {
        const NewPost = new PostModel(req.body);
        await NewPost.save();
        res.json("New Post has been Created Successfully")
     } catch (error) {
        res.send(error)
     }
})

PostRoute.get()

module.exports={
    PostRoute
}