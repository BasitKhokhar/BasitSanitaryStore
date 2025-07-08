module.exports = (sequelize, DataTypes) => {
  const ContactList = sequelize.define('ContactList', {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    icons: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_list_items: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'contact_list',
    timestamps: false, // Since there's no created_at or updated_at
  });

  return ContactList;
};
