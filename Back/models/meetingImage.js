module.exports = (sequelize, DataTypes) => {
    return sequelize.define("meetingImage", {      
        photo: DataTypes.STRING,
        idMeeting: DataTypes.INTEGER,
    });
};