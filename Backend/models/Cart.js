module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        cart_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
        selectedColor: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: "cart",
        timestamps: true, // Enables Sequelize timestamps
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

    return Cart;
};
