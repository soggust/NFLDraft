var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Draft = mongoose.model("Draft");
var ObjectID = require('mongodb').ObjectID;

// --------------------- Drafts -----------------------------------

/* Get My Drafts */
router.post("/", function(req, res, next) {
  Draft.find({creator: req.body.username}).exec(function(err,result) {
    if(err) return next(err);
    res.send(result);
  });
});

/* Add Draft */
router.post("/add", function(req, res, next) {
  req.body._id = new ObjectID();
  var draft = new Draft(req.body);
  console.log(draft);
  draft.save(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});

// router.post("/", function(req, res, next) {
//   var grumpy = new GrumpyPost(req.body);
//   grumpy.save(function(err, result){
//     if(err) return next(err);
//     res.send(result);
//   });
// });
//
// router.post("/:id/comment", auth, function(req, res, next) {
//   var comment = {
//     body: req.body.body,
//     user: req.payload._id,
//     username: req.body.username,
//     rating: req.body.rating
//   };
//   GrumpyPost.findOne({_id: req.params.id}, function(err, grumpy) {
//     if(err) return next(err);
//     if(!grumpy) return next("Could not find that grumpy.");
//     grumpy.comments.push(comment);
//     grumpy.save(function(err, grumps) {
//       res.send(grumpy);
//     });
//   });
//
// });
//
// router.get("/", function(req, res, next) {
//   GrumpyPost.find({}).exec(function(err,result) {
//     if(err) return next(err);
//     res.send(result);
//   });
// });
//
// router.get("/:id", function(req, res, next) {
//   GrumpyPost.findOne({_id: req.params.id}, function(err,result) {
//     if(err) return next(err);
//     if(!result) return next("Could not find that grumpy");
//     res.send(result);
//   });
// });
//
// router.put("/", function(req, res, next) {
//   GrumpyPost.update({_id: req.body._id}, req.body, function (err, result) {
//     //Checks for both error cases: server error and no post found
//     if(err) return res.status(500).send({err: "Error updating post"});
//     if(!result) return res.status(400).send({err: "The post wasn't found for updating"});
//     res.send(result);
//   });
// });
//
// router.delete("/:id", function(req, res, next) {
//   GrumpyPost.remove({_id: req.params.id}, function(err, result) {
//     if(err) return next(err);
//     res.send(result);
//   });
//
// });



module.exports = router;
