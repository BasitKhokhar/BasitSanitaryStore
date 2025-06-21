module.exports = (sequelize, DataTypes) => {
    const AboutMission = sequelize.define("AboutMission", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        aboutmission: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: "about_mission",
        timestamps: false,  // Disable timestamps if not needed
    });

    return AboutMission;
};
