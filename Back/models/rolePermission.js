module.exports = (sequelize, DataTypes) => {
    return sequelize.define("rolepermission", {      
        idRole: DataTypes.INTEGER,
        idPermission: DataTypes.INTEGER,
    });
};