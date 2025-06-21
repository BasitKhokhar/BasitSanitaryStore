module.exports = (sequelize, DataTypes) => {
  const CheckoutForm = sequelize.define("CheckoutForm", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Fname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    receipt_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "checkout_form",
    timestamps: false, // Disable timestamps if your table doesn't use createdAt/updatedAt
  });

  return CheckoutForm;
};
