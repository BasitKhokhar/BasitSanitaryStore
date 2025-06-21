module.exports = (sequelize, DataTypes) => {
    const HomeParagraph = sequelize.define("HomeParagraph", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        heading: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: 'home_paragraphs', 
        timestamps: false 
    });
    return HomeParagraph;
};
