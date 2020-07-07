const express = require("express");
const router = express.Router();

const {
    createUser, getUser, getUser1, changePassword, deleteUser, validatePass
} = require("../controllers/userAuthController");

router.post("/adduser", createUser);
router.get("/getuser/:id", getUser);
router.get("/getuserlogin/:username", getUser1);
router.put("/user/password/:id", changePassword);
router.post("/user/delete/:id", deleteUser);
router.get("/user/validate/:id/:password", validatePass)


const {
    createDetails, getDetails, updateDetails, getDetailsByAuthId, getDetailsByAuthUsername, getAllUsers
} = require("../controllers/userDetailsController");

router.post("/adddetails", createDetails);
router.get("/getdetails/:id", getDetails);
router.put("/user/update/:id", updateDetails);
router.get("/getdetails/auth/:id", getDetailsByAuthId);
router.get("/getdetails/authUser/:username", getDetailsByAuthUsername)
router.get("/getAllUsers",getAllUsers)

const {
    createPost, getPost, updatePost, deletePost, getPosts
} = require("../controllers/postController");

router.post("/addpost", createPost);
router.get("/getpost/:id", getPost);
router.put("/post/update/:id",updatePost);
router.post("/post/delete/:id", deletePost);
router.get("/getposts", getPosts);

const {
    createComment, getComment, updateComment, deleteComment
} = require("../controllers/postCommentController");

router.post("/addcomment", createComment);
router.get("/getcomment/:id", getComment);
router.put("/comment/update/:id",updateComment);
router.post("/comment/delete/:id", deleteComment);

const {
    createImage, getImageProfile
} = require("../controllers/imageController");

router.post("/addimage", createImage);
router.get("/getimageprofile/:id", getImageProfile);

const {
    createPostImage, getPostImage
} = require("../controllers/postImageController");

router.post("/addpostimage", createPostImage);
router.get("/getpostimage/:id", getPostImage);

const {
    createMeeting, getMeeting, deleteMeeting, getMeetings,
} = require("../controllers/meetingController");

router.post("/addmeeting", createMeeting);
router.get("/getmeeting/:id", getMeeting);
router.post("/meeting/delete/:id", deleteMeeting);
router.get("/getAllMeetings",getMeetings)

const {
    createMeetingImage, getMeetingImages
} = require("../controllers/meetingImageController");

router.post("/addmeetingimage", createMeetingImage);
router.get("/getmeetingimages/:id", getMeetingImages);


module.exports = router;