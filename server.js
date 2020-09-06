// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/mongo-execises", { useNewUrlParser : true, useUnifiedTopology : true})
// .then( () => console.log("Connection Established...") )
// .catch( (err) => console.log(`Error : ${err.message}`) );

// MongoClient.connect("mongodb://localhost/mongo-ecercises", { useNewUrlParser : true, useUnifiedTopology : true})
// .then( () => console.log("Connection Established...") )
// .catch( (err) => console.log(`Error : ${err.message}`) );

// const courseSchema = new mongoose.Schema({
//     // _id : String,
//     name: { type : String, required : true},
//     tags: [ String ],
//     date: { type : Date, default: Date.now },
//     author : String,
//     isPublished: Boolean,
//     price : Number
// });

// const Course = new mongoose.model("Course", courseSchema);

// async function saveCourse() {
//     const course = new Course({
//         name : "Reactjs Course",
//         tags : [ "Nodejs", "Reactjs", "Reduxjs"],
//         author : "Hannan",
//         isPublished: false,
//         price: 20
//     });
    
//     try {
//         const res = await course.save();
//         console.log("Res :", res); 
//     }
//     catch(ex) {
//         console.log(ex.message);
//     }
// }

// async function getCourseSortName() {
//     const res = await Course
//     .find({
//         isPublished : true,
//         tags: "backend"
//     })
//     .sort({ name : 1 })
//     .select({ name: 1, author: 1 });

//     console.log(res);
// }

// async function getCourseSortPrice() {
//     const res = await Course
//     .find( { isPublished : true, tags : { $in : ["backend", "frontend"] } } )
//     // .or( [ { tags : "backend" }, {tags : "frontend" }] )
//     .sort( { price : -1})
//     .select( "name author");

//     console.log(res);
// }

// async function getCourseSortAll() {
//     const res = await Course
//     .find( { isPublished : true} )
//     .or( [ { price : { $gte : 15 }}, {name : /.*by.*/} ] );
//     console.log(res);
// }

// async function updateCourseByFindById(id) {
//     const course = await Course.findById(id);

//     if(!course) return console.log("Jo");

//     course.isPublished = true;
//     course.author = "Another Person";

//     const res = await course.save();
//     console.log(res);
// }

// async function updateCourseDirect(id) {
//     const res = await Course.findByIdAndUpdate(id, {
//         $set : {
//             isPublished : false,
//             author : "Mosh Hamedani"
//         }},
//         {
//             useFindAndModify : false,               
//             new : true
//         }
//     );
//     console.log(res);
// }

// async function deleteCourseDeleteOne(id) {
//     const res = await Course.deleteOne(id, {
//         $set : {
//             isPublished : false,
//             author : "Mosh Hamedani"
//         }},
//         {
//             useFindAndModify : false,               
//             new : true
//         }
//     );
//     console.log(res);
// }

// saveCourse();