module.exports = (sequelize, DataTypes) => {
    const LogoImage = sequelize.define("LogoImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'logo_image', 
        timestamps: false
    });
    return LogoImage;
};
