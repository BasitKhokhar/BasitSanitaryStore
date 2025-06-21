module.exports = (sequelize, DataTypes) => {
    const ContactForm = sequelize.define("ContactForm", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true, // Ensures a valid email format
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: "contact_form",
        timestamps: false, // Disable timestamps if not needed
    });

    return ContactForm;
};
