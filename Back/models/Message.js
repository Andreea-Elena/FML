module.exports = (sequelize, DataTypes) => {
    return sequelize.define("message", {      
        idUser: DataTypes.INTEGER,
        dataSend: DataTypes.DATE,
        dataRead: DataTypes.DATE,
        content: DataTypes.STRING,
        attachedFiles: DataTypes.STRING
    });
};