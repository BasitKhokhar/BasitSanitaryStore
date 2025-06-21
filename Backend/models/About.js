module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define("About", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Position: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true, // Ensures it's a valid URL
            },
        },
        contact: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        tableName: "about",
        timestamps: false,  // Disable timestamps if not needed
    });

    return About;
};
