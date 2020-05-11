module.exports = (sequelize, DataTypes) => {
    return sequelize.define("meeting", {      
        date: DataTypes.DATE,
        promotion: DataTypes.INTEGER,
    });
};