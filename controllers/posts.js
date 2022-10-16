const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getQuick: (req, res) => {
    res.render("quickBill.ejs");
  },
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
    // try {
    //   const post = await Post.findById(req.params.id);
    //   const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc"}).lean();
    //   res.render("post.ejs", { post: post, user: req.user, comments: comments });
    // } catch (err) {
    //   console.log(err);
    // }
  },
  createPost: async (req, res) => {
    let payers = {}
    req.body.name.forEach((x, i)=> payers[x] = req.body.amount[i]);
    try {
      await Post.create({
        title: req.body.title,
        total: req.body.total,
        dateDue: req.body.dateDue,
        payers: payers,
        notes: req.body.notes,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
// Old code if needed    
    // try {
    //   // Upload image to cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

    //   await Post.create({
    //     title: req.body.title,
    //     image: result.secure_url,
    //     cloudinaryId: result.public_id,
    //     caption: req.body.caption,
    //     likes: 0,
    //     user: req.user.id,
    //   });
    //   console.log("Post has been added!");
    //   res.redirect("/profile");
    // } catch (err) {
    //   console.log(err);
    // }
  },
  addPhoto: async (req,res) => {
    try{
    // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.findOneAndUpdate(
        {_id: req.params.id},
        { $set: 
          {
            image: result.secure_url,
            cloudinaryId: result.public_id,
          }
        }
      );
      console.log("Photo has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  editNotes: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        {_id: req.params.id},
        { $set: { notes: req.body.notes }}
      );
      console.log("Notes have been updated!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      if (post.cloudinaryId){
        await cloudinary.uploader.destroy(post.cloudinaryId);
      }
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};