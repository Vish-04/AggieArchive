const router = require("express").Router();
let Course = require("../Models/courseInfo.model.cjs")

//CRUD OPERATIONS
//fetches courses
router.route("/").get((req, res) =>{
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json("Error:" +err));
});

//adds courses
router.route("/add").post((req, res) =>{
    const course_id = req.body.course_id;
    const course_name = req.body.course_name;
    const course_units = req.body.course_units;
    const course_description = req.body.course_description;
    const course_details = req.body.course_details;

    const newCourse = new Course({course_id, course_name, course_units, course_description, course_details})

    newCourse.save()
        .then(()=>{res.json("Course Added")})
        .catch((err)=>{res.status(400).json("Error:" +err)})
})

// fetches course by crn
router.route("/:course_id").get((req, res)=>{
    Course.findOne({ course_id: req.params.course_id })
        .then((course) => {res.json(course)})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})


// fetches course  by id
router.route("/id/:id").get((req, res)=>{
    Course.findById(req.params.id)
        .then((course) => {res.json(course)})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

// deletes course
router.route("/delete/:id").get((req, res)=>{
    Course.findByIdAndDelete(req.params.id)
        .then(() => {res.json("Course Deleted")})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

// updates Course
router.route("/update/:id").post((req, res)=>{
    Course.findByIdAndUpdate(req.params.id)
        .then((course) => {
            course.course_id = req.body.course_id;
            course.course_name = req.body.course_name;
            course.course_units = req.body.course_units;
            course.course_description = req.body.course_description;
            course.course_details = req.body.course_details;

            course.save()
                .then(()=>{res.json("Course Updated")})
                .catch((err)=>{res.status(400).json("Error:" +err)});
        })
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

module.exports = router;