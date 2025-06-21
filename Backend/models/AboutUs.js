module.exports = (sequelize, DataTypes) => {
    const AboutUs = sequelize.define("AboutUs", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        about_us: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: "aboutus",
        timestamps: false,  // Disable timestamps if not needed
    });

    return AboutUs;
};
