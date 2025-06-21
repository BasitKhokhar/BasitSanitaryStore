module.exports = (sequelize, DataTypes) => {
    const OnSaleProduct = sequelize.define("OnSaleProduct", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(512),
            allowNull: true,  // Nullable field
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        New_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        subcategory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        stock: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "onsale_products",
        timestamps: false, // Since created_at and updated_at are manually defined
    });

    return OnSaleProduct;
};
