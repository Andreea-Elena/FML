module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userdetails", {
        FirstName: DataTypes.STRING,
        LastName: DataTypes.STRING,
        email: {
           type: DataTypes.STRING,
           unique: true
        },
        phone: {
            type: DataTypes.STRING,
            unique: true
        },
        facebook: DataTypes.STRING,
        registeredAt: DataTypes.DATE,
        lastLogin: DataTypes.DATE,
        profile: DataTypes.STRING,
        photo: DataTypes.STRING,
        idUserAuth: DataTypes.INTEGER
    });
};