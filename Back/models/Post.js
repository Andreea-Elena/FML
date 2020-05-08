module.exports = (sequelize, DataTypes) => {
    return sequelize.define("post", {   
        //id: DataTypes.INTEGER,   
        idParent: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        idUser: DataTypes.INTEGER
    });
};