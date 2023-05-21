const router = require("express").Router();
let Discussion= require("../Models/discussionInfo.model.cjs");


//CRUD OPERATIONS
//fetches discussion
router.route("/").get((req, res) =>{
    Discussion.find()
        .then(discussions => res.json(discussions))
        .catch(err => res.status(400).json("Error:" +err));
});

//adds discussion
router.route("/add").post((req, res) =>{
    const username = req.body.username;
    const content = req.body.content;
    const course_id = req.body.course_id;

    const newDiscussion = new Discussion({username, content, course_id});

    newDiscussion.save()
        .then(()=>{res.json("Discussion Added")})
        .catch((err)=>{res.status(400).json("Error:" +err)})
})


// fetches discussion by course_id
router.route("/discussion/:course_id").get((req, res) => {
    const course_id = req.params.course_id;
  
    Discussion.find({ course_id: course_id })
      .then((discussions) => {
        res.json(discussions);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  });
  

// deletes discussion
router.route("/delete/:id").get((req, res)=>{
    Resource.findByIdAndDelete(req.params.id)
        .then(() => {res.json("Discussions Deleted")})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

module.exports = router;