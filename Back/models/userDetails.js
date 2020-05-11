module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userdetails", {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
           type: DataTypes.STRING,
           unique: true,
           allowNull: false
           
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        facebook: DataTypes.STRING,
        profile: DataTypes.STRING,
        seria: DataTypes.STRING,
        group: DataTypes.INTEGER,
        promotion: DataTypes.INTEGER,
        specialisation: DataTypes.STRING,
        job: DataTypes.STRING,
        company: DataTypes.STRING,
        idUserAuth: DataTypes.INTEGER
    });
};