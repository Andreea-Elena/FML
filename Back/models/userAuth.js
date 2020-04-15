module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userauth", {      
      // id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        idRole: DataTypes.INTEGER,
        userDetId: DataTypes.INTEGER
    });
};