module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userdetails", {
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        facebook: DataTypes.STRING,
        registeredAt: DataTypes.DATE,
        lastLogin: DataTypes.DATE,
        profile: DataTypes.STRING,
        photo: DataTypes.STRING,
        idUserAuth: DataTypes.INTEGER
    });
};