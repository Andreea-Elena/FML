const db = require("../config/db");
const UserDetails = db.import("../models/userDetails");
const UserAuth = db.import("../models/userAuth");
const RolePermission = db.import("../models/rolePermission");
const Role = db.import("../models/Role");
const PostComment = db.import("../models/postComment");
const PostCategory = db.import("../models/postCategory");
const Post = db.import("../models/Post");
const Permission = db.import("../models/Permission");
const MessageRec = db.import("../models/messageRec");
const Message = db.import("../models/Message");
const Category = db.import("../models/Category");

const {
    database
} = require("../configuration").development;

const mysql = require('mysql');


var conn = mysql.createConnection({
    host: database.host,
    user: database.username,
    password: database.password
});

conn.connect((err) => {
    if (err) throw err;
});

const controller = {
    reset: async(req, res) => {
        try {
            await conn.query("DROP DATABASE " + database.databasename);

            await conn.query(
                "CREATE DATABASE IF NOT EXISTS " + database.databasename
            );

            await conn.query("SET FOREIGN_KEY_CHECKS=0", async() => {
                try {
                    UserDetails.belongsTo(UserAuth, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idUserAuth",
                    });
                    
                    Post.belongsTo(UserAuth, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idUser",
                    });
                    
                    PostComment.belongsTo(Post, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idPost",
                    });
                    
                    Message.belongsTo(UserAuth, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idUser",
                    });
                    
                    MessageRec.belongsTo(UserAuth, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idUser",
                    });
                    
                    MessageRec.belongsTo(Message, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idMessage",
                    });
                    
                    UserAuth.belongsTo(Role, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idRole",
                    });
                    
                    RolePermission.belongsTo(Role, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idRole",
                    });
                    
                    RolePermission.belongsTo(Permission, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idPermission",
                    });

                    PostCategory.belongsTo(Category, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idCategory",
                    });
                    
                    PostCategory.belongsTo(Post, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idPost",
                    });
                

                    Post.belongsTo(Post, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idParent",
                    });

                    PostComment.belongsTo(PostComment, {
                        targetKey: "id",
                        constraints: false,
                        onDelete: "Cascade",
                        hooks: true,
                        foreignKey: "idParent",
                    });
                    
                    

                    await Permission.sync({ force: true });
                    await Role.sync({ force: true });
                    await RolePermission.sync({force: true});
                    await UserAuth.sync({force:true});
                    await UserDetails.sync({force:true});
                    await Post.sync({ force: true });
                    await Category.sync({ force: true });
                    await PostCategory.sync({ force: true });
                    await Message.sync({ force: true });
                    await MessageRec.sync({ force: true });
                    await PostComment.sync({ force: true });

                //   await RolePermission.bulkCreate(role);

                    res.status(201).send({ message: "Database Reset!" });
                } catch (err) {
                    res.status(403).send({ error: err.message });
                }
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Database ERROR!" });
        }
    },
};

module.exports = controller;