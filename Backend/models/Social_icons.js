module.exports = (sequelize, DataTypes) => {
  const Social_Icons = sequelize.define('SocialIcon', {
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
    routes: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'social_icons',
    timestamps: false, 
  });

  return Social_Icons;
};
