module.exports = (sequelize, DataTypes) => {
    return sequelize.define("rolepermission", {      
        idRole: DataTypes.INTEGER,
        idPermission: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE
    });
};