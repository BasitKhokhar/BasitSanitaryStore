module.exports = (sequelize, DataTypes) => {
  const FooterInfo = sequelize.define('FooterInfo', {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    footer_info_list: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    routes: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'footer_info',
    timestamps: false, // No created_at or updated_at
  });

  return FooterInfo;
};
