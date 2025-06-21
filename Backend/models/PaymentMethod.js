module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define("PaymentMethod", {
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
        number: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: "payment_methods",
        timestamps: false,  // Disable timestamps if not needed
    });

    return PaymentMethod;
};
