module.exports = (sequelize, DataTypes) => {
    const Subcategories = sequelize.define("Subcategories", {
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories", // Foreign key referencing categories table
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "subcategories",
        timestamps: false
    });

    return Subcategories;
};
