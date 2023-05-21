const router = require("express").Router();
let Resource= require("../Models/resource.model.cjs");
const fileUpload = require('express-fileupload');
const expressfileUpload = require('express-fileupload');
const path = require('path');
console.log(__dirname);
const assetsFolder = path.join(__dirname, "..", "uploads");

//CRUD OPERATIONS
//fetches resources
router.route("/").get((req, res) =>{
    Resource.find()
        .then(resources => res.json(resources))
        .catch(err => res.status(400).json("Error:" +err));
});

//adds resources
router.route("/add").post((req, res) =>{
    const resource_name = req.body.resource_name;
    const resource = req.body.resource;
    const up = req.body.up;
    const down= req.body.down;
    const course_id= req.body.course_id;
    const description = req.body.description || "";
    const user_id = req.body.user_id;
    const file = req.body.file;

    const newResource = new Resource({resource_name, resource, up, down, course_id, description, user_id, file});

    newResource.save()
        .then(()=>{res.json("Resource Added")})
        .catch((err)=>{res.status(400).json("Error:" +err)})
})


// fetches resources by course_id
router.route("/course/:course_id").get((req, res) => {
    const course_id = req.params.course_id;
  
    Resource.find({ course_id: course_id })
      .then((resources) => {
        res.json(resources);
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  });

//updates resources on upvote
router.route("/upvote/:id").put((req, res) => {
    const resourceId = req.params.id;
    const username = req.body.username;
  
    Resource.findById(resourceId)
      .then((resource) => {
        // Check if the resource exists
        if (!resource) {
          return res.status(404).json("Resource not found");
        }
  
        // Check if the username is already in the up array
        const usernameIndex = resource.up.indexOf(username);
        if (usernameIndex !== -1) {
          // Username exists, so remove it from the up array
          resource.up.splice(usernameIndex, 1);
        } else {
          // Username doesn't exist, so append it to the up array
          resource.up.push(username);
        }
  
        // Save the updated resource
        resource
          .save()
          .then(() => {
            res.json(usernameIndex.toString());
          })
          .catch((err) => {
            res.status(400).json("Error: " + err);
          });
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  });


//updates resources upon downvote
router.route("/downvote/:id").put((req, res) => {
    const resourceId = req.params.id;
    const username = req.body.username;
  
    Resource.findById(resourceId)
      .then((resource) => {
        // Check if the resource exists
        if (!resource) {
          return res.status(404).json(usernameIndex.toString());
        }
  
        // Check if the username is already in the down array
        const usernameIndex = resource.down.indexOf(username);
        if (usernameIndex !== -1) {
          // Username exists, so remove it from the down array
          resource.down.splice(usernameIndex, 1);
        } else {
          // Username doesn't exist, so append it to the down array
          resource.down.push(username);
        }
  
        // Save the updated resource
        resource
          .save()
          .then(() => {
            res.json("Upvote updated successfully");
          })
          .catch((err) => {
            res.status(400).json("Error: " + err);
          });
      })
      .catch((err) => {
        res.status(400).json("Error: " + err);
      });
  });
  

// deletes resource
router.route("/delete/:id").get((req, res)=>{
    Resource.findByIdAndDelete(req.params.id)
        .then(() => {res.json("Resources Deleted")})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

//upload a file
// const upload = multer();
router.use(fileUpload());
router.post('/upload', (req, res) => {
  // console.log(req.body)
  console.log(req.body.name, req.files.file);

  const fileName = req.body.course_id + req.body.name + req.body.extension;
  console.log('FILENAME: ', fileName);
 try{ req.files.file.mv(path.join(assetsFolder, fileName));
  res.send(`File uploaded successfully as: ${fileName}`);
} catch(e){
  console.log(e);
}
});

module.exports = router;