module.exports = (sequelize, DataTypes) => {
    const CustomerSupportOption = sequelize.define("CustomerSupportOption", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        icons: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        headings: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "customer_supportoptions",
        timestamps: false,  // Disable timestamps since they are not in your table
    });

    return CustomerSupportOption;
};
