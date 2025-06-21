module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        }
    }, {
        tableName: 'users', 
        timestamps: false 
    });
    return User;
};
