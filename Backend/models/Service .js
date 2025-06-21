module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define("Service", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true, // Matches your table definition
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                isUrl: true, // Ensures it's a valid URL
            },
        },
    }, {
        tableName: "services",
        timestamps: false,  // Disable timestamps if not needed
    });

    return Service;
};
