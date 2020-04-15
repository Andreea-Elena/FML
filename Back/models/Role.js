module.exports = (sequelize, DataTypes) => {
    return sequelize.define("role", { 
        //id: DataTypes.INTEGER,     
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    });
};