module.exports = (sequelize, DataTypes) => {
    const SliderImage = sequelize.define("SliderImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sliderimage_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'sliderimages', 
        timestamps: false 
    });

    return SliderImage;
};
