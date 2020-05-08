module.exports = (sequelize, DataTypes) => {
    return sequelize.define("permission", {      
        //id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    });
};