module.exports = (sequelize, DataTypes) => {
    const MapImage = sequelize.define("MapImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true, // Ensures it's a valid URL
            },
        },
    }, {
        tableName: "map_image",
        timestamps: false, // Disable timestamps if not needed
    });

    return MapImage;
};
