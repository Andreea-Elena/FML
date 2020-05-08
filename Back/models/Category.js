module.exports = (sequelize, DataTypes) => {
    return sequelize.define("category", {      
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    });
};