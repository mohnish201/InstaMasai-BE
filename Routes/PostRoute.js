const express = require("express");
const { auth } = require("../middleware/auth");
const { PostModel } = require("../model/PostModel");

const PostRoute = express.Router();

PostRoute.post("/add", auth, async (req, res) => {
  console.log(req.body);

  try {
    const NewPost = new PostModel(req.body);
    await NewPost.save();
    res.json("New Post has been Created Successfully");
  } catch (error) {
    res.send(error);
  }
});

PostRoute.get("/", auth, async (req, res) => {
  const {min, max, limit, page } = req.query;
  let query = {};
  if (min && max) {
    query.$and = [
      { no_of_comments: {$lte: max } },
      { no_of_comments: {$gte: min } },
    ];
  }

  const toSkip = (page - 1) * limit;

  try {
    const Posts = await PostModel.find({$and:[{userId: req.body.userId},query]}).skip(toSkip).limit(limi)
      
    res.json(Posts);
  } catch (error) {
    res.json(error);
  }
});


PostRoute.get("/top", auth, async (req, res) => {

   

  
    try {
      const Posts = await PostModel.aggregate([{userId: req.body.userId}, {$sort: {no_of_comments:-1}}, {$limit: 3 }])
        
      res.json(Posts);
    } catch (error) {
      res.json(error);
    }
  });
  

PostRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;

  const posts = await PostModel.findOne({ _id: id, userId: req.body.userId });

  try {
    if (posts) {
      await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.json("Post Updated");
    } else {
      res.json("You are not authorized");
    }
  } catch (error) {
    res.json(error);
  }
});

PostRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  const posts = await PostModel.findOne({ _id: id, userId: req.body.userId });

  try {
    if (posts) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.json("Post Deleted");
    } else {
      res.json("You are not authorized");
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  PostRoute,
};
