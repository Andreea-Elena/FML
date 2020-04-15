module.exports = (sequelize, DataTypes) => {
    return sequelize.define("postcategory", { 
        //id: DataTypes.INTEGER,     
        idPost: DataTypes.INTEGER,
        idCategory: DataTypes.INTEGER
    });
};