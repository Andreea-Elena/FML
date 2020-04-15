module.exports = (sequelize, DataTypes) => {
    return sequelize.define("postcomment", {      
        idPost: DataTypes.INTEGER,
        idParent: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE,
        title: DataTypes.STRING,
        published: DataTypes.BOOLEAN,
        content: DataTypes.STRING
    });
};