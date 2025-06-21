module.exports = (sequelize, DataTypes) => {
    const Plumber = sequelize.define("Plumber", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true, // Ensures it's a valid URL
            },
        },
        status: {
            type: DataTypes.ENUM("At Work", "Free", "At Leave"),
            allowNull: false,
            defaultValue: "Free", // Default status
        },
    }, {
        tableName: "plumbers",
        timestamps: false, // Disable timestamps if not needed
    });

    return Plumber;
};
