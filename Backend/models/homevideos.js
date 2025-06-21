module.exports = (sequelize, DataTypes) => {
    const Homevideos = sequelize.define("Homevideos", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        video_url: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "home_videos",
        timestamps: false
    });
    return Homevideos;
};
