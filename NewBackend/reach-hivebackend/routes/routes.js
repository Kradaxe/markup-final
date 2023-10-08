import * as controller from "../controller/controller.js";
import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/auth.js";
// import * as blog from "../controller/blogcontroller.js";
import { v2 as cloudinary } from "cloudinary";
import posts from "../models/posts.js";
// const Post = mongoose.model("Post", PostModel);
const router = express.Router();

cloudinary.config({
  cloud_name: "dwyvexxqz",
  api_key: "583897919862512",
  api_secret: "0PZBA6dxLkeJk3EMtoURVXB-A1I",
  secure: true,
});
// Routes for posts
router.post("/upload", authMiddleware, async (req, res) => {
  const file = req.files.photo;
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  const newPost = new posts({
    photo: result.url,
  });
  await newPost.save();

  res.status(200).json("image saved");
});
router.get("/posts", authMiddleware, async (req, res) => {
  try {
    const images = await posts.find({ userId: req.userId });
    console.log(images);
    res.status(201).json({
      success: true,
      body: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});
// router
//   .route("/posts")
//   .get(authMiddleware, blog.getPosts)
//   .post(authMiddleware, blog.insertPosts);

// router
//   .route("/posts/:id")
//   .delete(authMiddleware, blog.deletePostById)
//   .put(authMiddleware, blog.updatePostById)
//   .patch(authMiddleware, blog.update);

// Routes for users
router.route("/users").get(controller.getUsers).post(controller.createUser);

router.route("/users/logIn").post(controller.logIn);

// router
//   .route("/users/:id")
//   .get(authMiddleware, controller.getUserById)
//   .patch(authMiddleware, controller.updateUserById)
//   .delete(controller.deleteUserById);

export default router;
