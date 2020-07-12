module.exports = (sequelize, DataTypes) => {
    return sequelize.define("post", {   
        //id: DataTypes.INTEGER,   
        idParent: DataTypes.INTEGER,
        updatedAt: DataTypes.DATE,
        publishedAt: DataTypes.DATE,
        title: DataTypes.STRING,
        content:{ type:DataTypes.STRING,
            validate: {
                len: [1, 100000]
              }
        },
        idUser: DataTypes.INTEGER,
        visibility: DataTypes.STRING,
        category: DataTypes.STRING
    });
};