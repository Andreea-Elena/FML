const db = require("../config/db");
const UserDetails = db.import("./userDetails");
const UserAuth = db.import("./userAuth");
const RolePermission = db.import("./rolePermission");
const Role = db.import("./Role");
const PostComment = db.import("./postComment");
const PostCategory = db.import("./postCategory");
const Post = db.import("./Post");
const Permission = db.import("./Permission");
const MessageRec = db.import("./messageRec");
const Message = db.import("./Message");
const Category = db.import("./Category");

// UserDetails.belongsTo(UserAuth, {
//     onDelete: "Cascade"
// });

// Post.belongsTo(UserAuth, {
//     onDelete: "Cascade"
// });

// PostComment.belongsTo(Post, {
//     onDelete: "Cascade"
// });

// Message.belongsTo(UserAuth, {
//     onDelete: "Cascade"
// });

// MessageRec.belongsTo(UserAuth, {
//     onDelete: "Cascade"
// });

// MessageRec.belongsTo(Message, {
//     onDelete: "Cascade"
// });

// UserAuth.belongsTo(Role, {
//     onDelete: "Cascade"
// });

// RolePermission.belongsTo(Role, {
//     onDelete: "Cascade"
// });

// RolePermission.belongsTo(Permission, {
//     onDelete: "Cascade"
// });

// PostCategory.belongsTo(Post, {
//     onDelete: "Cascade"
// });

// Category.belongsTo(PostCategory, {
//     onDelete: "Cascade"
// });

// UserDetails.belongsTo(UserAuth, {
//     onDelete: "Cascade"
// });

module.exports = {
    db,
    UserDetails,
    UserAuth,
    RolePermission,
    Role,
    PostComment,
    PostCategory,
    Post,
    Permission,
    MessageRec,
    Message,
    Category
}