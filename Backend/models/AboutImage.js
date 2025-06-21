module.exports = (sequelize, DataTypes) => {
    const AboutImage = sequelize.define("AboutImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true, // Ensures valid URL format
            },
        },
    }, {
        tableName: 'about_image',
        timestamps: false, // No created_at or updated_at fields
    });

    return AboutImage;
};
