module.exports = (sequelize, DataTypes) => {
  const FooterLinks = sequelize.define('FooterLink', {
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    footer_links_list: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    routes: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'footer_links',
    timestamps: false, // No created_at or updated_at fields
  });

  return FooterLinks;
};
