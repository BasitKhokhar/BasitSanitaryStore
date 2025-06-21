module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "brands",
        timestamps: false,  // Disable timestamps since they are not in your table
    });

    return Brand;
};
