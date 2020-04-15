const express = require("express");
const router = express.Router();

const {
    createUser, getUser, getUser1, changePassword, deleteUser
} = require("../controllers/userAuthController");

router.post("/adduser", createUser);
router.get("/getuser/:id", getUser);
router.get("/getuserlogin/:username", getUser1);
router.put("/user/password/:id", changePassword);
router.post("/user/delete/:id", deleteUser);


const {
    createDetails, getDetails, updateDetails, getDetailsByAuthId
} = require("../controllers/userDetailsController");

router.post("/adddetails", createDetails);
router.get("/getdetails/:id", getDetails);
router.put("/user/update/:id", updateDetails);
router.get("/getdetails/auth/:id", getDetailsByAuthId);

const {
    createPost, getPost, updatePost, deletePost
} = require("../controllers/postController");

router.post("/addpost", createPost);
router.get("/getpost/:id", getPost);
router.put("/post/update/:id",updatePost);
router.post("/post/delete/:id", deletePost);

const {
    createComment, getComment, updateComment, deleteComment
} = require("../controllers/postCommentController");

router.post("/addcomment", createComment);
router.get("/getcomment/:id", getComment);
router.put("/comment/update/:id",updateComment);
router.post("/comment/delete/:id", deleteComment);

const {
    createCategory, getCategories, deleteCat
} = require("../controllers/postCategoryController");

router.post("/addcategory", createCategory);
router.get("/getcategory/:id", getCategories);
router.post("/category/delete/:id", deleteCat);

module.exports = router;