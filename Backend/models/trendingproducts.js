// module.exports = (sequelize, DataTypes) => {
//     const TrendingProduct = sequelize.define("TrendingProduct", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         name: {
//             type: DataTypes.STRING(255),
//             allowNull: false
//         },
//         image_url: {
//             type: DataTypes.STRING(512),
//             allowNull: true
//         },
//         price: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: false
//         },
//         subcategory_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         created_at: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         },
//         updated_at: {
//             type: DataTypes.DATE,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         },
//         stock: {
//             type: DataTypes.STRING(255),
//             allowNull: false
//         }
//     }, {
//         tableName: "trending_products",
//         timestamps: false
//     });

//     return TrendingProduct;
// };
module.exports = (sequelize, DataTypes) => {
    const TrendingProduct = sequelize.define("TrendingProduct", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products', // table name
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        added_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "trending_products",
        timestamps: false,
    });

    TrendingProduct.associate = (models) => {
        TrendingProduct.belongsTo(models.Products, {
            foreignKey: 'product_id',
            as: 'product',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    return TrendingProduct;
};
