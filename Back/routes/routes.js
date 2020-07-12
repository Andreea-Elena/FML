const express = require("express");
const router = express.Router();

const {
    createUser, getUser, getUser1, changePassword, deleteUser, validatePass, sendEmail
} = require("../controllers/userAuthController");

router.post("/adduser", createUser);
router.get("/getuser/:id", getUser);
router.get("/getuserlogin/:username", getUser1);
router.put("/user/password/:id", changePassword);
router.post("/user/delete/:id", deleteUser);
router.get("/user/validate/:id/:password", validatePass)
router.get("/user/forgot/:email", sendEmail)


const {
    createDetails, getDetails, updateDetails, getDetailsByAuthId, getDetailsByAuthUsername, getAllUsers, getDetailsByEmail
} = require("../controllers/userDetailsController");

router.post("/adddetails", createDetails);
router.get("/getdetails/:id", getDetails);
router.put("/user/update/:id", updateDetails);
router.get("/getdetails/auth/:id", getDetailsByAuthId);
router.get("/getdetails/authUser/:username", getDetailsByAuthUsername)
router.get("/getAllUsers",getAllUsers)
router.get("/getdetails/authUserEmail/:email", getDetailsByEmail)

const {
    createPost, getPost, updatePost, deletePost, getPosts
} = require("../controllers/postController");

router.post("/addpost", createPost);
router.get("/getpost/:id", getPost);
router.put("/post/update/:id",updatePost);
router.post("/post/delete/:id", deletePost);
router.get("/getposts", getPosts);

const {
    createComment, updateComment, deleteComment, getPostComments
} = require("../controllers/postCommentController");

router.post("/addcomment", createComment);
router.put("/comment/update/:id",updateComment);
router.post("/comment/delete/:id", deleteComment);
router.get("/comment/gelall/:id", getPostComments)

const {
    createImage, getImageProfile, getImagesProfile
} = require("../controllers/imageController");

router.post("/addimage", createImage);
router.get("/getimageprofile/:id", getImageProfile);
router.get("/getimagesprofile",getImagesProfile)

const {
    createPostImage, getPostImage, getImagesPost
} = require("../controllers/postImageController");

router.post("/addpostimage", createPostImage);
router.get("/getpostimage/:id", getPostImage);
router.get("/getimagespost",getImagesPost)

const {
    createMeeting, getMeeting, deleteMeeting, getMeetings,
} = require("../controllers/meetingController");

router.post("/addmeeting", createMeeting);
router.get("/getmeeting/:id", getMeeting);
router.post("/meeting/delete/:id", deleteMeeting);
router.get("/getAllMeetings",getMeetings)

const {
    createMeetingImage, getMeetingImages, deleteMeetingImage
} = require("../controllers/meetingImageController");

router.post("/addmeetingimage", createMeetingImage);
router.get("/getmeetingimages/:id", getMeetingImages);
router.post("/meetingimage/delete/:id", deleteMeetingImage);


module.exports = router;