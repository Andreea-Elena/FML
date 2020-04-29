module.exports = (sequelize, DataTypes) => {
    return sequelize.define("userauth", {      
      // id: DataTypes.INTEGER,
        username: {
          type: DataTypes.STRING,
          unique: true
        },
        password: DataTypes.STRING,
        idRole: DataTypes.INTEGER,
    });
};