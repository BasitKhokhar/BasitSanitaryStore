module.exports = (sequelize, DataTypes) => {
  const FooterLinks = sequelize.define('FooterLinks', {
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
    timestamps: false,
  });

  return FooterLinks;
};
