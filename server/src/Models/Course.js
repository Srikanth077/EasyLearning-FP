const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "course",
    {
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8pD3SpnL0eQJ2kczwprcvJ0An1Ykgw5ggRw&usqp=CAU",
      },
      image_public_id: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      teacher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: null,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      students: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
