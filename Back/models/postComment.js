module.exports = (sequelize, DataTypes) => {
    return sequelize.define("postcomment", {      
        idPost: DataTypes.INTEGER,
        idParent: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE,
        title: DataTypes.STRING,
        content: DataTypes.STRING
    });
};