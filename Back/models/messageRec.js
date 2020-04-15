module.exports = (sequelize, DataTypes) => {
    return sequelize.define("messagerec", {      
        idMessage: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER
    });
};