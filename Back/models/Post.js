module.exports = (sequelize, DataTypes) => {
    return sequelize.define("post", {   
        //id: DataTypes.INTEGER,   
        idParent: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE,
        title: DataTypes.STRING,
        published: DataTypes.BOOLEAN,
        content: DataTypes.STRING,
        idUser: DataTypes.INTEGER
    });
};