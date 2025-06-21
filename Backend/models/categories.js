module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(512),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Ensures default timestamp
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: "categories",
        timestamps: false,
    });

    return Categories;
};
